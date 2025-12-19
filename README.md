# MoodTranslator
A Calming, Fluid Casual Creator for Emotional Expression

## Project Overview
Mood Translator is an interactive casual creator that allows users to translate
their emotional state into an abstract and evolving visual composition. Instead of
asking users to name or label their emotions, the system provides a fluid
particle-based environment where motion, color, and interaction become a form
of expression.

### What are users casually creating?
Users are creating expressive visual “emotional traces” composed of flowing
particle paths, persistent ripples generated through movement, and straight-line
marks created through intentional clicks. The final artifact is an abstract
emotional portrait that reflects both moment-to-moment feeling (through motion)
and deliberate expression (through clicks).

### How does the system keep users engaged and excited to create?
The system provides immediate, continuous feedback to every interaction. Mouse
movement gently alters the flow through persistent ripples, encouraging
exploration without pressure, while mouse clicks introduce clear, decisive
straight lines that feel intentional and expressive. Sliders controlling energy,
tension, and warmth continuously reshape the system’s behavior, making it easy
to explore a wide emotional space without overwhelming the user. Because there
are no goals or failure states, the experience feels meditative and
flow-oriented rather than task-driven.

### How does the system help users feel proud of what they create?
All visual marks persist unless the user chooses to reset the system,
reinforcing a sense of ownership and accumulation. The resulting composition
feels personal and unrepeatable, even with simple interactions. Users can export
their creation as a PNG image, turning a burst of emotional energy into a
art pience that feels meaningful.

## Personal Meaning
This system is personally meaningful to me because it explores emotional
expression without requiring language. Sometimes when I am stressed out doing
work or studying, I end up getting frustrated and just scribbling on my paper 
in anger. And so, I thought it would be interesting to create an experience for
users to display their emotions that are difficult to articulate. Mood Translator
does not try to categorize or interpret emotions; instead, it offers a visual
mirror that responds to how the user moves and acts. I find this approach valuable
because it removes pressure to “get it right” and allows the experience to be
introspective, calm, and personal. The distinction between passive movement
(ripples) and intentional clicks (lines) reflects how emotions often feel
shaped by conscious action.

## Computer Science Reflection
Working on this system challenged me to think beyond correctness and focus on
interaction quality. One of the biggest challenges was designing interactions
that felt precise and meaningful rather than visually noisy or arbitrary. I had
to carefully separate different types of system behavior—particle motion, ripple
forces, and persistent visual marks so that each interaction had a clear
cause-and-effect relationship. This pushed me outside my comfort zone because
it required reasoning about time, accumulation, and perception, not just algorithms.

Another challenge was balancing performance, clarity, and calmness. Small
implementation decisions (such as where and how often visuals are drawn, or
whether effects fade or persist) had a large impact on how the system felt to use.
This was an important challenge because it reinforced that creative systems are
not just about generating output, but about shaping experience. Going forward
I’m interested in exploring more expressive interaction techniques, such as
creating art pieces based on gesture inputs (ie. a wave would be friendly while
wild motion would be deemed chaotic).

## Controls
Mouse move: create ripples
Mouse click: create straight-line marks
Sliders: adjust energy, calm or tense, and warm or cool
S: save artwork as PNG
R: reset the system