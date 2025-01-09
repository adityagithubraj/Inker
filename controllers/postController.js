



exports.createPost = async (req, res) => {
    try {
      const { subject, details } = req.body;
      const newPost = new Post({
        author: req.user.userId,
        subject,
        details,
        imageUrl: req.file?.path,
      });
  
      await newPost.save();
  
      // Sync to Elasticsearch
      await esClient.index({
        index: 'blogs',
        document: {
          subject,
          details,
          author: req.user.userId,
          createdAt: newPost.createdAt,
        },
      });
  
      res.status(201).json({ message: 'Post created successfully', postId: newPost._id });
    } catch (err) {
      res.status(500).json({ message: 'Error creating post', error: err.message });
    }
  };
  