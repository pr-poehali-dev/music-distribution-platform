'''
Business: API для работы с релизами, аналитикой и выплатами
Args: event - dict с httpMethod, body, queryStringParameters
      context - object с attributes: request_id, function_name, function_version, memory_limit_in_mb
Returns: HTTP response dict
'''

import json
import os
from typing import Dict, Any, List, Optional
from datetime import datetime, date
import psycopg2
from psycopg2.extras import RealDictCursor

def get_db_connection():
    dsn = os.environ.get('DATABASE_URL')
    if not dsn:
        raise ValueError('DATABASE_URL not found')
    return psycopg2.connect(dsn, cursor_factory=RealDictCursor)

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    method: str = event.get('httpMethod', 'GET')
    params = event.get('queryStringParameters') or {}
    action = params.get('action', '')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-User-Id',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    headers = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    }
    
    try:
        conn = get_db_connection()
        cur = conn.cursor()
        
        if method == 'GET' and 'releases' in action:
            user_id = params.get('user_id', '1')
            cur.execute('''
                SELECT r.*, 
                       COUNT(rp.id) as platforms_count,
                       AVG(rp.progress) as avg_progress
                FROM releases r
                LEFT JOIN release_platforms rp ON r.id = rp.release_id
                WHERE r.user_id = %s
                GROUP BY r.id
                ORDER BY r.created_at DESC
            ''', (user_id,))
            releases = cur.fetchall()
            
            result = []
            for r in releases:
                result.append({
                    'id': r['id'],
                    'title': r['title'],
                    'artist': r['artist'],
                    'status': r['status'],
                    'cover_url': r['cover_url'],
                    'platforms_count': r['platforms_count'] or 0,
                    'progress': int(r['avg_progress'] or 0),
                    'created_at': r['created_at'].isoformat() if r['created_at'] else None
                })
            
            return {
                'statusCode': 200,
                'headers': headers,
                'body': json.dumps({'releases': result}),
                'isBase64Encoded': False
            }
        
        elif method == 'GET' and 'analytics' in action:
            user_id = params.get('user_id', '1')
            
            cur.execute('''
                SELECT 
                    SUM(a.streams) as total_streams,
                    SUM(a.listeners) as total_listeners,
                    SUM(a.revenue) as total_revenue,
                    COUNT(DISTINCT r.id) as total_releases
                FROM analytics a
                JOIN releases r ON a.release_id = r.id
                WHERE r.user_id = %s
            ''', (user_id,))
            totals = cur.fetchone()
            
            cur.execute('''
                SELECT 
                    p.name,
                    SUM(a.streams) as streams
                FROM analytics a
                JOIN platforms p ON a.platform_id = p.id
                JOIN releases r ON a.release_id = r.id
                WHERE r.user_id = %s
                GROUP BY p.name
                ORDER BY streams DESC
                LIMIT 5
            ''', (user_id,))
            platforms = cur.fetchall()
            
            cur.execute('''
                SELECT 
                    country,
                    SUM(streams) as streams
                FROM analytics a
                JOIN releases r ON a.release_id = r.id
                WHERE r.user_id = %s AND country IS NOT NULL
                GROUP BY country
                ORDER BY streams DESC
                LIMIT 5
            ''', (user_id,))
            countries = cur.fetchall()
            
            cur.execute('''
                SELECT 
                    age_group,
                    SUM(streams) as streams
                FROM analytics a
                JOIN releases r ON a.release_id = r.id
                WHERE r.user_id = %s AND age_group IS NOT NULL
                GROUP BY age_group
                ORDER BY 
                    CASE age_group
                        WHEN '18-24' THEN 1
                        WHEN '25-34' THEN 2
                        WHEN '35-44' THEN 3
                        WHEN '45+' THEN 4
                    END
            ''', (user_id,))
            demographics = cur.fetchall()
            
            return {
                'statusCode': 200,
                'headers': headers,
                'body': json.dumps({
                    'totals': {
                        'streams': int(totals['total_streams'] or 0),
                        'listeners': int(totals['total_listeners'] or 0),
                        'revenue': float(totals['total_revenue'] or 0),
                        'releases': int(totals['total_releases'] or 0)
                    },
                    'platforms': [{'name': p['name'], 'streams': int(p['streams'])} for p in platforms],
                    'countries': [{'country': c['country'], 'streams': int(c['streams'])} for c in countries],
                    'demographics': [{'age_group': d['age_group'], 'streams': int(d['streams'])} for d in demographics]
                }),
                'isBase64Encoded': False
            }
        
        elif method == 'GET' and 'earnings' in action:
            user_id = params.get('user_id', '1')
            
            cur.execute('''
                SELECT 
                    SUM(revenue) as total_earnings
                FROM analytics a
                JOIN releases r ON a.release_id = r.id
                WHERE r.user_id = %s
            ''', (user_id,))
            total = cur.fetchone()
            
            cur.execute('''
                SELECT 
                    SUM(amount) as total_paid
                FROM payouts
                WHERE user_id = %s AND status = 'completed'
            ''', (user_id,))
            paid = cur.fetchone()
            
            total_earnings = float(total['total_earnings'] or 0)
            total_paid = float(paid['total_paid'] or 0)
            available = total_earnings - total_paid
            
            return {
                'statusCode': 200,
                'headers': headers,
                'body': json.dumps({
                    'total_earnings': total_earnings,
                    'total_paid': total_paid,
                    'available': available
                }),
                'isBase64Encoded': False
            }
        
        elif method == 'GET' and 'payouts' in action:
            user_id = params.get('user_id', '1')
            
            cur.execute('''
                SELECT * FROM payouts
                WHERE user_id = %s
                ORDER BY requested_at DESC
                LIMIT 10
            ''', (user_id,))
            payouts = cur.fetchall()
            
            result = []
            for p in payouts:
                result.append({
                    'id': p['id'],
                    'amount': float(p['amount']),
                    'method': p['method'],
                    'status': p['status'],
                    'requested_at': p['requested_at'].isoformat() if p['requested_at'] else None,
                    'processed_at': p['processed_at'].isoformat() if p['processed_at'] else None
                })
            
            return {
                'statusCode': 200,
                'headers': headers,
                'body': json.dumps({'payouts': result}),
                'isBase64Encoded': False
            }
        
        elif method == 'POST' and 'payouts' in action:
            body_data = json.loads(event.get('body', '{}'))
            user_id = body_data.get('user_id', 1)
            amount = body_data.get('amount')
            method_name = body_data.get('method')
            details = body_data.get('details')
            
            if not amount or not method_name:
                return {
                    'statusCode': 400,
                    'headers': headers,
                    'body': json.dumps({'error': 'amount and method are required'}),
                    'isBase64Encoded': False
                }
            
            cur.execute('''
                INSERT INTO payouts (user_id, amount, method, details, status)
                VALUES (%s, %s, %s, %s, 'pending')
                RETURNING id
            ''', (user_id, amount, method_name, details))
            payout_id = cur.fetchone()['id']
            conn.commit()
            
            return {
                'statusCode': 201,
                'headers': headers,
                'body': json.dumps({'id': payout_id, 'status': 'pending'}),
                'isBase64Encoded': False
            }
        
        elif method == 'GET' and 'platforms' in action:
            cur.execute('SELECT * FROM platforms WHERE is_active = true ORDER BY name')
            platforms = cur.fetchall()
            
            result = [{'id': p['id'], 'name': p['name']} for p in platforms]
            
            return {
                'statusCode': 200,
                'headers': headers,
                'body': json.dumps({'platforms': result}),
                'isBase64Encoded': False
            }
        
        else:
            return {
                'statusCode': 404,
                'headers': headers,
                'body': json.dumps({'error': 'Not found'}),
                'isBase64Encoded': False
            }
    
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': headers,
            'body': json.dumps({'error': str(e)}),
            'isBase64Encoded': False
        }
    finally:
        if 'cur' in locals():
            cur.close()
        if 'conn' in locals():
            conn.close()