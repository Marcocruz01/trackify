// Definimos el type 
type ErrorMessageProps = {
    children: React.ReactNode;
}

// Definimos el componente ErrorMessage
export default function ErrorMessage({children} : ErrorMessageProps) {
  return (
    <p className="bg-red-600/10 text-red-600 font-semibold text-sm text-center px-4 py-2 rounded-lg">
        {children}
    </p>
  )
}
