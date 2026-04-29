import { ImageResponse } from 'next/og'
import { NextRequest } from 'next/server'

export const runtime = 'edge'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)

  const title = searchParams.get('title') || 'Kinetic'
  const description = searchParams.get('description') ||
    'Digital Growth Systems for Startups & Businesses'
  const type = searchParams.get('type') || 'page'

  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          background: '#000000',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '64px',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        {/* Top row — logo + type badge */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{
            color: '#ffffff',
            fontSize: '24px',
            fontWeight: '700',
            letterSpacing: '0.15em',
          }}>
            KINETIC
          </div>
          {type === 'case-study' && (
            <div style={{
              background: '#111111',
              border: '1px solid #333333',
              color: '#888888',
              fontSize: '12px',
              fontWeight: '500',
              letterSpacing: '0.1em',
              padding: '6px 16px',
              borderRadius: '20px',
            }}>
              CASE STUDY
            </div>
          )}
          {type === 'service' && (
            <div style={{
              background: '#111111',
              border: '1px solid #333333',
              color: '#888888',
              fontSize: '12px',
              fontWeight: '500',
              letterSpacing: '0.1em',
              padding: '6px 16px',
              borderRadius: '20px',
            }}>
              SERVICE
            </div>
          )}
        </div>

        {/* Center — title + description */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div style={{
            color: '#ffffff',
            fontSize: title.length > 40 ? '52px' : '64px',
            fontWeight: '700',
            lineHeight: '1.1',
            maxWidth: '900px',
          }}>
            {title}
          </div>
          <div style={{
            color: '#666666',
            fontSize: '22px',
            fontWeight: '400',
            lineHeight: '1.5',
            maxWidth: '800px',
          }}>
            {description}
          </div>
        </div>

        {/* Bottom row — domain + tagline */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderTop: '1px solid #1a1a1a',
          paddingTop: '24px',
        }}>
          <div style={{ color: '#444444', fontSize: '16px' }}>
            buildwithkinetic.org
          </div>
          <div style={{ color: '#444444', fontSize: '16px' }}>
            The System Behind Your Growth
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  )
}
