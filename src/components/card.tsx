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
    <div className="bg-white rounded-3xl shadow-lg p-8 md:p-12">
      {(icon || title) && (
        <div className="card-title-container flex justify-center gap-4">
          <>
            {icon &&
              (() => {
                const LucideIcon = lucideIcons[
                  icon
                ] as React.ComponentType<any>;
                return LucideIcon ? (
                  <div className="">
                    <LucideIcon size={40} />
                  </div>
                ) : null;
              })()}
            {title && (
              <h2 className="card-title text-2xl font-bold">{title}</h2>
            )}
          </>
        </div>
      )}
      <div className="card-content flex flex-col gap-4 mt-8">{children}</div>
    </div>
  );
}
