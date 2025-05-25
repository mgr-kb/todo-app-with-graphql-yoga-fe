import { HttpLink } from "@apollo/client";
import {
	registerApolloClient,
	InMemoryCache,
	ApolloClient,
} from "@apollo/client-integration-nextjs";
import { getGraphQLEndpoint } from "../config/graphql";

export const { getClient, query, PreloadQuery } = registerApolloClient(() => {
	const client = new ApolloClient({
		link: new HttpLink({
			uri: getGraphQLEndpoint(),
		}),
		cache: new InMemoryCache(),
	});
	return client;
});
