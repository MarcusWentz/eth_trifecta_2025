import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { CheckCircle, XCircle, AlertCircle, X } from "lucide-react"

const toastVariants = cva(
  "fixed flex items-center gap-3 shadow-lg rounded-lg p-4 transition-all duration-300 max-w-md z-50",
  {
    variants: {
      variant: {
        success: 
          "bg-green-500/10 border border-green-500/30 text-green-400",
        error: 
          "bg-red-500/10 border border-red-500/30 text-red-400",
        warning: 
          "bg-amber-500/10 border border-amber-500/30 text-amber-400",
        info: 
          "bg-blue-500/10 border border-blue-500/30 text-blue-400",
      },
      position: {
        "top-right": "top-4 right-4",
        "top-left": "top-4 left-4",
        "bottom-right": "bottom-4 right-4",
        "bottom-left": "bottom-4 left-4",
        "top-center": "top-4 left-1/2 -translate-x-1/2",
        "bottom-center": "bottom-4 left-1/2 -translate-x-1/2",
      },
    },
    defaultVariants: {
      variant: "info",
      position: "top-right",
    },
  }
)

export interface ToastProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof toastVariants> {
  message: string
  onClose?: () => void
  autoClose?: boolean
  autoCloseTime?: number
}

const Toast = React.forwardRef<HTMLDivElement, ToastProps>(
  ({ 
    className, 
    variant, 
    position, 
    message, 
    onClose, 
    autoClose = true, 
    autoCloseTime = 5000, 
    ...props 
  }, ref) => {
    const [isVisible, setIsVisible] = React.useState(true)
    
    React.useEffect(() => {
      if (autoClose) {
        const timer = setTimeout(() => {
          setIsVisible(false)
          if (onClose) onClose()
        }, autoCloseTime)
        
        return () => clearTimeout(timer)
      }
    }, [autoClose, autoCloseTime, onClose])
    
    if (!isVisible) return null
    
    const handleClose = () => {
      setIsVisible(false)
      if (onClose) onClose()
    }
    
    const getIcon = () => {
      switch (variant) {
        case "success":
          return <CheckCircle className="h-5 w-5" />
        case "error":
          return <XCircle className="h-5 w-5" />
        case "warning":
        case "info":
        default:
          return <AlertCircle className="h-5 w-5" />
      }
    }
    
    return (
      <div
        className={cn(toastVariants({ variant, position, className }))}
        ref={ref}
        {...props}
      >
        {getIcon()}
        <span className="flex-1">{message}</span>
        <button 
          onClick={handleClose}
          className="p-1 rounded-full hover:bg-slate-700/50 transition-colors"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    )
  }
)
Toast.displayName = "Toast"

export { Toast }

export function useToast() {
  const [toast, setToast] = React.useState<{
    visible: boolean;
    message: string;
    variant: "success" | "error" | "warning" | "info";
    position?: "top-right" | "top-left" | "bottom-right" | "bottom-left" | "top-center" | "bottom-center";
  }>({
    visible: false,
    message: "",
    variant: "info",
    position: "top-right"
  })
  
  const showToast = (
    message: string, 
    variant: "success" | "error" | "warning" | "info" = "info",
    position?: "top-right" | "top-left" | "bottom-right" | "bottom-left" | "top-center" | "bottom-center"
  ) => {
    setToast({ visible: true, message, variant, position })
  }
  
  const hideToast = () => {
    setToast(prev => ({ ...prev, visible: false }))
  }
  
  return {
    toast,
    showToast,
    hideToast
  }
} 