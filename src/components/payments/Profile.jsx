import React, { useEffect, useState } from "react";

const Profile = () => {
  return (
    <>
      <main className="w-full">
        <div className="lg:px-24 px-5 my-5">
          <div className="grid -2 grid-cols-1 md:grid-cols-4 w-full  gap-4">
            <div className="col-span-1">{/* <Details /> */}</div>
            <div className="border w-[100%] col-span-1 md:col-span-3">
              {/* <Payment /> */}
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Profile;
