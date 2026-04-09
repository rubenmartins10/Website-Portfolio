export default function Footer() {
  return (
    <footer className="w-full border-t border-zinc-800 mt-20">
      <div className="max-w-4xl mx-auto px-6 py-8 flex justify-center items-center">
        <p className="text-sm text-zinc-500">
          © {new Date().getFullYear()} Rúben Martins. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  )
}