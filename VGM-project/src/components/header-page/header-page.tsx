import { Button, Row } from "antd";
import React from "react";
import { IoIosMenu } from "react-icons/io";
import { LiaDownloadSolid } from "react-icons/lia";
import { LuUploadCloud } from "react-icons/lu";
import { VscAdd } from "react-icons/vsc";

type button = {
  label: string;
  size?: string;
  icon?: React.ReactNode;
  action?: any;
  type?: string;
  className?: string;
  [key:string]: any;
};

type Props = {
  title: string;
  buttons?: button[];
};

export function HeaderPage({ title, buttons }: Props) {
  return (
    <>
      <Row className="flex flex-wrap justify-between items-center px-0 py-5">
        <div className="flex justify-center items-center">
          <span className="text-2xl font-semibold leading-[21px]">{title}</span>
        </div>
        <div className="flex mb-2">
          {buttons &&
            buttons.map(({className,size,icon,action,type,label,...rest}:button) => (
              <Button
                className={className}
                size={size || "middle"}
                icon={icon}
                onClick={action}
                type={type}
                 {...rest}
              >
                {label}
              </Button>
            ))}
        </div>
      </Row>
    </>
  );
}
