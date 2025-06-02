import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "@mui/material/Link";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";

type Crumb = {
  label: string
  href: string
}

export default function MuiBreadcrumbs() {
  const pathname = usePathname()
  const [breadcrumbList, setBreadcrumbList] = useState<Crumb[]>([])

  function formatLabel(str: string) {
    return str
      .split("-")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
  }

  useEffect(() => {
    const parts = pathname.split("/").filter(Boolean)
    const crumbs: Crumb[] = [{ label: "Home", href: "/" }]

    parts.reduce((prevPath, currPart) => {
      const currentPath = `${prevPath}/${currPart}`
      crumbs.push({
        label: formatLabel(currPart),
        href: currentPath,
      })
      return currentPath
    }, "")

    setBreadcrumbList(crumbs)
  }, [pathname])

  return (
    <Breadcrumbs
      aria-label="breadcrumb"
      separator={
        <span style={{ fontSize: "1.5rem", color: "#F3F3F3" }}>/</span>
      }
    >
      {breadcrumbList.map((crumb, index) => {
        const isLast = index === breadcrumbList.length - 1
        return isLast ? (
          <Typography key={index} color="text.primary" aria-current="page">
            <span style={{color: "#F3F3F3", fontFamily: "Montserrat", letterSpacing: "0.5px", fontSize: 18}}>{crumb.label}</span>
          </Typography>
        ) : (
          <Link
            key={index}
            underline="hover"
            color="inherit"
            href={crumb.href}
          >
            <span style={{color: "#F3F3F3", fontFamily: "Montserrat", letterSpacing: "0.5px", fontSize: 18, opacity: "0.8"}}>{crumb.label}</span>
          </Link>
        )
      })}
    </Breadcrumbs>
  )
}
