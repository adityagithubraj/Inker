const { Client } = require('@elastic/elasticsearch');
const client = new Client({ node: 'http://localhost:9200' });


async function syncToElasticsearch(post) {
  await client.index({
    index: 'blogs',
    id: post._id.toString(),
    body: {
      subject: post.subject,
      details: post.details,
      author: post.author,
      createdAt: post.createdAt
    }
  });
}