import { useRouter } from 'next/router'
import { ReactNode } from 'react'
import styles from "../styles/Layout.module.css"

export default function NavbarLink({ children, href } : {children: ReactNode, href: string}) {
  const router = useRouter()
  
  const className = router.pathname === href ? styles.current : ""

  return (
    <a href={href} className={className}>
      {children}
    </a>
  )
}