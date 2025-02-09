- By default, a Run will use the model and tools configuration specified in Assistant object, but you can override most of these when creating the Run for added flexibility [Link](https://platform.openai.com/docs/assistants/deep-dive#runs-and-run-steps)

- When a Run is in_progress and not in a terminal state, the Thread is locked. This means that: [Link](https://platform.openai.com/docs/assistants/deep-dive#thread-locks)
    - New Messages cannot be added to the Thread.
    - New Runs cannot be created on the Thread.

---

1. Presuming multiple **Threads** can be linked to a single assistant. 