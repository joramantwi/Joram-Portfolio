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
      aria-label="Joram seated in a Microsoft-colour chair, presenting Azure, Dynamics 365 and development tools above his open hand"
    >
      <div className={styles.backlight} aria-hidden="true" />

      <Image
        className={styles.portrait}
        src="/hero/joram-tech-lounge-complete-v2.png"
        alt=""
        width={1036}
        height={836}
        sizes="(min-width: 1024px) 40vw, (min-width: 640px) 65vw, 92vw"
        preload
      />

      <div className={styles.iconCluster} aria-hidden="true">
        <span className={styles.orbit} />
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
