import subprocess
import gradio as gr

# Start the Node.js server in the background
subprocess.Popen(["node", "server.js"])

# Define your Gradio interface logic
def chat_with_bot(user_message):
    # This is just a placeholder; replace with actual bot response logic
    return "Bot response to: " + user_message

# Create a simple Gradio interface
iface = gr.Interface(fn=chat_with_bot, inputs="text", outputs="text")
iface.launch()