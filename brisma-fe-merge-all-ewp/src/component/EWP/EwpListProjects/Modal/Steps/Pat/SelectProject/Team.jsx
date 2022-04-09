import MemberTim from "../../../../CardProjectEwp/MemberTim";

export default function Team({ ma, kta, ata }) {
  return (
    <div>
      <div className="mt-2 space-y-1">
        {kta && <MemberTim name={kta} position="kta" />}
        {ma && <MemberTim name={ma} position="ma" />}
      </div>
      {/* <div className="mt-4 space-y-1">
        {ata.length === 0
          ? ""
          : ata.map((item) => <MemberTim name={item} position="ata" />)}
      </div> */}
    </div>
  );
}
