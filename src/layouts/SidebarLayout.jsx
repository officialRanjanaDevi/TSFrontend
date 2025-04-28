import AccountDetails from "@/components/account/AccountDetails";

const SidebarLayout = ({ children }) => {
  return (
    <>
      <div className="lg:px-20 px-2 my-5">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="cols-span-1">
            <AccountDetails />
          </div>
          <section className="col-span-1 md:col-span-3">{children}</section>
        </div>
      </div>
    </>
  );
};

export default SidebarLayout;
