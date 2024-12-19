const Ziggy = {
  url: 'http:\/\/localhost',
  port: null,
  defaults: {},
  routes: {
    'sanctum.csrf-cookie': {
      uri: 'sanctum\/csrf-cookie',
      methods: ['GET', 'HEAD'],
    },
    dashboard: { uri: 'dashboard', methods: ['GET', 'HEAD'] },
    'profile.edit': { uri: 'profile', methods: ['GET', 'HEAD'] },
    'profile.update': { uri: 'profile', methods: ['PATCH'] },
    'profile.destroy': { uri: 'profile', methods: ['DELETE'] },
    'achievements.index': { uri: 'achievements', methods: ['GET', 'HEAD'] },
    'achievements.create': {
      uri: 'achievements\/create',
      methods: ['GET', 'HEAD'],
    },
    'achievements.edit': {
      uri: 'achievements\/{achievement}',
      methods: ['GET', 'HEAD'],
      parameters: ['achievement'],
      bindings: { achievement: 'id' },
    },
    'achievements.update': {
      uri: 'achievements\/{achievement}',
      methods: ['PUT'],
      parameters: ['achievement'],
      bindings: { achievement: 'id' },
    },
    'achievements.destroy': {
      uri: 'achievements\/{achievement}',
      methods: ['DELETE'],
      parameters: ['achievement'],
      bindings: { achievement: 'id' },
    },
    'achievements.store': { uri: 'achievements', methods: ['POST'] },
    'internships.index': { uri: 'internships', methods: ['GET', 'HEAD'] },
    'internships.create': {
      uri: 'internships\/create',
      methods: ['GET', 'HEAD'],
    },
    'internships.edit': {
      uri: 'internships\/{internship}',
      methods: ['GET', 'HEAD'],
      parameters: ['internship'],
      bindings: { internship: 'id' },
    },
    'internships.update': {
      uri: 'internships\/{internship}',
      methods: ['PUT'],
      parameters: ['internship'],
      bindings: { internship: 'id' },
    },
    'internships.destroy': {
      uri: 'internships\/{internship}',
      methods: ['DELETE'],
      parameters: ['internship'],
      bindings: { internship: 'id' },
    },
    'internships.store': { uri: 'internships', methods: ['POST'] },
    'courses.index': { uri: 'courses', methods: ['GET', 'HEAD'] },
    'courses.create': { uri: 'courses\/create', methods: ['GET', 'HEAD'] },
    'courses.edit': {
      uri: 'courses\/{course}',
      methods: ['GET', 'HEAD'],
      parameters: ['course'],
      bindings: { course: 'id' },
    },
    'courses.update': {
      uri: 'courses\/{course}',
      methods: ['PUT'],
      parameters: ['course'],
      bindings: { course: 'id' },
    },
    'courses.destroy': {
      uri: 'courses\/{course}',
      methods: ['DELETE'],
      parameters: ['course'],
      bindings: { course: 'id' },
    },
    'courses.store': { uri: 'courses', methods: ['POST'] },
    'publications.index': { uri: 'publications', methods: ['GET', 'HEAD'] },
    'publications.create': {
      uri: 'publications\/create',
      methods: ['GET', 'HEAD'],
    },
    'publications.edit': {
      uri: 'publications\/{publication}',
      methods: ['GET', 'HEAD'],
      parameters: ['publication'],
      bindings: { publication: 'id' },
    },
    'publications.destroy': {
      uri: 'publications\/{publication}',
      methods: ['DELETE'],
      parameters: ['publication'],
      bindings: { publication: 'id' },
    },
    'publications.update': {
      uri: 'publications\/{publication}',
      methods: ['PUT'],
      parameters: ['publication'],
      bindings: { publication: 'id' },
    },
    'publications.store': { uri: 'publications', methods: ['POST'] },
    register: { uri: 'register', methods: ['GET', 'HEAD'] },
    login: { uri: 'login', methods: ['GET', 'HEAD'] },
    'password.request': {
      uri: 'forgot-password',
      methods: ['GET', 'HEAD'],
    },
    'password.email': { uri: 'forgot-password', methods: ['POST'] },
    'password.reset': {
      uri: 'reset-password\/{token}',
      methods: ['GET', 'HEAD'],
      parameters: ['token'],
    },
    'password.store': { uri: 'reset-password', methods: ['POST'] },
    'verification.notice': {
      uri: 'verify-email',
      methods: ['GET', 'HEAD'],
    },
    'verification.verify': {
      uri: 'verify-email\/{id}\/{hash}',
      methods: ['GET', 'HEAD'],
      parameters: ['id', 'hash'],
    },
    'verification.send': {
      uri: 'email\/verification-notification',
      methods: ['POST'],
    },
    'password.confirm': {
      uri: 'confirm-password',
      methods: ['GET', 'HEAD'],
    },
    'password.update': { uri: 'password', methods: ['PUT'] },
    logout: { uri: 'logout', methods: ['POST'] },
    'storage.local': {
      uri: 'storage\/{path}',
      methods: ['GET', 'HEAD'],
      wheres: { path: '.*' },
      parameters: ['path'],
    },
  },
};
if (typeof window !== 'undefined' && typeof window.Ziggy !== 'undefined') {
  Object.assign(Ziggy.routes, window.Ziggy.routes);
}
export { Ziggy };
