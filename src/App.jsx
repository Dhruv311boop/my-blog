import React, { useState } from "react";

export default function BlogApp() {
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: "My Journey into Coding",
      content:
        "I started coding out of curiosity, and slowly it became my passion. This blog is where I share my journey and things I learn along the way.",
    },
    {
      id: 2,
      title: "Best Resources for JEE Prep",
      content:
        "Preparing for JEE can be overwhelming. Some of the best resources I used were NCERT, HC Verma, and mock test series. Consistency is the real game changer.",
    },
    {
      id: 3,
      title: "Why I Love Open Source",
      content:
        "Open source is about collaboration and learning from others. Contributing to projects not only builds skills but also helps the community.",
    },
  ]);

  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");

  // Add a new post
  const handleAddPost = (e) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;
    const newPost = {
      id: Date.now(),
      title: newTitle,
      content: newContent,
    };
    setPosts([newPost, ...posts]);
    setNewTitle("");
    setNewContent("");
  };

  // Delete a post
  const handleDeletePost = (id) => {
    setPosts(posts.filter((post) => post.id !== id));
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      {/* Blog Header */}
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold mb-2">Dhruv's Blog</h1>
        <p className="text-gray-600">Thoughts, experiences, and learning journey ✨</p>
      </header>

      {/* Add Post Form */}
      <form onSubmit={handleAddPost} className="mb-8 bg-white shadow p-4 rounded-xl">
        <h2 className="text-xl font-semibold mb-3">Add a New Post</h2>
        <input
          type="text"
          placeholder="Post title"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          className="w-full border rounded p-2 mb-3"
        />
        <textarea
          placeholder="Post content"
          value={newContent}
          onChange={(e) => setNewContent(e.target.value)}
          className="w-full border rounded p-2 mb-3"
          rows="4"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Add Post
        </button>
      </form>

      {/* Blog Posts */}
      <div className="space-y-6">
        {posts.map((post) => (
          <article
            key={post.id}
            className="bg-white shadow p-6 rounded-xl border relative"
          >
            <h2 className="text-2xl font-bold mb-2">{post.title}</h2>
            <p className="text-gray-700 mb-4">{post.content}</p>
            <button
              onClick={() => handleDeletePost(post.id)}
              className="absolute top-4 right-4 text-sm bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            >
              Delete
            </button>
          </article>
        ))}
      </div>
    </div>
  );
}
