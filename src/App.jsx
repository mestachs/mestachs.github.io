import { useEffect, useState } from "react";
import { motion } from "framer-motion";

function randomGradient() {
  const colors = [
    "red",
    "pink",
    "rose",
    "orange",
    "amber",
    "yellow",
    "lime",
    "green",
    "emerald",
    "teal",
    "cyan",
    "sky",
    "blue",
    "indigo",
    "violet",
    "purple",
    "fuchsia",
  ];

  const shades = ["300", "400", "500", "600", "700"];

  const pick = () =>
    `${colors[Math.floor(Math.random() * colors.length)]}-${
      shades[Math.floor(Math.random() * shades.length)]
    }`;

  return `from-${pick()} via-${pick()} to-${pick()}`;
}

export default function App() {
  const username = "mestachs"; // ← replace
  const [user, setUser] = useState(null);
  const tools = [
    {
      title: "PDF Toolbox",
      desc: "Simple web tools for PDFs and images (merge and compress).",
      url: "https://mestachs.github.io/pdf-toolbox/",
    },
    {
      title: "Parquet Viewer",
      desc: "Parquet viewer with export to excel, csv and parquet.",
      url: "https://mestachs.github.io/parquet-viewer/",
    },
    {
      title: "Shary",
      desc: "QR code generator to share things with your mobile.",
      url: "https://mestachs.github.io/shary/",
    },
    {
      title: "Taskr",
      desc: "Small notebook environnement",
      url: "https://mestachs.github.io/taskr/#/gh/g/mestachs/c0fd9058cf5b7a02eae11e1d77ca4d09",
    },
    {
      title: "Superset but fully client side",
      desc: "Proof of concept of a parquet based superset without backend.",
      url: "https://mestachs.github.io/parquet-viewer/#/dashboard/orgunits",
    },
    {
      title: "Solitaire",
      desc: "The classic card game",
      url: "https://mestachs.github.io/besolitair/#/spider/1/easy",
    },
  ];
  for (let tool of tools) {
    tool.gradient = randomGradient();
  }
  useEffect(() => {
    const fetchData = async () => {
      const [u, r] = await Promise.all([
        fetch(`https://api.github.com/users/${username}`).then((res) =>
          res.json()
        ),
      ]);
      setUser(u);
    };
    fetchData();
  }, []);

  if (!user)
    return (
      <div className="flex h-screen items-center justify-center text-xl">
        Loading...
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 flex flex-col items-center p-6 gap-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mt-12"
      >
        <img
          src={user.avatar_url}
          alt="avatar"
          className="w-32 h-32 rounded-full mx-auto mb-4 shadow-lg"
        />
        <h1 className="text-3xl font-bold mb-2">{user.name || user.login}</h1>
        <p className="text-gray-400 mb-4">{user.bio}</p>
        <div className="grid gap-4">
          <a href={user.html_url} className="text-blue-400 hover:underline">
            GitHub
          </a>
          {user.blog && (
            <a
              href={
                user.blog.startsWith("http")
                  ? user.blog
                  : "https://" + user.blog
              }
              className="text-blue-400 hover:underline"
            >
              Blog
            </a>
          )}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        viewport={{ once: true }}
        className="w-full flex justify-center"
      >
        <section className="mt-20 w-full max-w-5xl gap-6">
          <h2 className="text-2xl font-semibold mb-6 text-center">
            Side Projects and everyday tools
          </h2>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {tools.map((p) => (
              <a
                key={p.url}
                href={p.url}
                target="_blank"
                rel="noreferrer"
                className={`
                  relative block rounded-2xl p-[1px]
                  bg-gradient-to-r ${p.gradient} transition-transform duration-300 hover:-translate-y-1 hover:scale-[1.02]
                `}
              >
                <div className="rounded-2xl bg-gray-950 p-5 h-full flex flex-col justify-between">
                  <div>
                    <h3 className="font-semibold text-lg mb-2 text-gray-100">
                      {p.title}
                    </h3>
                    <p className="text-gray-400 text-sm">{p.desc}</p>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </section>
      </motion.div>

      <footer className="mt-auto py-6 text-gray-600 text-sm"></footer>
    </div>
  );
}
