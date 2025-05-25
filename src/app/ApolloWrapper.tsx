"use client";

import { HttpLink } from "@apollo/client";
import {
	ApolloNextAppProvider,
	ApolloClient,
	InMemoryCache,
} from "@apollo/client-integration-nextjs";
import { getGraphQLEndpoint } from "../config/graphql";

function makeClient() {
	const httpLink = new HttpLink({
		uri: getGraphQLEndpoint(),
	});

	return new ApolloClient({
		cache: new InMemoryCache(),
		link: httpLink,
	});
}

export function ApolloWrapper({ children }: React.PropsWithChildren) {
	return (
		<ApolloNextAppProvider makeClient={makeClient}>
			{children}
		</ApolloNextAppProvider>
	);
}
