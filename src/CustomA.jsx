import { A as A2, useLocation } from "@solidjs/router";

export function A(props) {
  const location = useLocation()
  if(props.href.startsWith("/")) {
    return <A2 {...props} />
  } else {
    return <A2 {...props} href={location.pathname.replace("/MyAniList", "") + "/" + props.href}/>
  }
}
