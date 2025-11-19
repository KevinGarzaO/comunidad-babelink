"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { UserCredential, type User as FirebaseUser } from "firebase/auth";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Separator } from "./ui/separator";
import { Mail, Github, CheckCircle2, User } from "lucide-react";
import { toast } from "sonner";
import {
  GoogleAuthProvider,
  signInWithPopup,
  GithubAuthProvider,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
} from "firebase/auth";

import { auth, db } from "../firebaseMessaging";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { UserProfile } from "../src/data/userData";
import { useRouter } from "next/navigation";

interface LoginModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function LoginModal({ open, onOpenChange }: LoginModalProps) {
  const router = useRouter();
  const [mode, setMode] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [, setRegistro] = useState(false);
  const [, setUser] = useState<UserProfile>({
    id: "",
    name: "",
    username: "",
    email: "",

    avatar: "",
    coverImage: null,

    specialty: "",
    bio: "",
    location: null,
    website: null,

    joinedDate: new Date().toISOString(),

    stats: { posts: 0, followers: 0, following: 0 },

    social: {},
    badges: [],
    isVerified: false,

    createdOn: null,
    updatedOn: null,
    lastAccess: null,
  });

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // -----------------------------
      // Validaciones para registro
      // -----------------------------
      if (mode === "register") {
        try {
          validateName(name);
          validateEmail(email);
          validatePassword(password, confirmPassword, name, email);
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (validationError: any) {
          toast.error(validationError.message);
          setIsLoading(false);
          return;
        }
      }

      let userCredential: UserCredential;
      let firebaseUser: FirebaseUser = {} as FirebaseUser;

      // -----------------------------
      // Login
      // -----------------------------
      if (mode === "login") {
        try {
          userCredential = await signInWithEmailAndPassword(
            auth,
            email,
            password
          );
          firebaseUser = userCredential.user;
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
          if (err.code === "auth/user-not-found")
            toast.error("Este correo no está registrado.");
          else if (err.code === "auth/wrong-password")
            toast.error("Contraseña incorrecta.");
          else toast.error("Error al iniciar sesión.");
          setIsLoading(false);
          return;
        }
      }

      // -----------------------------
      // Registro
      // -----------------------------
      if (mode === "register") {
        try {
          userCredential = await createUserWithEmailAndPassword(
            auth,
            email,
            password
          );
          firebaseUser = userCredential.user;
          await sendEmailVerification(firebaseUser);
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
          if (err.code === "auth/email-already-in-use")
            toast.error("Este correo ya está registrado.");
          else if (err.code === "auth/invalid-email")
            toast.error("Correo no válido.");
          else if (err.code === "auth/weak-password")
            toast.error("Contraseña débil.");
          else toast.error("Ocurrió un error al registrar al usuario.");
          setIsLoading(false);
          return;
        }

        // -----------------------------
        // Firestore seguro (merge)
        // -----------------------------
        const userRef = doc(db, "usuarios", firebaseUser.uid);

        // Datos base
        const baseUserData: UserProfile = {
          id: firebaseUser.uid,
          name: name || firebaseUser.displayName || "Usuario de Babelink",
          username: email.split("@")[0],
          email,
          avatar: "https://i.ibb.co/4pDNDk1/avatar-default.png",
          coverImage: "",
          specialty: "",
          bio: "",
          location: null,
          website: null,
          joinedDate: new Date().toISOString(),
          stats: { posts: 0, followers: 0, following: 0 },
          social: {},
          badges: [],
          isVerified: false,
          createdOn: serverTimestamp(),
          updatedOn: serverTimestamp(),
          lastAccess: serverTimestamp(),
        };

        // Merge: crea el doc si no existe, actualiza campos dinámicos si existe
        await setDoc(userRef, baseUserData);

        // Leer documento actualizado para UI
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          setUser(userSnap.data() as UserProfile);
        }
      }
      // -----------------------------
      // Toast + abrir modal para nuevos
      // -----------------------------
      toast.success(
        mode === "login" ? "¡Inicio de sesión exitoso!" : "¡Registro exitoso!",
        {
          description:
            mode === "login"
              ? "Bienvenido de vuelta."
              : "Tu cuenta ha sido creada.",
        }
      );

      if (mode === "register") {
        router.push("/perfil?edit=t"); // abrir modal de edición solo para usuario nuevo
      }

