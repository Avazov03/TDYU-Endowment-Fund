import { describe, expect, it } from 'vitest'
import { mergeOverlayList } from './cms-overlay.mjs'

const slug = (r) => r.slug

describe('CMS overlay merge', () => {
  const staticItems = [
    { slug: 'a', title: 'Static A' },
    { slug: 'b', title: 'Static B' },
    { slug: 'c', title: 'Static C' },
  ]

  it('yangi DB yozuvi statik katalogni saqlaydi', () => {
    const out = mergeOverlayList(staticItems, [{ slug: 'new', title: 'Yangi' }], [], slug)
    expect(out.map((r) => r.slug)).toEqual(['new', 'a', 'b', 'c'])
  })

  it('DB dagi slug statikni almashtiradi', () => {
    const out = mergeOverlayList(staticItems, [{ slug: 'b', title: 'DB B' }], [], slug)
    expect(out.find((r) => r.slug === 'b').title).toBe('DB B')
    expect(out).toHaveLength(3)
  })

  it('o‘chirilgan/yashirilgan slug saytdan chiqmaydi', () => {
    const out = mergeOverlayList(staticItems, [], ['b'], slug)
    expect(out.map((r) => r.slug)).toEqual(['a', 'c'])
  })
})
