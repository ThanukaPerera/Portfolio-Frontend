// https://cruip.com/create-an-infinite-horizontal-scroll-animation-with-tailwind-css/
import React from "react";

function SocialMediaLinks() {
  return (
    <>
      <div className="w-full  text-5xl pt-5 inline-flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-200px),transparent_100%)] ">
        <ul className="flex items-center justify-center md:justify-start sm:[&_li]:mx-8 [&_li]:mx-4 [&_img]:max-w-none animate-infinite-scroll">
          <li>
            <a
              target="_blank"
              href="https://medium.com/@thanukalap"
              className="border bg-primary  text-primary-foreground text-2xl  sm:grid hidden place-content-center  p-2   rounded-md"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="fill-primary-foreground w-6 h-6"
              >
                <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75S24 8.83 24 12z" />
              </svg>
            </a>
          </li>
          <li>
            <a
              target="_blank"
              href="http://www.linkedin.com/in/thanuka-perera-5356b6293"
              className="border bg-primary  text-primary-foreground text-2xl  grid place-content-center  p-2   rounded-md"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="fill-primary-foreground w-6 h-6"
              >
                <path d="M19.7 3H4.3A1.3 1.3 0 0 0 3 4.3v15.4A1.3 1.3 0 0 0 4.3 21h15.4a1.3 1.3 0 0 0 1.3-1.3V4.3A1.3 1.3 0 0 0 19.7 3zM8.339 18.338H5.667v-8.59h2.672v8.59zM7.004 8.574a1.548 1.548 0 1 1 0-3.096 1.548 1.548 0 0 1 0 3.096zm11.335 9.764H15.67v-4.177c0-.996-.017-2.278-1.387-2.278-1.389 0-1.601 1.086-1.601 2.206v4.25h-2.667v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.779 3.203 4.092v4.71z" />
              </svg>
            </a>
          </li>
          <li>
            <a
              target="_blank"
              href="https://github.com/ThanukaPerera"
              className="border bg-primary  text-primary-foreground text-2xl  grid place-content-center  p-2   rounded-md"
            >
              <svg
                width="202"
                height="202"
                viewBox="0 0 202 202"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className=" fill-primary-foreground w-6 h-6"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M101 0C156.782 0 202 46.3583 202 103.555C202 149.297 173.094 188.102 132.987 201.808C127.866 202.828 126.048 199.594 126.048 196.837C126.048 193.423 126.169 182.273 126.169 168.416C126.169 158.76 122.937 152.458 119.311 149.246C141.804 146.681 165.438 137.923 165.438 98.1495C165.438 86.8375 161.519 77.6066 155.035 70.3548C156.085 67.7389 159.55 57.2059 154.045 42.9447C154.045 42.9447 145.581 40.1699 126.3 53.5625C118.231 51.2698 109.585 50.1163 101 50.0759C92.415 50.1163 83.7795 51.2698 75.7197 53.5625C56.4186 40.1699 47.9346 42.9447 47.9346 42.9447C42.4503 57.2059 45.9146 67.7389 46.9549 70.3548C40.501 77.6066 36.5519 86.8375 36.5519 98.1495C36.5519 137.822 60.1354 146.714 82.5675 149.33C79.6789 151.916 77.063 156.477 76.154 163.173C70.397 165.819 55.7722 170.399 46.763 154.572C46.763 154.572 41.4201 144.623 31.2797 143.895C31.2797 143.895 21.4322 143.765 30.5929 150.188C30.5929 150.188 37.2084 153.37 41.8039 165.338C41.8039 165.338 47.7326 183.821 75.8308 177.559C75.8813 186.214 75.9722 194.372 75.9722 196.837C75.9722 199.574 74.1138 202.777 69.0739 201.818C28.9365 188.132 0 149.308 0 103.555C0 46.3583 45.2278 0 101 0Z"
                />
              </svg>
            </a>
          </li>
          <li>
            <a
              target="_blank"
              href="https://medium.com/@thanukalap"
              className="border bg-primary  text-primary-foreground text-2xl  grid place-content-center  p-2   rounded-md"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="fill-primary-foreground w-6 h-6"
              >
                <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75S24 8.83 24 12z" />
              </svg>
            </a>
          </li>
          <li>
            <a
              target="_blank"
              href="http://www.linkedin.com/in/thanuka-perera-5356b6293"
              className="border bg-primary  text-primary-foreground text-2xl  grid place-content-center  p-2   rounded-md"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="fill-primary-foreground w-6 h-6"
              >
                <path d="M19.7 3H4.3A1.3 1.3 0 0 0 3 4.3v15.4A1.3 1.3 0 0 0 4.3 21h15.4a1.3 1.3 0 0 0 1.3-1.3V4.3A1.3 1.3 0 0 0 19.7 3zM8.339 18.338H5.667v-8.59h2.672v8.59zM7.004 8.574a1.548 1.548 0 1 1 0-3.096 1.548 1.548 0 0 1 0 3.096zm11.335 9.764H15.67v-4.177c0-.996-.017-2.278-1.387-2.278-1.389 0-1.601 1.086-1.601 2.206v4.25h-2.667v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.779 3.203 4.092v4.71z" />
              </svg>
            </a>
          </li>
          <li>
            <a
              target="_blank"
              href="https://github.com/ThanukaPerera"
              className="border bg-primary  text-primary-foreground text-2xl  grid place-content-center  p-2   rounded-md"
            >
              <svg
                width="202"
                height="202"
                viewBox="0 0 202 202"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className=" fill-primary-foreground w-6 h-6"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M101 0C156.782 0 202 46.3583 202 103.555C202 149.297 173.094 188.102 132.987 201.808C127.866 202.828 126.048 199.594 126.048 196.837C126.048 193.423 126.169 182.273 126.169 168.416C126.169 158.76 122.937 152.458 119.311 149.246C141.804 146.681 165.438 137.923 165.438 98.1495C165.438 86.8375 161.519 77.6066 155.035 70.3548C156.085 67.7389 159.55 57.2059 154.045 42.9447C154.045 42.9447 145.581 40.1699 126.3 53.5625C118.231 51.2698 109.585 50.1163 101 50.0759C92.415 50.1163 83.7795 51.2698 75.7197 53.5625C56.4186 40.1699 47.9346 42.9447 47.9346 42.9447C42.4503 57.2059 45.9146 67.7389 46.9549 70.3548C40.501 77.6066 36.5519 86.8375 36.5519 98.1495C36.5519 137.822 60.1354 146.714 82.5675 149.33C79.6789 151.916 77.063 156.477 76.154 163.173C70.397 165.819 55.7722 170.399 46.763 154.572C46.763 154.572 41.4201 144.623 31.2797 143.895C31.2797 143.895 21.4322 143.765 30.5929 150.188C30.5929 150.188 37.2084 153.37 41.8039 165.338C41.8039 165.338 47.7326 183.821 75.8308 177.559C75.8813 186.214 75.9722 194.372 75.9722 196.837C75.9722 199.574 74.1138 202.777 69.0739 201.818C28.9365 188.132 0 149.308 0 103.555C0 46.3583 45.2278 0 101 0Z"
                />
              </svg>
            </a>
          </li>
          <li>
            <a
              target="_blank"
              href="https://medium.com/@thanukalap"
              className="border bg-primary  text-primary-foreground text-2xl  grid place-content-center  p-2   rounded-md"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="fill-primary-foreground w-6 h-6"
              >
                <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75S24 8.83 24 12z" />
              </svg>
            </a>
          </li>
          <li>
            <a
              target="_blank"
              href="http://www.linkedin.com/in/thanuka-perera-5356b6293"
              className="border bg-primary  text-primary-foreground text-2xl  grid place-content-center  p-2   rounded-md"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="fill-primary-foreground w-6 h-6"
              >
                <path d="M19.7 3H4.3A1.3 1.3 0 0 0 3 4.3v15.4A1.3 1.3 0 0 0 4.3 21h15.4a1.3 1.3 0 0 0 1.3-1.3V4.3A1.3 1.3 0 0 0 19.7 3zM8.339 18.338H5.667v-8.59h2.672v8.59zM7.004 8.574a1.548 1.548 0 1 1 0-3.096 1.548 1.548 0 0 1 0 3.096zm11.335 9.764H15.67v-4.177c0-.996-.017-2.278-1.387-2.278-1.389 0-1.601 1.086-1.601 2.206v4.25h-2.667v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.779 3.203 4.092v4.71z" />
              </svg>
            </a>
          </li>
          <li>
            <a
              target="_blank"
              href="https://github.com/ThanukaPerera"
              className="border bg-primary  text-primary-foreground text-2xl  grid place-content-center  p-2   rounded-md"
            >
              <svg
                width="202"
                height="202"
                viewBox="0 0 202 202"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className=" fill-primary-foreground w-6 h-6"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M101 0C156.782 0 202 46.3583 202 103.555C202 149.297 173.094 188.102 132.987 201.808C127.866 202.828 126.048 199.594 126.048 196.837C126.048 193.423 126.169 182.273 126.169 168.416C126.169 158.76 122.937 152.458 119.311 149.246C141.804 146.681 165.438 137.923 165.438 98.1495C165.438 86.8375 161.519 77.6066 155.035 70.3548C156.085 67.7389 159.55 57.2059 154.045 42.9447C154.045 42.9447 145.581 40.1699 126.3 53.5625C118.231 51.2698 109.585 50.1163 101 50.0759C92.415 50.1163 83.7795 51.2698 75.7197 53.5625C56.4186 40.1699 47.9346 42.9447 47.9346 42.9447C42.4503 57.2059 45.9146 67.7389 46.9549 70.3548C40.501 77.6066 36.5519 86.8375 36.5519 98.1495C36.5519 137.822 60.1354 146.714 82.5675 149.33C79.6789 151.916 77.063 156.477 76.154 163.173C70.397 165.819 55.7722 170.399 46.763 154.572C46.763 154.572 41.4201 144.623 31.2797 143.895C31.2797 143.895 21.4322 143.765 30.5929 150.188C30.5929 150.188 37.2084 153.37 41.8039 165.338C41.8039 165.338 47.7326 183.821 75.8308 177.559C75.8813 186.214 75.9722 194.372 75.9722 196.837C75.9722 199.574 74.1138 202.777 69.0739 201.818C28.9365 188.132 0 149.308 0 103.555C0 46.3583 45.2278 0 101 0Z"
                />
              </svg>
            </a>
          </li>
        </ul>
        <ul
          className="flex items-center justify-center md:justify-start sm:[&_li]:mx-8 [&_li]:mx-4 [&_img]:max-w-none animate-infinite-scroll"
          aria-hidden="true"
        >
          <li>
            <a
              target="_blank"
              href="https://medium.com/@thanukalap"
              className="border bg-primary  text-primary-foreground text-2xl  grid place-content-center  p-2   rounded-md"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="fill-primary-foreground w-6 h-6"
              >
                <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75S24 8.83 24 12z" />
              </svg>
            </a>
          </li>
          <li>
            <a
              target="_blank"
              href="http://www.linkedin.com/in/thanuka-perera-5356b6293"
              className="border bg-primary  text-primary-foreground text-2xl  grid place-content-center  p-2   rounded-md"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="fill-primary-foreground w-6 h-6"
              >
                <path d="M19.7 3H4.3A1.3 1.3 0 0 0 3 4.3v15.4A1.3 1.3 0 0 0 4.3 21h15.4a1.3 1.3 0 0 0 1.3-1.3V4.3A1.3 1.3 0 0 0 19.7 3zM8.339 18.338H5.667v-8.59h2.672v8.59zM7.004 8.574a1.548 1.548 0 1 1 0-3.096 1.548 1.548 0 0 1 0 3.096zm11.335 9.764H15.67v-4.177c0-.996-.017-2.278-1.387-2.278-1.389 0-1.601 1.086-1.601 2.206v4.25h-2.667v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.779 3.203 4.092v4.71z" />
              </svg>
            </a>
          </li>
          <li>
            <a
              target="_blank"
              href="https://github.com/ThanukaPerera"
              className="border bg-primary  text-primary-foreground text-2xl  grid place-content-center  p-2   rounded-md"
            >
              <svg
                width="202"
                height="202"
                viewBox="0 0 202 202"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className=" fill-primary-foreground w-6 h-6"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M101 0C156.782 0 202 46.3583 202 103.555C202 149.297 173.094 188.102 132.987 201.808C127.866 202.828 126.048 199.594 126.048 196.837C126.048 193.423 126.169 182.273 126.169 168.416C126.169 158.76 122.937 152.458 119.311 149.246C141.804 146.681 165.438 137.923 165.438 98.1495C165.438 86.8375 161.519 77.6066 155.035 70.3548C156.085 67.7389 159.55 57.2059 154.045 42.9447C154.045 42.9447 145.581 40.1699 126.3 53.5625C118.231 51.2698 109.585 50.1163 101 50.0759C92.415 50.1163 83.7795 51.2698 75.7197 53.5625C56.4186 40.1699 47.9346 42.9447 47.9346 42.9447C42.4503 57.2059 45.9146 67.7389 46.9549 70.3548C40.501 77.6066 36.5519 86.8375 36.5519 98.1495C36.5519 137.822 60.1354 146.714 82.5675 149.33C79.6789 151.916 77.063 156.477 76.154 163.173C70.397 165.819 55.7722 170.399 46.763 154.572C46.763 154.572 41.4201 144.623 31.2797 143.895C31.2797 143.895 21.4322 143.765 30.5929 150.188C30.5929 150.188 37.2084 153.37 41.8039 165.338C41.8039 165.338 47.7326 183.821 75.8308 177.559C75.8813 186.214 75.9722 194.372 75.9722 196.837C75.9722 199.574 74.1138 202.777 69.0739 201.818C28.9365 188.132 0 149.308 0 103.555C0 46.3583 45.2278 0 101 0Z"
                />
              </svg>
            </a>
          </li>
          <li>
            <a
              target="_blank"
              href="https://medium.com/@thanukalap"
              className="border bg-primary  text-primary-foreground text-2xl  grid place-content-center  p-2   rounded-md"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="fill-primary-foreground w-6 h-6"
              >
                <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75S24 8.83 24 12z" />
              </svg>
            </a>
          </li>
          <li>
            <a
              target="_blank"
              href="http://www.linkedin.com/in/thanuka-perera-5356b6293"
              className="border bg-primary  text-primary-foreground text-2xl  grid place-content-center  p-2   rounded-md"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="fill-primary-foreground w-6 h-6"
              >
                <path d="M19.7 3H4.3A1.3 1.3 0 0 0 3 4.3v15.4A1.3 1.3 0 0 0 4.3 21h15.4a1.3 1.3 0 0 0 1.3-1.3V4.3A1.3 1.3 0 0 0 19.7 3zM8.339 18.338H5.667v-8.59h2.672v8.59zM7.004 8.574a1.548 1.548 0 1 1 0-3.096 1.548 1.548 0 0 1 0 3.096zm11.335 9.764H15.67v-4.177c0-.996-.017-2.278-1.387-2.278-1.389 0-1.601 1.086-1.601 2.206v4.25h-2.667v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.779 3.203 4.092v4.71z" />
              </svg>
            </a>
          </li>
          <li>
            <a
              target="_blank"
              href="https://github.com/ThanukaPerera"
              className="border bg-primary  text-primary-foreground text-2xl  grid place-content-center  p-2   rounded-md"
            >
              <svg
                width="202"
                height="202"
                viewBox="0 0 202 202"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className=" fill-primary-foreground w-6 h-6"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M101 0C156.782 0 202 46.3583 202 103.555C202 149.297 173.094 188.102 132.987 201.808C127.866 202.828 126.048 199.594 126.048 196.837C126.048 193.423 126.169 182.273 126.169 168.416C126.169 158.76 122.937 152.458 119.311 149.246C141.804 146.681 165.438 137.923 165.438 98.1495C165.438 86.8375 161.519 77.6066 155.035 70.3548C156.085 67.7389 159.55 57.2059 154.045 42.9447C154.045 42.9447 145.581 40.1699 126.3 53.5625C118.231 51.2698 109.585 50.1163 101 50.0759C92.415 50.1163 83.7795 51.2698 75.7197 53.5625C56.4186 40.1699 47.9346 42.9447 47.9346 42.9447C42.4503 57.2059 45.9146 67.7389 46.9549 70.3548C40.501 77.6066 36.5519 86.8375 36.5519 98.1495C36.5519 137.822 60.1354 146.714 82.5675 149.33C79.6789 151.916 77.063 156.477 76.154 163.173C70.397 165.819 55.7722 170.399 46.763 154.572C46.763 154.572 41.4201 144.623 31.2797 143.895C31.2797 143.895 21.4322 143.765 30.5929 150.188C30.5929 150.188 37.2084 153.37 41.8039 165.338C41.8039 165.338 47.7326 183.821 75.8308 177.559C75.8813 186.214 75.9722 194.372 75.9722 196.837C75.9722 199.574 74.1138 202.777 69.0739 201.818C28.9365 188.132 0 149.308 0 103.555C0 46.3583 45.2278 0 101 0Z"
                />
              </svg>
            </a>
          </li>
          <li>
            <a
              target="_blank"
              href="https://medium.com/@thanukalap"
              className="border bg-primary  text-primary-foreground text-2xl  grid place-content-center  p-2   rounded-md"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="fill-primary-foreground w-6 h-6"
              >
                <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75S24 8.83 24 12z" />
              </svg>
            </a>
          </li>
          <li>
            <a
              target="_blank"
              href="http://www.linkedin.com/in/thanuka-perera-5356b6293"
              className="border bg-primary  text-primary-foreground text-2xl  grid place-content-center  p-2   rounded-md"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="fill-primary-foreground w-6 h-6"
              >
                <path d="M19.7 3H4.3A1.3 1.3 0 0 0 3 4.3v15.4A1.3 1.3 0 0 0 4.3 21h15.4a1.3 1.3 0 0 0 1.3-1.3V4.3A1.3 1.3 0 0 0 19.7 3zM8.339 18.338H5.667v-8.59h2.672v8.59zM7.004 8.574a1.548 1.548 0 1 1 0-3.096 1.548 1.548 0 0 1 0 3.096zm11.335 9.764H15.67v-4.177c0-.996-.017-2.278-1.387-2.278-1.389 0-1.601 1.086-1.601 2.206v4.25h-2.667v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.779 3.203 4.092v4.71z" />
              </svg>
            </a>
          </li>
          <li>
            <a
              target="_blank"
              href="https://github.com/ThanukaPerera"
              className="border bg-primary  text-primary-foreground text-2xl  grid place-content-center  p-2   rounded-md"
            >
              <svg
                width="202"
                height="202"
                viewBox="0 0 202 202"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className=" fill-primary-foreground w-6 h-6"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M101 0C156.782 0 202 46.3583 202 103.555C202 149.297 173.094 188.102 132.987 201.808C127.866 202.828 126.048 199.594 126.048 196.837C126.048 193.423 126.169 182.273 126.169 168.416C126.169 158.76 122.937 152.458 119.311 149.246C141.804 146.681 165.438 137.923 165.438 98.1495C165.438 86.8375 161.519 77.6066 155.035 70.3548C156.085 67.7389 159.55 57.2059 154.045 42.9447C154.045 42.9447 145.581 40.1699 126.3 53.5625C118.231 51.2698 109.585 50.1163 101 50.0759C92.415 50.1163 83.7795 51.2698 75.7197 53.5625C56.4186 40.1699 47.9346 42.9447 47.9346 42.9447C42.4503 57.2059 45.9146 67.7389 46.9549 70.3548C40.501 77.6066 36.5519 86.8375 36.5519 98.1495C36.5519 137.822 60.1354 146.714 82.5675 149.33C79.6789 151.916 77.063 156.477 76.154 163.173C70.397 165.819 55.7722 170.399 46.763 154.572C46.763 154.572 41.4201 144.623 31.2797 143.895C31.2797 143.895 21.4322 143.765 30.5929 150.188C30.5929 150.188 37.2084 153.37 41.8039 165.338C41.8039 165.338 47.7326 183.821 75.8308 177.559C75.8813 186.214 75.9722 194.372 75.9722 196.837C75.9722 199.574 74.1138 202.777 69.0739 201.818C28.9365 188.132 0 149.308 0 103.555C0 46.3583 45.2278 0 101 0Z"
                />
              </svg>
            </a>
          </li>
        </ul>
      </div>
    </>
  );
}

export default SocialMediaLinks;
