import { useRouter } from 'next/router'
import { MouseEventHandler, ReactNode, useState } from 'react'
import styles from "../styles/Layout.module.css"

type Section = {
  name: string
  relPath: string
  subsections?: Section[]
}

type Props = {
  rootSections: Section[]
}

function NavbarLink({ children, href="#", onHover, onClick, isOnPath=false, isTempSelected=false} : {
    children: ReactNode,
    href?: string,
    onHover?: MouseEventHandler
    onClick?: MouseEventHandler
    isOnPath?: boolean
    isTempSelected?: boolean
  }) {
  const router = useRouter()
  
  let className = router.pathname === href ? styles.current : ""
  if (isOnPath) {
    className += " " + styles.onpath
  }
  else if (isTempSelected) {
    className += " " + styles.tempselected
  }
  return (
    <a href={href} className={className} onMouseEnter={onHover} onClick={onClick}>
      {children}
    </a>
  )
}

export default function MultiTierNavbar({rootSections} : Props) {
  const router = useRouter();

  const getNavSequence : () => [Section[], number[]] = () => {
    // gets the sequence of `Section`s that lead to the current page
    let pathname = router.pathname;
    console.log(rootSections)
    let initial: [Section[], number[], Section[] | undefined] = [new Array<Section>, new Array<number>, rootSections];
    console.log(pathname.split('/'))
    const [seq, indexSeq, _] = pathname.split('/').slice(1).reduce((prev, curr) => {
      let [partialSeq, partialIndexSeq, sections] = prev;
      console.log(partialSeq, sections, curr);
      let ret: [Section[], number[], Section[] | undefined] = [partialSeq, partialIndexSeq, undefined]
      if (sections !== undefined) {
        sections.forEach((section, i) => {
          if (section.relPath === curr) {
            ret = [partialSeq.concat(section), partialIndexSeq.concat(i), section.subsections]
          }
        });
      }
      console.log(ret)
      return ret
    }, initial)
    console.log(seq)
    return [seq, indexSeq];
  }

  const [currentPageNavSequence, currentPageNavIndexSequence] = getNavSequence();

  let [indexSequence, setIndexSequence] = useState(currentPageNavIndexSequence);

  let [expandedTier, setExpandedTier] = useState(currentPageNavSequence.length - 1);

  const handleHover = (tier: number, index: number) => {
    setExpandedTier(tier);
  }

  const handleLowTierClick = (tier: number, index: number) => {
    let newIndexSequence = [...indexSequence]
    newIndexSequence[tier] = index
    setIndexSequence(newIndexSequence)
    setExpandedTier(tier + 1)
  }

  const getLinkSequence = () => {
    let href = ""
    let ret: JSX.Element[] = [];
    let currentSections: Section[] | undefined = rootSections
    indexSequence.forEach((sectionIndex, tier) => {
      if (currentSections === undefined) {
        throw new Error("incorrect section structure");
      }

      let children: JSX.Element[] = [];
      const selectedSection = currentSections[sectionIndex];
      if (tier === expandedTier) {
        currentSections.forEach((siblingSection, index) => {
          
          let isOnPath = true;
          for (let t = 0; t < tier; t++) {
            if (indexSequence[t] !== currentPageNavIndexSequence[t]) {
              isOnPath = false;
              break;
            }
          }
          if (index !== currentPageNavIndexSequence[tier]) {
            isOnPath = false;
          }
          const isTempSelected = indexSequence[tier] == index;

          if (tier === indexSequence.length - 1) {
            const tempHref = href + "/" + siblingSection.relPath
            children.push(
              <NavbarLink href={tempHref} isOnPath={isOnPath}>{siblingSection.name}</NavbarLink>
            )
          }
          else {
            children.push(
              <NavbarLink
                isOnPath={isOnPath}
                onClick={(e) => handleLowTierClick(tier, index)}
                isTempSelected={isTempSelected}
              >
                {siblingSection.name}
              </NavbarLink>
            )
          }
        })
        href += "/" + selectedSection.relPath;
      }
      else {
        href += "/" + selectedSection.relPath;
        let isOnPath = true;
        for (let t = 0; t <= tier; t++) {
          if (indexSequence[t] !== currentPageNavIndexSequence[t]) {
            isOnPath = false;
            break;
          }
        }
        if (tier === indexSequence.length - 1) {
          children.push(
            <NavbarLink 
              href={href}
              onHover={e => handleHover(tier, sectionIndex)}
              isOnPath={isOnPath}
              isTempSelected={true}
            >
              {selectedSection.name}
            </NavbarLink>
          )
        }
        else {
          children.push(
            <NavbarLink 
              onHover={e => handleHover(tier, sectionIndex)}
              onClick={(e) => handleLowTierClick(tier, sectionIndex)}
              isOnPath={isOnPath}
              isTempSelected={true}
            >
              {selectedSection.name}
            </NavbarLink>
          )
        }
      }
      currentSections = selectedSection.subsections;
      children.push(<span className={styles.divider}> &raquo; </span>);
      ret.push(<>{children}</>)

    })
    return ret
  }

  return (
    <>{getLinkSequence()}</>
  )
}