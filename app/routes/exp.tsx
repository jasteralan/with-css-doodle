import { useEffect } from "react";
import Doodle, { DoodleUse } from "~/components/Doodle";

let tout: null | NodeJS.Timeout = null;

export default function Exp() {
  useEffect(() => {
    tout = setTimeout(() => {
      window.location.reload();
    }, 30000);

    return () => clearTimeout(tout);
  }, []);

  return (
    <>
      <button className="absolute top-2 left-2 p-4 text-2xl" onClick={() => clearTimeout(tout)}>⏱️</button>

      <div className="bg-zinc-50 w-full min-h-screen flex items-center justify-center">
        <div className="w-[70vh] aspect-square border rounded bg-white overflow-hidden">
          <DoodleUse usevar="--pattern-7" />

          {/* <Doodle rule={`
            @grid: 1 / 100%;

            background: @shaders(
              texture_0 {
                background: linear-gradient(
                  @r(360deg),
                  @stripe.@m10.@pn(#d62828, #fcbf49, #eae2b7, #000)
                );
              }
              fragment {
                #define TAU (2. * 3.141593)
                void main() {
                  vec2 ur = u_resolution;
                  vec2 c = vec2(.5, .5);
                  vec2 p = gl_FragCoord.xy / ur.xy - c;
                  float r = length(p);
                  float len = length(p * vec2(ur.x / ur.y, 1.));
                  float angle = atan(p.y, p.x)
                    + TAU * smoothstep(.75, 0., len)
                    + cos(u_time);
                  vec2 coords = c + vec2(r * cos(angle + u_time * 0.01), r * sin(angle));
                  FragColor = texture(texture_0, coords);
                }
              }
            );
          `} /> */}
        </div>
      </div>
    </>
  )
}