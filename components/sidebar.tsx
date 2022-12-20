import { useRouter } from "next/router"
import { useState } from "react"
import styles from "../styles/Layout.module.css"

type Section = {
  name: string
  relPath: string
  subsections?: Section[]
}

type Props = {
  rootSections: Section[]
}

function CollapsibleSidebarLink({section, depth = 0, basePath = "", visible=true}: {section: Section, depth?: number, basePath?: string, visible?: boolean}) {
  const path = basePath + "/" + section.relPath
  const router = useRouter()
  let className = styles.sidebarLink
  let onpath = false;
  console.log(router.pathname)
  if (router.pathname === path) {
    className += " " + styles.current
  }
  else if (router.pathname.substring(0, path.length) === path) {
    className += " " + styles.onpath
    onpath = true
  }
  if (depth === 1) {
    className += " " + styles.depth1
  }
  if (!visible) {
    className += " " + styles.hidden
  }
  let [expanded, setExpanded] = useState(onpath)
  const toggleVisibility = () => {
    setExpanded(!expanded);
  }
  if (section.subsections !== undefined) {
    return <>
      <a href={"#"} onClick={toggleVisibility}>
        <div className={className}>
          <span className={onpath ? styles.onpathArrow : ""}>
            {expanded ? "⯆" : "⯈"} &nbsp;
          </span>
          {section.name}
        </div>
      </a>
      {section.subsections?.map((subsec, i) => 
        <CollapsibleSidebarLink 
          section={subsec}
          key={i}
          depth={depth + 1}
          basePath={path}
          visible={expanded}
        />
      )}
    </>
  }
  else {
    return <>
      <a href={path}>
        <div className={className}>
          {section.name}
        </div>
      </a>
    </>
  }
}

export default function Sidebar({rootSections} : Props) {
  return (
    <div className={styles.sidebar}>
      {rootSections.map((sec, i) => <CollapsibleSidebarLink section={sec} key={i}/>)}
    </div>
  )
}