const endpoint = "https://www.rollingstone.com/wp-json/wp/v2/posts?per_page=25";

fetch(endpoint)
  .then((blob) => {
    if (blob.status === 200) {
      return blob.json();
    }

    throw new Error(
      "La richiesta ha prodotto un codice di stato " +
        blob.status +
        ". Impossibile recuperare gli articoli."
    );
  })
  .then((posts) => {
    posts.forEach((post) => {
      const newPost =  document.getElementById("post-template").cloneNode(true);
      newPost
        .querySelector(".post-thumbnail")
        .setAttribute("src", post.jetpack_featured_media_url);
      newPost
        .querySelector(".post-thumbnail")
        .setAttribute("alt", post.title.rendered);
      newPost.querySelector(".post-title").innerHTML = post.title.rendered;
      newPost.querySelector(".post-excerpt").innerHTML = post.excerpt.rendered;
      newPost.querySelector(".post-permalink").setAttribute("href", post.link);
      document.getElementById("blog-timeline").appendChild(newPost);
      newPost.removeAttribute("id");
      newPost.removeAttribute("hidden");
      newPost.classList.add("post");
    });
  })
  .catch((error) => {
    console.error(error);
  });
