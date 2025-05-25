import { HttpLink } from "@apollo/client";
import {
	registerApolloClient,
	InMemoryCache,
	ApolloClient,
} from "@apollo/client-integration-nextjs";

export const { getClient, query, PreloadQuery } = registerApolloClient(() => {
	const client = new ApolloClient({
		link: new HttpLink({
			uri: "http://localhost:4000/graphql",
		}),
		cache: new InMemoryCache(),
	});
	return client;
});
