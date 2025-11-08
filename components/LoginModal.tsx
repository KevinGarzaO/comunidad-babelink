"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Separator } from "./ui/separator";
import { Mail, Github, CheckCircle2, User } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "../src/contexts/AuthContext";

interface LoginModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function LoginModal({ open, onOpenChange }: LoginModalProps) {
  const { login } = useAuth();
  const [mode, setMode] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (mode === "register") {
      // Validaciones para registro
      if (!name || !email || !password || !confirmPassword) {
        toast.error("Por favor completa todos los campos");
        return;
      }
      if (password !== confirmPassword) {
        toast.error("Las contraseñas no coinciden");
        return;
      }
      if (password.length < 6) {
        toast.error("La contraseña debe tener al menos 6 caracteres");
        return;
      }
    } else {
      // Validaciones para login
      if (!email || !password) return;
    }

    setIsLoading(true);
    // Simular inicio de sesión o registro
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);

      // Crear usuario mock
      const userData = {
        id: Math.floor(Math.random() * 1000),
        name: name || "Usuario de Babelink",
        email: email,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
        username: email.split("@")[0],
        bio: "Miembro de la comunidad Babelink",
        isVerified: false, // Usuarios normales no son verificados
      };

      // Guardar usuario en el contexto
      login(userData);

      toast.success(
        mode === "login" ? "¡Inicio de sesión exitoso!" : "¡Registro exitoso!",
        {
          description:
            mode === "login"
              ? "Bienvenido de vuelta a Babelink."
              : "Tu cuenta ha sido creada exitosamente.",
        }
      );
      setTimeout(() => {
        setIsSuccess(false);
        setEmail("");
        setPassword("");
        setName("");
        setConfirmPassword("");
        setMode("login");
        onOpenChange(false);
      }, 2000);
    }, 1000);
  };

  const handleSocialLogin = (provider: string) => {
    setIsLoading(true);
    // Simular autenticación social
    setTimeout(() => {
      const userData = {
        id: Math.floor(Math.random() * 1000),
        name: `Usuario de ${provider}`,
        email: `usuario@${provider.toLowerCase()}.com`,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${provider}`,
        username: provider.toLowerCase() + "_user",
        bio: `Conectado vía ${provider}`,
        isVerified: false, // Usuarios normales no son verificados
      };

      login(userData);
      setIsLoading(false);
      setIsSuccess(true);

      toast.success("¡Inicio de sesión exitoso!", {
        description: `Conectado con ${provider}`,
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
    }, 1000);
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
                  onClick={() => handleSocialLogin("Gmail")}
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
                  onClick={() => handleSocialLogin("GitHub")}
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
