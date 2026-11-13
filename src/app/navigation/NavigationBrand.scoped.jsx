import { A } from "@solidjs/router";
import "./NavigationBrand.scoped.css";

export function NavigationBrand() {
  return (
    <A scoped href="/" end class="brand" aria-label="Legendary Octo Barnacle, home">
      <span class="logo" aria-hidden="true">LOB</span>
      <span class="name" aria-hidden="true">Octo Barnacle</span>
    </A>
  );
}
