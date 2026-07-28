import Image from "next/image";
import styles from "./TechLounge.module.css";

const techIcons = [
  {
    name: "Microsoft Azure",
    src: "/hero/azure.png",
    width: 101,
    height: 68,
    className: styles.azure,
    floatClassName: styles.floatAzure,
  },
  {
    name: "Dynamics 365",
    src: "/hero/dynamics-365.png",
    width: 58,
    height: 85,
    className: styles.dynamics,
    floatClassName: styles.floatDynamics,
  },
  {
    name: "Development",
    src: "/hero/code.png",
    width: 78,
    height: 54,
    className: styles.code,
    floatClassName: styles.floatCode,
  },
] as const;

export default function TechLounge() {
  return (
    <div
      className={styles.stage}
      role="img"
      aria-label="Joram seated in a modular Microsoft-colour tech lounge, pointing towards Azure, Dynamics 365 and development icons"
    >
      <div className={styles.backlight} aria-hidden="true" />

      <Image
        className={styles.portrait}
        src="/hero/joram-tech-lounge.png"
        alt=""
        width={777}
        height={828}
        sizes="(min-width: 1024px) 36vw, (min-width: 640px) 58vw, 92vw"
        preload
      />

      <div className={styles.iconCluster} aria-hidden="true">
        {techIcons.map((icon) => (
          <span
            key={icon.name}
            className={`${styles.iconReveal} ${icon.className}`}
          >
            <Image
              className={icon.floatClassName}
              src={icon.src}
              alt=""
              width={icon.width}
              height={icon.height}
              loading="eager"
            />
          </span>
        ))}
      </div>
    </div>
  );
}
