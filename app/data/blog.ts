/**
 * Local blog content — replaces the Hygraph GraphQL CMS.
 * Shape matches the original `posts` query exactly.
 *
 * `content` is markdown rendered by Nuxt MDC on the blog-post page.
 * To add a post, append an object with a unique `slug`.
 */

export const blogPosts = [
  {
    slug: 'engineering-around-unreliable-ai',
    title: 'Engineering around unreliable AI',
    subject: 'Notes on shipping LLM features that do not break',
    date: '2026-07-01',
    length: '4',
    tags: ['AI', 'LLM', 'Engineering'],
    authors: [{ name: 'Diksha Kumari' }],
    coverImage: {
      id: 'post-1',
      handle: '/projects/scytle.svg',
      fileName: 'post-1.svg',
    },
    content: `
The first version of Scytle trusted the model. That was the bug.

Gemini generated UI as HTML with Tailwind classes, and my pipeline fed it straight
into the canvas renderer. Most of the time that worked. Then it did not — the model
returned markup that was subtly malformed, the parser choked, and the editor broke
in front of the user.

## The fix was not a better prompt

It was accepting that the model is an unreliable input and building for that:
validate the shape of what comes back, normalise it into the node structure the
canvas expects, and fall back gracefully when it does not fit. Nothing clever —
just the same defensive instinct you would apply to any third-party API you do
not control.

That reframing has stuck with me. An LLM is not a function that returns the right
answer. It is a network call to a system that is usually right, and the interesting
engineering is everything you wrap around it so that "usually" is good enough to ship.
`,
  },
  {
    slug: 'four-bugs-porting-to-windows',
    title: 'Four bugs I found porting an Electron app to Windows',
    subject: 'Three of them failed silently',
    date: '2026-06-10',
    length: '5',
    tags: ['Electron', 'Windows', 'Debugging'],
    authors: [{ name: 'Diksha Kumari' }],
    coverImage: {
      id: 'post-2',
      handle: '/projects/thanku.svg',
      fileName: 'post-2.svg',
    },
    content: `
ThankU was macOS-only. Bringing it up on Windows surfaced four defects, and every
one taught me something about reading a silent failure.

## System audio captured nothing

The mic stream worked; the loopback stream reported zero bytes sent. The main
process gave the renderer two seconds to confirm capture had started, but the cold
path has to enumerate screen sources, run \`getDisplayMedia\`, build a 16 kHz
\`AudioContext\` and load an \`AudioWorklet\` first. It was never failing — it was
just late. Raising the budget fixed it, and dropping thumbnail rendering made it fast.

## Undetectable mode was not undetectable

Content protection hid the windows from screen capture correctly, but the companion
behaviour that hides the app from the dock sat inside a macOS-only branch. On
Windows the app stayed in the taskbar and Alt-Tab the whole time.

## PDF upload crashed

A worker path resolved to a bare Windows absolute path, then got dynamically
imported — and Node's ESM loader will not accept a drive letter as a protocol.

## Native modules were never built

The install reported success and silently skipped every build script, because the
package manager had stopped reading the legacy config field.

Three of the four were silent. That is the pattern worth remembering: the bug that
announces itself is the easy one.
`,
  },
]

export default blogPosts
