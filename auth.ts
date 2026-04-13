import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [GitHub],
  // Páginas personalizadas (vamos usar isto mais tarde para o design do teu login)
  pages: {
    signIn: '/login', 
  },
  callbacks: {
    // Esta função garante que, mesmo que alguém inicie sessão com GitHub, tem de ser o TEU email a entrar
    async signIn({ user }) {
      const teuEmail = "o.teu.email@gmail.com"; // Substitui pelo email da tua conta GitHub
      if (user.email === teuEmail) {
        return true;
      }
      return false; // Rejeita qualquer outra pessoa
    },
  }
})