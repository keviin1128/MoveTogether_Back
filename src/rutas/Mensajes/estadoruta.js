app.put('/api/messages/:messageId/read', async (req, res) => {
    try {
      const { messageId } = req.params;
      const message = await Message.findByIdAndUpdate(messageId, { isRead: true }, { new: true });
      res.status(200).json(message);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  