      // Limpiar formulario
      closeForm();
    } catch (error) {
      console.error(error);
      toast.error("Ocurrió un error, por favor intenta nuevamente.");
    } finally {
      setIsLoading(false);
    }
  };

  const validateName = (name: string) => {
    if (!name.trim()) throw new Error("El nombre no puede estar vacío.");
    if (name.length < 3) throw new Error("El nombre es muy corto.");
    if (name.length > 50) throw new Error("El nombre es demasiado largo.");
    if (/\d/.test(name)) throw new Error("El nombre no puede tener números.");
    if (/[^a-zA-ZÀ-ÿ\s]/.test(name))
      throw new Error("El nombre contiene caracteres inválidos.");
    if (name.split(" ").length < 2)
      throw new Error("Ingresa tu nombre completo.");
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) throw new Error("El correo no es válido.");
  };

  const validatePassword = (
    password: string,
    confirmPassword: string,
    name: string,
    email: string
  ) => {
    if (password !== confirmPassword)
      throw new Error("Las contraseñas no coinciden.");

    if (password.length < 8)
      throw new Error("La contraseña debe tener mínimo 8 caracteres.");

    if (!/[A-Z]/.test(password))
      throw new Error("Debe contener al menos una letra mayúscula.");

    if (!/[a-z]/.test(password))
      throw new Error("Debe contener al menos una letra minúscula.");

    if (!/[0-9]/.test(password))
      throw new Error("Debe contener al menos un número.");

    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password))
      throw new Error("Debe contener al menos un carácter especial.");

    if (password.includes(" "))
      throw new Error("La contraseña no puede contener espacios.");

    if (password.toLowerCase().includes(name.toLowerCase()))
      throw new Error("La contraseña no puede contener tu nombre.");

    if (password.toLowerCase().includes(email.split("@")[0].toLowerCase()))
      throw new Error("La contraseña no puede contener tu correo.");

    const commonPasswords = [
      "123456",
      "password",
      "qwerty",
      "letmein",
      "welcome",
      "iloveyou",
      "admin",
      "abc123",
      "111111",
      "123123",
    ];

    if (commonPasswords.includes(password.toLowerCase()))
      throw new Error("La contraseña es demasiado común.");
  };

  const closeForm = () => {
    setTimeout(() => {
      setIsSuccess(false);
      setEmail("");
      setPassword("");
      setName("");
      setConfirmPassword("");
      setMode("login"); // vuelve a login por defecto
      onOpenChange(false); // cierra el modal
    }, 1500); // espera para mostrar animación de éxito
  };

  const handleClose = () => {
    if (!isLoading) {
      setEmail("");
      setPassword("");
      setName("");
      setConfirmPassword("");
      setIsSuccess(false);
      setMode("login");
      onOpenChange(false);
    }
  };
  const toggleMode = () => {
    setMode(mode === "login" ? "register" : "login");
    setEmail("");
    setPassword("");
    setName("");
    setConfirmPassword("");
  };

  const handleLoginWithGoogle = async () => {
    setIsLoading(true);
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const userRef = doc(db, "usuarios", user.uid);
      const existingUserSnap = await getDoc(userRef);

      if (!existingUserSnap.exists()) {
        // Usuario NUEVO → crear documento completo
        const newUserData: UserProfile = {
          id: user.uid,
          name: user.displayName || "Usuario de Babelink",
          username: user.email
            ? user.email.split("@")[0]
            : `user${Math.floor(Math.random() * 1000)}`,
          email: user.email || "",
          avatar:
            user.photoURL ||
            `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.email}`,
          coverImage: null,
          specialty: "",
          bio: "",
          location: null,
          website: null,
          joinedDate: new Date().toISOString(),
          stats: { posts: 0, followers: 0, following: 0 },
          social: {},
          badges: [],
          isVerified: false,
          createdOn: serverTimestamp(),
          updatedOn: serverTimestamp(),
          lastAccess: serverTimestamp(),
        };

        await setDoc(userRef, newUserData); // ❌ Sin merge, crea documento
        setUser(newUserData);

        router.push("/perfil?edit=t"); // Abrir edición de perfil
      } else {
        const refreshedDoc = await getDoc(userRef);
        if (refreshedDoc.exists()) setUser(refreshedDoc.data() as UserProfile);
      }

      // UI & STATES
      setRegistro(true);
      onOpenChange(false);
      setIsLoading(false);
      setIsSuccess(true);

      toast.success("¡Inicio de sesión exitoso!", {
        description: `Bienvenido a Babelink ${user.displayName || ""}`,
      });

      setTimeout(() => {
        setIsSuccess(false);
        setEmail("");
        setPassword("");
        setName("");
        setConfirmPassword("");
        setMode("login");
        onOpenChange(false);
      }, 2000);
    } catch (error) {
      console.error("Error durante login con Google:", error);
      setIsLoading(false);
      toast.error("Hubo un problema con el inicio de sesión.");
    }
  };

  const handleLoginWithGithub = async () => {
    setIsLoading(true);
    const provider = new GithubAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const userRef = doc(db, "usuarios", user.uid);
      const existingUserSnap = await getDoc(userRef);

      if (!existingUserSnap.exists()) {
        // Usuario NUEVO → crear documento completo
        const newUserData: UserProfile = {
          id: user.uid,
          name: user.displayName || "Usuario de Babelink",
          username: user.email
            ? user.email.split("@")[0]
            : `user${Math.floor(Math.random() * 1000)}`,
          email: user.email || "",
          avatar:
            user.photoURL ||
            `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.email}`,
          coverImage: null,
          specialty: "",
          bio: "",
          location: null,
          website: null,
          joinedDate: new Date().toISOString(),
          stats: { posts: 0, followers: 0, following: 0 },
          social: {},
          badges: [],
          isVerified: false,
          createdOn: serverTimestamp(),
          updatedOn: serverTimestamp(),
          lastAccess: serverTimestamp(),
        };

        await setDoc(userRef, newUserData); // ❌ NO merge
        setUser(newUserData);

        router.push("/perfil?edit=t"); // Abrir edición de perfil
      } else {
        const refreshedDoc = await getDoc(userRef);
        if (refreshedDoc.exists()) setUser(refreshedDoc.data() as UserProfile);
      }

      // UI
      setRegistro(true);
      onOpenChange(false);
      setIsLoading(false);
      setIsSuccess(true);

      toast.success("¡Inicio de sesión exitoso!", {
        description: `Bienvenido a Babelink ${user.displayName || ""}`,
      });

      setTimeout(() => {
        setIsSuccess(false);
        setEmail("");
        setPassword("");
        setName("");
        setConfirmPassword("");
        setMode("login");
        onOpenChange(false);
      }, 2000);
    } catch (error) {
      console.error("Error durante login con GitHub:", error);
      setIsLoading(false);
      toast.error("Hubo un problema con el inicio de sesión.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[480px] p-0 overflow-hidden">
        {/* Header con fondo degradado */}
        <div className="bg-linear-to-br from-[#333366] to-[#4a4a7a] p-6 pb-8 text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-40 h-40 bg-[#FFCC00] rounded-full blur-2xl"></div>
          </div>
          <DialogHeader className="relative">
            <DialogTitle className="text-2xl text-white">
              {mode === "login"
                ? "Inicia sesión en Babelink"
                : "Regístrate en Babelink"}
            </DialogTitle>
            <DialogDescription className="text-[#E2E3F7] mt-2">
              {mode === "login"
                ? "Accede a tu cuenta para continuar"
                : "Crea tu cuenta y únete a la comunidad"}
            </DialogDescription>
          </DialogHeader>
        </div>

        <div className="p-6">
          {!isSuccess ? (
            <>
              {/* Botones de login social */}
              <div className="space-y-3 mb-6">
                <Button
                  variant="outline"
                  className="w-full h-12 border-2 hover:border-[#FFCC00] hover:bg-[#FFCC00]/5 transition-all"
                  onClick={() => handleLoginWithGoogle()}
                >
                  <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                    <path
                      fill="#EA4335"
                      d="M5.26620003,9.76452941 C6.19878754,6.93863203 8.85444915,4.90909091 12,4.90909091 C13.6909091,4.90909091 15.2181818,5.50909091 16.4181818,6.49090909 L19.9090909,3 C17.7818182,1.14545455 15.0545455,0 12,0 C7.27006974,0 3.1977497,2.69829785 1.23999023,6.65002441 L5.26620003,9.76452941 Z"
                    />
                    <path
                      fill="#34A853"
                      d="M16.0407269,18.0125889 C14.9509167,18.7163016 13.5660892,19.0909091 12,19.0909091 C8.86648613,19.0909091 6.21911939,17.076871 5.27698177,14.2678769 L1.23746264,17.3349879 C3.19279051,21.2936293 7.26500293,24 12,24 C14.9328362,24 17.7353462,22.9573905 19.834192,20.9995801 L16.0407269,18.0125889 Z"
                    />
                    <path
                      fill="#4A90E2"
                      d="M19.834192,20.9995801 C22.0291676,18.9520994 23.4545455,15.903663 23.4545455,12 C23.4545455,11.2909091 23.3454545,10.5818182 23.1818182,9.90909091 L12,9.90909091 L12,14.4545455 L18.4363636,14.4545455 C18.1187732,16.013626 17.2662994,17.2212117 16.0407269,18.0125889 L19.834192,20.9995801 Z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.27698177,14.2678769 C5.03832634,13.556323 4.90909091,12.7937589 4.90909091,12 C4.90909091,11.2182781 5.03443647,10.4668121 5.26620003,9.76452941 L1.23999023,6.65002441 C0.43658717,8.26043162 0,10.0753848 0,12 C0,13.9195484 0.444780743,15.7301709 1.23746264,17.3349879 L5.27698177,14.2678769 Z"
                    />
                  </svg>
                  Continuar con Google
                </Button>

                <Button
                  variant="outline"
                  className="w-full h-12 border-2 hover:border-[#FFCC00] hover:bg-[#FFCC00]/5 transition-all"
                  onClick={() => handleLoginWithGithub()}
                >
                  <Github className="w-5 h-5 mr-3" />
                  Continuar con GitHub
                </Button>
              </div>

              {/* Divisor */}
              <div className="relative my-6">
                <Separator />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-3">
                  <span className="text-sm text-gray-500">o con tu correo</span>
                </div>
              </div>

              {/* Formulario de login o registro */}
              <form onSubmit={handleEmailSubmit} className="space-y-4">
                {mode === "register" && (
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-[#333366]">
                      Nombre completo
                    </Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <Input
                        id="name"
                        type="text"
                        placeholder="Tu nombre"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        disabled={isLoading}
                        className="pl-10 h-12 border-2 focus:border-[#FFCC00] focus:ring-[#FFCC00]"
                      />
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-[#333366]">
                    Correo electrónico
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="tu@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      disabled={isLoading}
                      className="pl-10 h-12 border-2 focus:border-[#FFCC00] focus:ring-[#FFCC00]"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-[#333366]">
                    Contraseña
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={isLoading}
                    className="h-12 border-2 focus:border-[#FFCC00] focus:ring-[#FFCC00]"
                  />
                </div>

                {mode === "register" && (
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword" className="text-[#333366]">
                      Confirmar contraseña
                    </Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="••••••••"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                      disabled={isLoading}
                      className="h-12 border-2 focus:border-[#FFCC00] focus:ring-[#FFCC00]"
                    />
                  </div>
                )}

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-12 bg-[#FFCC00] hover:bg-[#FFCC00]/90 text-[#333366]"
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-[#333366] border-t-transparent rounded-full animate-spin"></div>
                      {mode === "login"
                        ? "Iniciando sesión..."
                        : "Creando cuenta..."}
                    </div>
                  ) : mode === "login" ? (
                    "Iniciar sesión"
                  ) : (
                    "Crear cuenta"
                  )}
                </Button>
              </form>

              {/* Nota de privacidad */}
              <p className="text-xs text-gray-500 text-center mt-4">
                {mode === "login" ? (
                  <>
                    ¿No tienes cuenta?{" "}
                    <button
                      className="text-[#333366] hover:underline"
                      onClick={toggleMode}
                      type="button"
                    >
                      Regístrate aquí
                    </button>
                  </>
                ) : (
                  <>
                    ¿Ya tienes cuenta?{" "}
                    <button
                      className="text-[#333366] hover:underline"
                      onClick={toggleMode}
                      type="button"
                    >
                      Inicia sesión
                    </button>
                  </>
                )}
              </p>
            </>
          ) : (
            /* Estado de éxito */
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl mb-2 text-[#333366]">
                {mode === "login"
                  ? "¡Bienvenido de vuelta!"
                  : "¡Cuenta creada!"}
              </h3>
              <p className="text-gray-600">
                {mode === "login"
                  ? "Has iniciado sesión correctamente"
                  : "Tu cuenta ha sido creada exitosamente"}
              </p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
