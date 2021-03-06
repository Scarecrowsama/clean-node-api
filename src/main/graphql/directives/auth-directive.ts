import { SchemaDirectiveVisitor } from 'graphql-tools'
import { defaultFieldResolver, GraphQLField } from 'graphql'
import { makeAuthMiddleware } from '@/main/factories/middlewares/auth-middleware-factory'
import { ForbiddenError } from 'apollo-server-express'

export class AuthDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition (field: GraphQLField<any, any>): any {
    const { resolve = defaultFieldResolver } = field
    field.resolve = async (parent, args, context, info) => {
      const request = {
        accessToken: context?.req?.headers?.['x-access-token']
      }

      const httpResponse = await makeAuthMiddleware().handle(request)

      if (httpResponse.statusCode === 200) {
        Object.assign(context?.req, httpResponse.body)
        return resolve.call(this, parent, args, context, info)
      } else {
        throw new ForbiddenError(httpResponse.body.message)
      }
    }
  }
}
