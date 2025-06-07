import { ReactNode } from "react";
import "./../styles/card.css";
import * as lucideIcons from "lucide-react";

const { icons } = lucideIcons;

export default function Card({
  icon,
  title,
  children,
}: {
  icon?: keyof typeof icons;
  title?: string;
  children: ReactNode;
}) {
  return (
    <div className="card-container">
      {(icon || title) && (
        <div className="card-title-container">
          <>
            {icon &&
              (() => {
                const LucideIcon = lucideIcons[
                  icon
                ] as React.ComponentType<any>;
                return LucideIcon ? (
                  <div className="card-icon">
                    <LucideIcon />
                  </div>
                ) : null;
              })()}
            {title && <h2 className="card-title">{title}</h2>}
          </>
        </div>
      )}
      <div className="card-content">{children}</div>
    </div>
  );
}
