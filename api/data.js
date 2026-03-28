// this is a Vercel serverless function, it acts like an API endpoint
export default function handler(req, res) {
  res.status(200).json({
    data: [
      {
        image: "https://randomfox.ca/images/1.jpg",
        title: "Morning Fox",
        description: "caught this little guy at sunrise"
      },
      {
        image: "https://randomfox.ca/images/2.jpg",
        title: "Sneaky Fox",
        description: "always up to something"
      },
      {
        image: "https://randomfox.ca/images/3.jpg",
        title: "Sleepy Fox",
        description: "just vibing in the grass"
      }
    ]
  });
}