import Header from "@/components/shared/Header";
import React from "react";
import { transformationTypes } from "@/constants";
import TransformationForm from "@/components/shared/TransformationForm";
import { auth } from "@clerk/nextjs";
import { getUserById } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";

const AddTranformationTypePage = async ({
	params: { type },
}: SearchParamProps) => {
	const { userId } = auth();
	const transforamtion = transformationTypes[type];

	if (!userId) redirect("/sign-in");

	const user = await getUserById(userId);

	return (
		<>
			<Header title={transforamtion.title} subtitle={transforamtion.subTitle} />

			<section className="mt-10">
				<TransformationForm
					action="Add"
					userId={user._id}
					type={transforamtion.type as TransformationTypeKey}
					creditBalance={user.creditBalance}
				/>
			</section>
		</>
	);
};

export default AddTranformationTypePage;
