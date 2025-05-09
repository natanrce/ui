import { navigation } from "@/lib/navigation";
import Link from "next/link";

export function Sidebar() {
  return (
    <aside className="border-dashed fixed w-[284px] top-14 z-30 hidden h-[calc(100vh-3.5rem)] shrink-0 border-r md:sticky md:block">
      <div className="no-scrollbar h-full overflow-auto py-6 pr-4 lg:py-8">
        <ul>
          {navigation.map((category, index) => (
            <li className="relative mt-6" key={`category-${index}`}>
              <h4 className="mb-[4px] flex w-full justify-between px-2 text-left text-sm text-white font-medium">
                {category.name}
              </h4>
              {category.children.map((item, index) => (
                <span className="my-1.5" key={index}>
                  <Link
                    href={item.href}
                    className="relative flex w-full cursor-pointer items-center justify-between rounded-md py-1 pl-2 text-left text-sm text-[#888] hover:text-[#fafafa] data-[active=true]:text-blue-500"
                  >
                    {item.name}
                  </Link>
                </span>
              ))}
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
