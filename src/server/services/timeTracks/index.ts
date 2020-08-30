import { Service, Request, methodNotAllowed } from '../../common';
import { db } from '../../../db';

const timeTracksService: Service = {
	baseUrl: '/time-tracks',
	api: {
		'/': {
			'GET'(): ReturnType<Request> {
				return db.getAllTimeTracksByUser()
					.then(
						timeTracks => (
							new Promise(resolve => {
								setTimeout(() => {
									resolve({
										status: 200,
										data: timeTracks,
									});
								}, 500);
							})
						),
					);
			},
			'POST': methodNotAllowed,
			'PATCH': methodNotAllowed,
			'PUT': methodNotAllowed,
			'DELETE': methodNotAllowed,
		},
	},
};

export default timeTracksService;
