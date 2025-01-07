import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

function index() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div>
      <div role="alert" className="alert alert-warning">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          className="w-6 h-6 stroke-current shrink-0"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          ></path>
        </svg>
        <span className="flex flex-col items-start w-full max-md:text-sm">
          {t(`guides.requireTailwind`)}
          <a
            className="inline-block w-max link link-error max-md:text-sm"
            href="https://tailwindcss.com/docs/installation/using-postcss"
            target="_blank"
          >
            {t(`guides.linkTailwindCss`)}
          </a>
        </span>
      </div>
      <div className="divider"></div>

      <div className="flex flex-col gap-4">
        <div className="text-base max-md:text-sm">
          {t(`guides.installOption1`)}
        </div>

        <div className="mockup-code">
          <pre data-prefix="#" className="text-success">
            <code>npm i gridsify</code>
          </pre>
          <pre data-prefix="#" className="">
            <code>or</code>
          </pre>
          <pre data-prefix="#" className="text-success">
            <code>pnpm add gridsify</code>
          </pre>
          <pre data-prefix="#" className="">
            <code>or</code>
          </pre>
          <pre data-prefix="#" className="text-success">
            <code>yarn add gridsify</code>
          </pre>
        </div>

        <div className="mockup-code">
          <pre data-prefix="#" className="">
            <code>// tailwind.config.js</code>
          </pre>
          <pre data-prefix="#" className="text-success">
            <code></code>
          </pre>
          <pre data-prefix="#" className="text-success">
            <code>{`module.exports = {`}</code>
          </pre>
          <pre data-prefix="#" className="text-success">
            <code>{`  content: [`}</code>
          </pre>
          <pre data-prefix="#" className="text-success">
            <code>{`    ... ,`}</code>
          </pre>
          <pre data-prefix="+" className="text-black bg-success">
            <code>{`    "./node_modules/gridsify/**/*.{js,jsx}" // add this line !`}</code>
          </pre>
          <pre data-prefix="#" className="text-success">
            <code>{`  ],`}</code>
          </pre>
          <pre data-prefix="#" className="text-success">
            <code>{`  theme: {`}</code>
          </pre>
          <pre data-prefix="#" className="text-success">
            <code>{`    extend: {},`}</code>
          </pre>
          <pre data-prefix="#" className="text-success">
            <code>{`  },`}</code>
          </pre>
          <pre data-prefix="#" className="text-success">
            <code>{`  plugins: [],`}</code>
          </pre>
          <pre data-prefix="#" className="text-success">
            <code>{`}`}</code>
          </pre>
        </div>
      </div>
      <div className="divider"></div>

      <div className="flex flex-col gap-4">
        <div className="text-base max-md:text-sm">
          {t(`guides.installOption2`)}
        </div>
        <a
          className="text-lg w-max link link-info max-md:text-sm"
          onClick={() => navigate("/docs/component")}
        >
          {t(`guides.linkComponentPage`)}
        </a>
      </div>
      <div className="divider"></div>

      {/* <div role="alert" className="alert alert-success">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          className="w-6 h-6 stroke-current shrink-0"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          ></path>
        </svg>
        <span className="max-md:text-sm">
          {t(`guides.recommandDaisyUI`)}
          <a
            className="block w-full link link-error max-md:text-sm"
            href="https://daisyui.com/docs/install/"
            target="_blank"
          >
            {t(`guides.linkDaisyUI`)}
          </a>
          <a
            className="block w-full link link-error max-md:text-sm"
            onClick={() => navigate("/docs/style")}
          >
            {t(`guides.linkStyle`)}
          </a>
        </span>
      </div> */}
    </div>
  );
}

export default index;
