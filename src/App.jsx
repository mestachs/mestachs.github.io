import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function App() {
  const username = "mestachs"; // ← replace
  const [user, setUser] = useState(null);
  const repos = [];
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
        className="grid sm:grid-cols-2 md:grid-cols-3 gap-8"
      >
        <section className="mt-20 w-full max-w-5xl gap-6">
          <h2 className="text-2xl font-semibold mb-6 text-center">
            My Projects
          </h2>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[
              {
                title: "PDF Toolbox",
                desc: "Simple web tools for PDFs (merge and compress).",
                url: "https://mestachs.github.io/pdf-toolbox/",
                gradient: "from-pink-500 via-purple-500 to-indigo-500",
              },
              {
                title: "Parquet Viewer",
                desc: "Parquet viewer with export to excel, csv and parquet.",
                url: "https://mestachs.github.io/parquet-viewer/",
                gradient: "from-pink-500 via-purple-500 to-indigo-500",                
              },
              {
                title: "Shary",
                desc: "QR code generator to share things with your mobile.",
                url: "https://mestachs.github.io/shary/",
                gradient: "from-amber-400 via-orange-500 to-rose-500",
              },
              {
                title: "Taskr",
                desc: "Small notebook environnement",
                url: "https://mestachs.github.io/taskr/#/gh/g/mestachs/c0fd9058cf5b7a02eae11e1d77ca4d09",
                gradient: "from-cyan-400 via-blue-500 to-indigo-500",
              },
            ].map((p) => (
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
                <h3 className="font-semibold mb-1 text-lg">{p.title}</h3>
                <p className="text-gray-400 text-sm line-clamp-2">{p.desc}</p>
              </a>
            ))}
          </div>
        </section>
      </motion.div>

      <footer className="mt-auto py-6 text-gray-600 text-sm"></footer>
    </div>
  );
}
