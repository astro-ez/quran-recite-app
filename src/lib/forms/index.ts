// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm, type UseFormProps } from "react-hook-form";
// import type { z } from 'zod';

// export function useZodForm<TSchema extends z.ZodType<any, any>>(
// 	props: Omit<UseFormProps<z.input<TSchema>>, "resolver"> & {
// 		schema: TSchema;
// 	},
// ) {
// 	const form = useForm<z.input<TSchema>>({
// 		...props,
// 		resolver: zodResolver(props.schema),
// 	});

// 	return form;
// }
