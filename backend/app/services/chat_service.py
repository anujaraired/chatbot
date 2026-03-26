def get_reply(message: str):
    message = message.lower()

    if "hello" in message:
        return "Hi 👋 How can I help you?"

    if "price" in message:
        return "Our pricing starts from ₹999"

    if "seo" in message:
        return "We provide SEO services 🚀"

    if "contact" in message:
        return "Contact us at support@adaired.com"

    return "Sorry, I didn't understand that 😅"