module.exports = {
  getChatId(msg) {
    return msg.chat.id
  },
  getChatIdInMessage(msg) {
    return msg.message.chat.id
  }
}