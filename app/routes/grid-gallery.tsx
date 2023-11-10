import { useState } from "react";
import Doodle, { DoodleUse } from "~/components/Doodle";

const style = `
  css-doodle {
    --exp7: (
      @grid: 1x120 / 100% 150%;
      @size: $(@floor.rn(70, 90, .8))% 1px;
      justify-self: center;

      --p: @floor.rn(0, 360, 2);
      background: hsl($(p)deg, 30%, 70%);

      transform: rotate(-15deg) translateX($(@sin(@i / 4) * 3.14159 * 10)px);
      margin-top: -10%;
    );
  }
`;

const style2 = `
  css-doodle {
    --robot: (
      @grid: 1 / 100% / #0a0c27;
      background-size: 200px 200px;
      background-image: @doodle(
        @grid: 6 / 100%;
        @size: 4px;
        font-size: 4px;
        color: hsl(@r240, 30%, 50%);
        box-shadow: @m3x5(
          calc(4em - @nx*1em) @ny(*1em) @p(@m3(currentColor), @m2(#0000)),
          calc(2em + @nx*1em) @ny(*1em) @lp
        );
      );
    );
  }
`
const pendings = [
`
  @grid: 1x120 / 100% 150%;
  @size: $(@floor.rn(70, 90, .8))% 1px;
  justify-self: center;

  --p: @floor.rn(0, 360, 2);
  background: hsl($(p)deg, 30%, 70%);

  transform: rotate(-15deg) translateX($(@sin(@i / 4) * 3.14159 * 10)px);
  margin-top: -10%;
`,
`
  @grid: 1 / 100% / #0a0c27;
  background-size: 200px 200px;
  background-image: @doodle(
    @grid: 6 / 100%;
    @size: 4px;
    font-size: 4px;
    color: hsl(@r240, 30%, 50%);
    box-shadow: @m3x5(
      calc(4em - @nx*1em) @ny(*1em) @p(@m3(currentColor), @m2(#0000)),
      calc(2em + @nx*1em) @ny(*1em) @lp
    );
  );
`,
`
  @grid: 1x2 / 100% / #e8c7b6;
  rotate: @pn(180deg, none);
  background-size: 100% 100%;
  background-image: @doodle400x100(
    @grid: 39x1 / 150% 100%;
    @size: auto 100% 1;
    border-radius: 50%;
    translate: -70%;
    box-shadow: inset $(@i(%13) * 1.2)px 0 0 #0800fd;
  );
`,
`
  :container {
    grid-gap: 2px;
  }

  @grid: 5 / 100%  / #1b2242;
  background: hsl(@r360, 30%, 70%);
  clip-path: @shape(
    points: 30;
    m: 2;
    n1: 0.5;
    n2: 0.5;
    n3: 0.5;
    p1: pow(abs.cos(t*m/4), n2);
    p2: pow(abs.sin(t*m/4), n3);
    r: pow(1/(p1 + p2), (1/n1));
  );
`
];

export default function GridGallery() {
  const [rules, setRules] = useState<string[]>([]);
  const appendDoodle = (i) => {
    setRules([...rules, pendings[i]]);
  };

  return (
    <div className="min-h-[100svh] flex items-center justify-center">
      <div
        className={`
          w-full max-w-5xl h-[95svh]
          border rounded shadow-md bg-zinc-50 p-6 overflow-y-auto
          grid gap-4
        `}
        style={{
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
          gridAutoRows: 'auto'
        }}
      >
        {[...new Array(100)].map((_, i) => (
          <div
            key={i}
            className={`
              relative aspect-square border-2 border-black rounded p-4
              ${i === 0 ? 'col-span-2 row-span-2' : ''}
            `}
            style={{
              borderColor: `hsl(${i * 2 + 80}deg, 30%, 50%)`
            }}
            onClick={() => appendDoodle(i)}
          >
            <div className="absolute inset-0 overflow-hidden">
              {rules[i] && (
                <Doodle rule={rules[i]} />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}