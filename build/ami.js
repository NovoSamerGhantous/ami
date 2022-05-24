/* -*- Mode: Java; tab-width: 2; indent-tabs-mode: nil; c-basic-offset: 2 -*- */
			/* vim: set shiftwidth=2 tabstop=2 autoindent cindent expandtab: */
			/* Copyright 2012 Mozilla Foundation
			 *
			 * Licensed under the Apache License, Version 2.0 (the "License");
			 * you may not use this file except in compliance with the License.
			 * You may obtain a copy of the License at
			 *
			 *     http://www.apache.org/licenses/LICENSE-2.0
			 *
			 * Unless required by applicable law or agreed to in writing, software
			 * distributed under the License is distributed on an "AS IS" BASIS,
			 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
			 * See the License for the specific language governing permissions and
			 * limitations under the License.
			 */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('three'), require('events'), require('dicom-parser'), require('jpeg-lossless-decoder-js'), require('OpenJPEG.js'), require('nifti-reader-js'), require('pako'), require('nrrd-js')) :
	typeof define === 'function' && define.amd ? define(['exports', 'three', 'events', 'dicom-parser', 'jpeg-lossless-decoder-js', 'OpenJPEG.js', 'nifti-reader-js', 'pako', 'nrrd-js'], factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.AMI = {}, global.three, global.EventEmitter, global.DicomParser, global.Jpeg, global.OpenJPEG, global.NiftiReader, global.pako, global.NrrdReader));
})(this, (function (exports, three, EventEmitter, DicomParser, Jpeg, OpenJPEG, NiftiReader, pako, NrrdReader) { 'use strict';

	function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

	function _interopNamespace(e) {
		if (e && e.__esModule) return e;
		var n = Object.create(null);
		if (e) {
			Object.keys(e).forEach(function (k) {
				if (k !== 'default') {
					var d = Object.getOwnPropertyDescriptor(e, k);
					Object.defineProperty(n, k, d.get ? d : {
						enumerable: true,
						get: function () { return e[k]; }
					});
				}
			});
		}
		n["default"] = e;
		return Object.freeze(n);
	}

	var EventEmitter__default = /*#__PURE__*/_interopDefaultLegacy(EventEmitter);
	var DicomParser__namespace = /*#__PURE__*/_interopNamespace(DicomParser);
	var Jpeg__namespace = /*#__PURE__*/_interopNamespace(Jpeg);
	var OpenJPEG__namespace = /*#__PURE__*/_interopNamespace(OpenJPEG);
	var NiftiReader__namespace = /*#__PURE__*/_interopNamespace(NiftiReader);
	var pako__namespace = /*#__PURE__*/_interopNamespace(pako);
	var NrrdReader__namespace = /*#__PURE__*/_interopNamespace(NrrdReader);

	/**
	 * Validate basic structures.
	 *
	 * @example
	 * //Returns true
	 * VJS.Core.Validators.matrix4(new THREE.Matrix4());
	 *
	 * //Returns false
	 * VJS.Core.Validators.matrix4(new THREE.Vector3());
	 *
	 * @module core/validators
	 */
	class Validators {
		/**
		 * Validates a matrix as a THREEJS.Matrix4
		 * link
		 * @param {Object} objectToTest - The object to be tested.
		 * @return {boolean} True if valid Matrix4, false if NOT.
		 */
		static matrix4(objectToTest) {
			if (!(objectToTest !== null && typeof objectToTest !== 'undefined' && objectToTest.hasOwnProperty('elements') && objectToTest.elements.length === 16 && typeof objectToTest.identity === 'function' && typeof objectToTest.copy === 'function' && typeof objectToTest.determinant === 'function')) {
				return false;
			}

			return true;
		}
		/**
		 * Validates a vector as a THREEJS.Vector3
		 * @param {Object} objectToTest - The object to be tested.
		 * @return {boolean} True if valid Vector3, false if NOT.
		 */


		static vector3(objectToTest) {
			if (!(objectToTest !== null && typeof objectToTest !== 'undefined' && objectToTest.hasOwnProperty('x') && objectToTest.hasOwnProperty('y') && objectToTest.hasOwnProperty('z') && !objectToTest.hasOwnProperty('w'))) {
				return false;
			}

			return true;
		}
		/**
		 * Validates a box.
		 *
		 * @example
		 * // a box is defined as
		 * let box = {
		 *	 center: THREE.Vector3,
		 *	 halfDimensions: THREE.Vector3
		 * }
		 *
		 * @param {Object} objectToTest - The object to be tested.
		 * @return {boolean} True if valid box, false if NOT.
		 */


		static box(objectToTest) {
			if (!(objectToTest !== null && typeof objectToTest !== 'undefined' && objectToTest.hasOwnProperty('center') && this.vector3(objectToTest.center) && objectToTest.hasOwnProperty('halfDimensions') && this.vector3(objectToTest.halfDimensions) && objectToTest.halfDimensions.x >= 0 && objectToTest.halfDimensions.y >= 0 && objectToTest.halfDimensions.z >= 0)) {
				return false;
			}

			return true;
		}
		/**
		 * Validates a ray.
		 *
		 * @example
		 * // a ray is defined as
		 * let ray = {
		 *	 postion: THREE.Vector3,
		 *	 direction: THREE.Vector3
		 * }
		 *
		 * @param {Object} objectToTest - The object to be tested.
		 * @return {boolean} True if valid ray, false if NOT.
		 */


		static ray(objectToTest) {
			if (!(objectToTest !== null && typeof objectToTest !== 'undefined' && objectToTest.hasOwnProperty('position') && this.vector3(objectToTest.position) && objectToTest.hasOwnProperty('direction') && this.vector3(objectToTest.direction))) {
				return false;
			}

			return true;
		}

	}

	/**
	 * General purpose functions.
	 *
	 * @module core/utils
	 */

	class CoreUtils {
		/**
		 * Generate a bouding box object.
		 * @param {Vector3} center - Center of the box.
		 * @param {Vector3} halfDimensions - Half Dimensions of the box.
		 * @return {Object} The bounding box object. {Object.min} is a {Vector3}
		 * containing the min bounds. {Object.max} is a {Vector3} containing the
		 * max bounds.
		 * @return {boolean} False input NOT valid.
		 * @example
		 * // Returns
		 * //{ min: { x : 0, y : 0,	z : 0 },
		 * //	max: { x : 2, y : 4,	z : 6 }
		 * //}
		 * VJS.Core.Utils.bbox(
		 *	 new Vector3(1, 2, 3), new Vector3(1, 2, 3));
		 *
		 * //Returns false
		 * VJS.Core.Utils.bbox(new Vector3(), new Matrix4());
		 *
		 */
		static bbox(center, halfDimensions) {
			// make sure we have valid inputs
			if (!(Validators.vector3(center) && Validators.vector3(halfDimensions))) {
				console.log('Invalid center or plane halfDimensions.');
				return false;
			} // make sure half dimensions are >= 0


			if (!(halfDimensions.x >= 0 && halfDimensions.y >= 0 && halfDimensions.z >= 0)) {
				console.log('halfDimensions must be >= 0.');
				console.log(halfDimensions);
				return false;
			} // min/max bound


			let min = center.clone().sub(halfDimensions);
			let max = center.clone().add(halfDimensions);
			return {
				min,
				max
			};
		}
		/**
		 * Find min/max values in an array
		 * @param {Array} data
		 * @return {Array}
		 */


		static minMax(data = []) {
			let minMax = [65535, -32768];
			let numPixels = data.length;

			for (let index = 0; index < numPixels; index++) {
				let spv = data[index];
				minMax[0] = Math.min(minMax[0], spv);
				minMax[1] = Math.max(minMax[1], spv);
			}

			return minMax;
		}
		/**
		 * Check HTMLElement
		 * @param {HTMLElement} obj
		 * @return {boolean}
		 */


		static isElement(obj) {
			try {
				// Using W3 DOM2 (works for FF, Opera and Chrom)
				return obj instanceof HTMLElement;
			} catch (e) {
				// Browsers not supporting W3 DOM2 don't have HTMLElement and
				// an exception is thrown and we end up here. Testing some
				// properties that all elements have. (works on IE7)
				return typeof obj === 'object' && obj.nodeType === 1 && typeof obj.style === 'object' && typeof obj.ownerDocument === 'object';
			}
		}
		/**
		 * Check string
		 * @param {String} str
		 * @return {Boolean}
		 */


		static isString(str) {
			return typeof str === 'string' || str instanceof String;
		}
		/**
		 * Parse url and find out the extension of the exam file.
		 *
		 * @param {*} url - The url to be parsed.
		 * The query string can contain some "special" parameters that can be used to ease the parsing process
		 * when the url doesn't match the exam file name on the filesystem:
		 * - filename: the name of the exam file
		 * - contentType: the mime type of the exam file. Currently only "application/dicom" is recognized, nifti files don't have a standard mime type.
		 * For	example:
		 * http://<hostname>/getExam?id=100&filename=myexam%2Enii%2Egz
		 * http://<hostname>/getExam?id=100&contentType=application%2Fdicom
		 *
		 * @return {Object}
		 */


		static parseUrl(url) {
			const parsedUrl = new URL(url, 'http://fix.me');
			const data = {
				filename: parsedUrl.searchParams.get('filename'),
				extension: '',
				pathname: parsedUrl.pathname,
				query: parsedUrl.search
			}; // get file name

			if (!data.filename) {
				data.filename = data.pathname.split('/').pop();
			} // find extension


			const splittedName = data.filename.split('.');
			data.extension = splittedName.length > 1 ? splittedName.pop() : 'dicom';
			const skipExt = ['asp', 'aspx', 'go', 'gs', 'hs', 'jsp', 'js', 'php', 'pl', 'py', 'rb', 'htm', 'html'];

			if (!isNaN(data.extension) || skipExt.indexOf(data.extension) !== -1 || data.query && data.query.includes('contentType=application%2Fdicom')) {
				data.extension = 'dicom';
			}

			return data;
		}
		/**
		 * Compute IJK to LPS tranform.
		 *	http://nipy.org/nibabel/dicom/dicom_orientation.html
		 *
		 * @param {*} xCos
		 * @param {*} yCos
		 * @param {*} zCos
		 * @param {*} spacing
		 * @param {*} origin
		 * @param {*} registrationMatrix
		 *
		 * @return {*}
		 */


		static ijk2LPS(xCos, yCos, zCos, spacing, origin, registrationMatrix = new three.Matrix4()) {
			const ijk2LPS = new three.Matrix4();
			ijk2LPS.set(xCos.x * spacing.y, yCos.x * spacing.x, zCos.x * spacing.z, origin.x, xCos.y * spacing.y, yCos.y * spacing.x, zCos.y * spacing.z, origin.y, xCos.z * spacing.y, yCos.z * spacing.x, zCos.z * spacing.z, origin.z, 0, 0, 0, 1);
			ijk2LPS.premultiply(registrationMatrix);
			return ijk2LPS;
		}
		/**
		 * Compute AABB to LPS transform.
		 * AABB: Axe Aligned Bounding Box.
		 *
		 * @param {*} xCos
		 * @param {*} yCos
		 * @param {*} zCos
		 * @param {*} origin
		 *
		 * @return {*}
		 */


		static aabb2LPS(xCos, yCos, zCos, origin) {
			const aabb2LPS = new three.Matrix4();
			aabb2LPS.set(xCos.x, yCos.x, zCos.x, origin.x, xCos.y, yCos.y, zCos.y, origin.y, xCos.z, yCos.z, zCos.z, origin.z, 0, 0, 0, 1);
			return aabb2LPS;
		}
		/**
		 * Transform coordinates from world coordinate to data
		 *
		 * @param {*} lps2IJK
		 * @param {*} worldCoordinates
		 *
		 * @return {*}
		 */


		static worldToData(lps2IJK, worldCoordinates) {
			let dataCoordinate = new three.Vector3().copy(worldCoordinates).applyMatrix4(lps2IJK); // same rounding in the shaders

			dataCoordinate.addScalar(0.5).floor();
			return dataCoordinate;
		}

		static value(stack, coordinate) {
			console.warn('value is deprecated, please use getPixelData instead');
			this.getPixelData(stack, coordinate);
		}
		/**
		 * Get voxel value
		 *
		 * @param {ModelsStack} stack
		 * @param {Vector3} coordinate
		 * @return {*}
		 */


		static getPixelData(stack, coordinate) {
			if (coordinate.z >= 0 && coordinate.z < stack._frame.length) {
				return stack._frame[coordinate.z].getPixelData(coordinate.x, coordinate.y);
			} else {
				return null;
			}
		}
		/**
		 * Set voxel value
		 *
		 * @param {ModelsStack} stack
		 * @param {Vector3} coordinate
		 * @param {Number} value
		 * @return {*}
		 */


		static setPixelData(stack, coordinate, value) {
			if (coordinate.z >= 0 && coordinate.z < stack._frame.length) {
				stack._frame[coordinate.z].setPixelData(coordinate.x, coordinate.y, value);
			} else {
				return null;
			}
		}
		/**
		 * Apply slope/intercept to a value
		 *
		 * @param {*} value
		 * @param {*} slope
		 * @param {*} intercept
		 *
		 * @return {*}
		 */


		static rescaleSlopeIntercept(value, slope, intercept) {
			return value * slope + intercept;
		}
		/**
		 *
		 * Convenience function to extract center of mass from list of points.
		 *
		 * @param {Array<Vector3>} points - Set of points from which we want to extract the center of mass.
		 *
		 * @returns {Vector3} Center of mass from given points.
		 */


		static centerOfMass(points) {
			let centerOfMass = new three.Vector3(0, 0, 0);

			for (let i = 0; i < points.length; i++) {
				centerOfMass.x += points[i].x;
				centerOfMass.y += points[i].y;
				centerOfMass.z += points[i].z;
			}

			centerOfMass.divideScalar(points.length);
			return centerOfMass;
		}
		/**
		 *
		 * Order 3D planar points around a refence point.
		 *
		 * @private
		 *
		 * @param {Array<Vector3>} points - Set of planar 3D points to be ordered.
		 * @param {Vector3} direction - Direction of the plane in which points and reference are sitting.
		 *
		 * @returns {Array<Object>} Set of object representing the ordered points.
		 */


		static orderIntersections(points, direction) {
			let reference = this.centerOfMass(points); // direction from first point to reference

			let referenceDirection = new three.Vector3(points[0].x - reference.x, points[0].y - reference.y, points[0].z - reference.z).normalize();
			let base = new three.Vector3(0, 0, 0).crossVectors(referenceDirection, direction).normalize();
			let orderedpoints = []; // other lines // if inter, return location + angle

			for (let j = 0; j < points.length; j++) {
				let point = new three.Vector3(points[j].x, points[j].y, points[j].z);
				point.direction = new three.Vector3(points[j].x - reference.x, points[j].y - reference.y, points[j].z - reference.z).normalize();
				let x = referenceDirection.dot(point.direction);
				let y = base.dot(point.direction);
				point.xy = {
					x,
					y
				};
				let theta = Math.atan2(y, x) * (180 / Math.PI);
				point.angle = theta;
				orderedpoints.push(point);
			}

			orderedpoints.sort(function (a, b) {
				return a.angle - b.angle;
			});
			let noDups = [orderedpoints[0]];
			let epsilon = 0.0001;

			for (let i = 1; i < orderedpoints.length; i++) {
				if (Math.abs(orderedpoints[i - 1].angle - orderedpoints[i].angle) > epsilon) {
					noDups.push(orderedpoints[i]);
				}
			}

			return noDups;
		}
		/**
		 * Get min, max, mean and sd of voxel values behind the mesh
		 *
		 * @param {THREE.Mesh}	mesh		Region of Interest
		 * @param {*}					 camera	Tested on CamerasOrthographic
		 * @param {ModelsStack} stack
		 *
		 * @return {Object|null}
		 */


		static getRoI(mesh, camera, stack) {
			mesh.geometry.computeBoundingBox();
			const bbox = new three.Box3().setFromObject(mesh);
			const min = bbox.min.clone().project(camera);
			const max = bbox.max.clone().project(camera);
			const offsetWidth = camera.controls.domElement.offsetWidth;
			const offsetHeight = camera.controls.domElement.offsetHeight;
			const rayCaster = new three.Raycaster();
			const values = [];
			min.x = Math.round((min.x + 1) * offsetWidth / 2);
			min.y = Math.round((-min.y + 1) * offsetHeight / 2);
			max.x = Math.round((max.x + 1) * offsetWidth / 2);
			max.y = Math.round((-max.y + 1) * offsetHeight / 2);
			[min.x, max.x] = [Math.min(min.x, max.x), Math.max(min.x, max.x)];
			[min.y, max.y] = [Math.min(min.y, max.y), Math.max(min.y, max.y)];
			let intersect = [];
			let value = null;

			for (let x = min.x; x <= max.x; x++) {
				for (let y = min.y; y <= max.y; y++) {
					rayCaster.setFromCamera({
						x: x / offsetWidth * 2 - 1,
						y: -(y / offsetHeight) * 2 + 1
					}, camera);
					intersect = rayCaster.intersectObject(mesh);

					if (intersect.length === 0) {
						continue;
					}

					value = CoreUtils.getPixelData(stack, CoreUtils.worldToData(stack.lps2IJK, intersect[0].point)); // the image isn't RGB and coordinates are inside it

					if (value !== null && stack.numberOfChannels === 1) {
						values.push(CoreUtils.rescaleSlopeIntercept(value, stack.rescaleSlope, stack.rescaleIntercept));
					}
				}
			}

			if (values.length === 0) {
				return null;
			}

			const avg = values.reduce((sum, val) => sum + val) / values.length;
			return {
				min: values.reduce((prev, val) => prev < val ? prev : val),
				max: values.reduce((prev, val) => prev > val ? prev : val),
				mean: avg,
				sd: Math.sqrt(values.reduce((sum, val) => sum + Math.pow(val - avg, 2), 0) / values.length)
			};
		}
		/**
		 * Calculate shape area (sum of triangle polygons area).
		 * May be inaccurate or completely wrong for some shapes.
		 *
		 * @param {BufferGeometry} geometry
		 *
		 * @returns {Number}
		 */


		static getGeometryArea(geometry) {
			if (geometry.faces.length < 1) {
				return 0.0;
			}

			let area = 0.0;
			/**
			 * @type {Array<Vector3>}
			 */

			let vertices = [];
			let positionAttribute = bodyPart.geometry.getAttribute('position');

			for (let i = 0; positionAttribute.count; i++) {
				vertices = [...vertices, new three.Vector3().fromBufferAttribute(positionAttribute, i)];
			}

			geometry.faces.forEach(function (elem) {
				area += new three.Triangle(vertices[elem.a], vertices[elem.b], vertices[elem.c]).getArea();
			});
			return area;
		}

		static stringToNumber(numberAsString) {
			let number = Number(numberAsString); // returns true is number is NaN

			if (number !== number) {
				const dots = (numberAsString.match(/\./g) || []).length;
				const commas = (numberAsString.match(/\,/g) || []).length;

				if (commas === 1 && dots < 2) {
					// convert 1,45 to 1.45
					// convert 1,456.78 to 1456.78
					const replaceBy = dots === 0 ? '.' : '';
					const stringWithoutComma = numberAsString.replace(/,/g, replaceBy);
					number = Number(stringWithoutComma);
				} // if that didn't help
				// weird stuff happenning
				// should throw an error instead of setting value to 1.0


				if (number !== number) {
					console.error(`String could not be converted to number (${numberAsString}). Setting value to "1.0".`);
					number = 1.0;
				}
			}

			return number;
		}

	}

	/**
	 * Compute/test intersection between different objects.
	 *
	 * @module core/intersections
	 */

	class Intersections {
		/**
		 * Compute intersection between oriented bounding box and a plane.
		 *
		 * Returns intersection in plane's space.
		 *
		 * Should return at least 3 intersections. If not, the plane and the box do not
		 * intersect.
		 *
		 * @param {Object} aabb - Axe Aligned Bounding Box representation.
		 * @param {Vector3} aabb.halfDimensions - Half dimensions of the box.
		 * @param {Vector3} aabb.center - Center of the box.
		 * @param {Matrix4} aabb.toAABB - Transform to go from plane space to box space.
		 * @param {Object} plane - Plane representation
		 * @param {Vector3} plane.position - position of normal which describes the plane.
		 * @param {Vector3} plane.direction - Direction of normal which describes the plane.
		 *
		 * @returns {Array<Vector3>} List of all intersections in plane's space.
		 * @returns {boolean} false is invalid input provided.
		 *
		 * @example
		 * //Returns array with intersection N intersections
		 * let aabb = {
		 *	 center: new Vector3(150, 150, 150),
		 *	 halfDimensions: new Vector3(50, 60, 70),
		 *	 toAABB: new Matrix4()
		 * }
		 * let plane = {
		 *	 position: new Vector3(110, 120, 130),
		 *	 direction: new Vector3(1, 0, 0)
		 * }
		 *
		 * let intersections = CoreIntersections.aabbPlane(aabb, plane);
		 * // intersections ==
		 * //[ { x : 110, y : 90,	z : 80 },
		 * //	{ x : 110, y : 210, z : 220 },
		 * //	{ x : 110, y : 210, z : 80 },
		 * //	{ x : 110, y : 90,	z : 220 } ]
		 *
		 * //Returns empty array with 0 intersections
		 * let aabb = {
		 *
		 * }
		 * let plane = {
		 *
		 * }
		 *
		 * let intersections = VJS.Core.Validators.matrix4(new Vector3());
		 *
		 * //Returns false if invalid input?
		 *
		 */
		static aabbPlane(aabb, plane) {
			//
			// obb = { halfDimensions, orientation, center, toAABB }
			// plane = { position, direction }
			//
			//
			// LOGIC:
			//
			// Test intersection of each edge of the Oriented Bounding Box with the Plane
			//
			// ALL EDGES
			//
			//			.+-------+
			//		.' |		 .'|
			//	 +---+---+'	|
			//	 |	 |	 |	 |
			//	 |	,+---+---+
			//	 |.'		 | .'
			//	 +-------+'
			//
			// SPACE ORIENTATION
			//
			//			 +
			//		 j |
			//			 |
			//			 |	 i
			//	 k	,+-------+
			//		.'
			//	 +
			//
			//
			// 1- Move Plane position and orientation in IJK space
			// 2- Test Edges/ IJK Plane intersections
			// 3- Return intersection Edge/ IJK Plane if it touches the Oriented BBox
			let intersections = [];

			if (!(this.validateAabb(aabb) && this.validatePlane(plane))) {
				console.log('Invalid aabb or plane provided.');
				return false;
			} // invert space matrix


			let fromAABB = new three.Matrix4();
			fromAABB.getInverse(aabb.toAABB);
			let t1 = plane.direction.clone().applyMatrix4(aabb.toAABB);
			let t0 = new three.Vector3(0, 0, 0).applyMatrix4(aabb.toAABB);
			let planeAABB = this.posdir(plane.position.clone().applyMatrix4(aabb.toAABB), new three.Vector3(t1.x - t0.x, t1.y - t0.y, t1.z - t0.z).normalize());
			let bbox = CoreUtils.bbox(aabb.center, aabb.halfDimensions);
			let orientation = new three.Vector3(new three.Vector3(1, 0, 0), new three.Vector3(0, 1, 0), new three.Vector3(0, 0, 1)); // 12 edges (i.e. ray)/plane intersection tests
			// RAYS STARTING FROM THE FIRST CORNER (0, 0, 0)
			//
			//			 +
			//			 |
			//			 |
			//			 |
			//			,+---+---+
			//		.'
			//	 +

			let ray = this.posdir(new three.Vector3(aabb.center.x - aabb.halfDimensions.x, aabb.center.y - aabb.halfDimensions.y, aabb.center.z - aabb.halfDimensions.z), orientation.x);
			this.rayPlaneInBBox(ray, planeAABB, bbox, intersections);
			ray.direction = orientation.y;
			this.rayPlaneInBBox(ray, planeAABB, bbox, intersections);
			ray.direction = orientation.z;
			this.rayPlaneInBBox(ray, planeAABB, bbox, intersections); // RAYS STARTING FROM THE LAST CORNER
			//
			//							 +
			//						 .'
			//	 +-------+'
			//					 |
			//					 |
			//					 |
			//					 +
			//

			let ray2 = this.posdir(new three.Vector3(aabb.center.x + aabb.halfDimensions.x, aabb.center.y + aabb.halfDimensions.y, aabb.center.z + aabb.halfDimensions.z), orientation.x);
			this.rayPlaneInBBox(ray2, planeAABB, bbox, intersections);
			ray2.direction = orientation.y;
			this.rayPlaneInBBox(ray2, planeAABB, bbox, intersections);
			ray2.direction = orientation.z;
			this.rayPlaneInBBox(ray2, planeAABB, bbox, intersections); // RAYS STARTING FROM THE SECOND CORNER
			//
			//							 +
			//							 |
			//							 |
			//							 |
			//							 +
			//						 .'
			//					 +'

			let ray3 = this.posdir(new three.Vector3(aabb.center.x + aabb.halfDimensions.x, aabb.center.y - aabb.halfDimensions.y, aabb.center.z - aabb.halfDimensions.z), orientation.y);
			this.rayPlaneInBBox(ray3, planeAABB, bbox, intersections);
			ray3.direction = orientation.z;
			this.rayPlaneInBBox(ray3, planeAABB, bbox, intersections); // RAYS STARTING FROM THE THIRD CORNER
			//
			//			.+-------+
			//		.'
			//	 +
			//
			//
			//
			//

			let ray4 = this.posdir(new three.Vector3(aabb.center.x - aabb.halfDimensions.x, aabb.center.y + aabb.halfDimensions.y, aabb.center.z - aabb.halfDimensions.z), orientation.x);
			this.rayPlaneInBBox(ray4, planeAABB, bbox, intersections);
			ray4.direction = orientation.z;
			this.rayPlaneInBBox(ray4, planeAABB, bbox, intersections); // RAYS STARTING FROM THE FOURTH CORNER
			//
			//
			//
			//	 +
			//	 |
			//	 |
			//	 |
			//	 +-------+

			let ray5 = this.posdir(new three.Vector3(aabb.center.x - aabb.halfDimensions.x, aabb.center.y - aabb.halfDimensions.y, aabb.center.z + aabb.halfDimensions.z), orientation.x);
			this.rayPlaneInBBox(ray5, planeAABB, bbox, intersections);
			ray5.direction = orientation.y;
			this.rayPlaneInBBox(ray5, planeAABB, bbox, intersections); // @todo make sure objects are unique...
			// back to original space

			intersections.map(function (element) {
				return element.applyMatrix4(fromAABB);
			});
			return intersections;
		}
		/**
		 * Compute intersection between a ray and a plane.
		 *
		 * @memberOf this
		 * @public
		 *
		 * @param {Object} ray - Ray representation.
		 * @param {Vector3} ray.position - position of normal which describes the ray.
		 * @param {Vector3} ray.direction - Direction of normal which describes the ray.
		 * @param {Object} plane - Plane representation
		 * @param {Vector3} plane.position - position of normal which describes the plane.
		 * @param {Vector3} plane.direction - Direction of normal which describes the plane.
		 *
		 * @returns {Vector3|null} Intersection between ray and plane or null.
		 */


		static rayPlane(ray, plane) {
			// ray: {position, direction}
			// plane: {position, direction}
			if (ray.direction.dot(plane.direction) !== 0) {
				//
				// not parallel, move forward
				//
				// LOGIC:
				//
				// Ray equation: P = P0 + tV
				// P = <Px, Py, Pz>
				// P0 = <ray.position.x, ray.position.y, ray.position.z>
				// V = <ray.direction.x, ray.direction.y, ray.direction.z>
				//
				// Therefore:
				// Px = ray.position.x + t*ray.direction.x
				// Py = ray.position.y + t*ray.direction.y
				// Pz = ray.position.z + t*ray.direction.z
				//
				//
				//
				// Plane equation: ax + by + cz + d = 0
				// a = plane.direction.x
				// b = plane.direction.y
				// c = plane.direction.z
				// d = -( plane.direction.x*plane.position.x +
				//				plane.direction.y*plane.position.y +
				//				plane.direction.z*plane.position.z )
				//
				//
				// 1- in the plane equation, we replace x, y and z by Px, Py and Pz
				// 2- find t
				// 3- replace t in Px, Py and Pz to get the coordinate of the intersection
				//
				let t = (plane.direction.x * (plane.position.x - ray.position.x) + plane.direction.y * (plane.position.y - ray.position.y) + plane.direction.z * (plane.position.z - ray.position.z)) / (plane.direction.x * ray.direction.x + plane.direction.y * ray.direction.y + plane.direction.z * ray.direction.z);
				let intersection = new three.Vector3(ray.position.x + t * ray.direction.x, ray.position.y + t * ray.direction.y, ray.position.z + t * ray.direction.z);
				return intersection;
			}

			return null;
		}
		/**
		 * Compute intersection between a ray and a box
		 * @param {Object} ray
		 * @param {Object} box
		 * @return {Array}
		 */


		static rayBox(ray, box) {
			// should also do the space transforms here
			// ray: {position, direction}
			// box: {halfDimensions, center}
			let intersections = [];
			let bbox = CoreUtils.bbox(box.center, box.halfDimensions); // console.log(bbox);
			// X min

			let plane = this.posdir(new three.Vector3(bbox.min.x, box.center.y, box.center.z), new three.Vector3(-1, 0, 0));
			this.rayPlaneInBBox(ray, plane, bbox, intersections); // X max

			plane = this.posdir(new three.Vector3(bbox.max.x, box.center.y, box.center.z), new three.Vector3(1, 0, 0));
			this.rayPlaneInBBox(ray, plane, bbox, intersections); // Y min

			plane = this.posdir(new three.Vector3(box.center.x, bbox.min.y, box.center.z), new three.Vector3(0, -1, 0));
			this.rayPlaneInBBox(ray, plane, bbox, intersections); // Y max

			plane = this.posdir(new three.Vector3(box.center.x, bbox.max.y, box.center.z), new three.Vector3(0, 1, 0));
			this.rayPlaneInBBox(ray, plane, bbox, intersections); // Z min

			plane = this.posdir(new three.Vector3(box.center.x, box.center.y, bbox.min.z), new three.Vector3(0, 0, -1));
			this.rayPlaneInBBox(ray, plane, bbox, intersections); // Z max

			plane = this.posdir(new three.Vector3(box.center.x, box.center.y, bbox.max.z), new three.Vector3(0, 0, 1));
			this.rayPlaneInBBox(ray, plane, bbox, intersections);
			return intersections;
		}
		/**
		 * Intersection between ray and a plane that are in a box.
		 * @param {*} ray
		 * @param {*} planeAABB
		 * @param {*} bbox
		 * @param {*} intersections
		 */


		static rayPlaneInBBox(ray, planeAABB, bbox, intersections) {
			let intersection = this.rayPlane(ray, planeAABB); // console.log(intersection);

			if (intersection && this.inBBox(intersection, bbox)) {
				if (!intersections.find(this.findIntersection(intersection))) {
					intersections.push(intersection);
				}
			}
		}
		/**
		 * Find intersection in array
		 * @param {*} myintersection
		 */


		static findIntersection(myintersection) {
			return function found(element, index, array) {
				if (myintersection.x === element.x && myintersection.y === element.y && myintersection.z === element.z) {
					return true;
				}

				return false;
			};
		}
		/**
		 * Is point in box.
		 * @param {Object} point
		 * @param {Object} bbox
		 * @return {Boolean}
		 */


		static inBBox(point, bbox) {
			//
			let epsilon = 0.0001;

			if (point && point.x >= bbox.min.x - epsilon && point.y >= bbox.min.y - epsilon && point.z >= bbox.min.z - epsilon && point.x <= bbox.max.x + epsilon && point.y <= bbox.max.y + epsilon && point.z <= bbox.max.z + epsilon) {
				return true;
			}

			return false;
		}

		static posdir(position, direction) {
			return {
				position,
				direction
			};
		}

		static validatePlane(plane) {
			//
			if (plane === null) {
				console.log('Invalid plane.');
				console.log(plane);
				return false;
			}

			if (!Validators.vector3(plane.position)) {
				console.log('Invalid plane.position.');
				console.log(plane.position);
				return false;
			}

			if (!Validators.vector3(plane.direction)) {
				console.log('Invalid plane.direction.');
				console.log(plane.direction);
				return false;
			}

			return true;
		}

		static validateAabb(aabb) {
			//
			if (aabb === null) {
				console.log('Invalid aabb.');
				console.log(aabb);
				return false;
			}

			if (!Validators.matrix4(aabb.toAABB)) {
				console.log('Invalid aabb.toAABB: ');
				console.log(aabb.toAABB);
				return false;
			}

			if (!Validators.vector3(aabb.center)) {
				console.log('Invalid aabb.center.');
				console.log(aabb.center);
				return false;
			}

			if (!(Validators.vector3(aabb.halfDimensions) && aabb.halfDimensions.x >= 0 && aabb.halfDimensions.y >= 0 && aabb.halfDimensions.z >= 0)) {
				console.log('Invalid aabb.halfDimensions.');
				console.log(aabb.halfDimensions);
				return false;
			}

			return true;
		}

	}

	/**
	 * Orthographic camera from THREE.JS with some extra convenience
	 * functionalities.
	 *
	 * @example
	 * //
	 * //
	 *
	 * @module cameras/orthographic
	 */

	class camerasOrthographic extends three.OrthographicCamera {
		constructor(left, right, top, bottom, near, far) {
			super(left, right, top, bottom, near, far);
			this._front = null;
			this._back = null;
			this._directions = [new three.Vector3(1, 0, 0), new three.Vector3(0, 1, 0), new three.Vector3(0, 0, 1)];
			this._directionsLabel = ['A', 'P', // TOP/BOTTOM
			'L', 'R', // LEFT/RIGHT
			'I', 'S' // FROM/TO
			];
			this._orientation = 'default';
			this._convention = 'radio';
			this._stackOrientation = 0;
			this._right = null;
			this._up = null;
			this._direction = null;
			this._controls = null;
			this._box = null;
			this._canvas = {
				width: null,
				height: null
			};
			this._fromFront = true;
			this._angle = 0;
		}
		/**
		 * Initialize orthographic camera variables
		 */


		init(xCosine, yCosine, zCosine, controls, box, canvas) {
			// DEPRECATION NOTICE
			console.warn(`cameras.orthographic.init(...) is deprecated.
				Use .cosines, .controls, .box and .canvas instead.`); //

			if (!(Validators.vector3(xCosine) && Validators.vector3(yCosine) && Validators.vector3(zCosine) && Validators.box(box) && controls)) {
				console.log('Invalid input provided.');
				return false;
			}

			this._right = xCosine;
			this._up = this._adjustTopDirection(xCosine, yCosine);
			this._direction = new three.Vector3().crossVectors(this._right, this._up);
			this._controls = controls;
			this._box = box;
			this._canvas = canvas;
			let ray = {
				position: this._box.center,
				direction: this._direction
			};

			let intersections = this._orderIntersections(Intersections.rayBox(ray, this._box), this._direction);

			this._front = intersections[0];
			this._back = intersections[1]; // set default values

			this.up.set(this._up.x, this._up.y, this._up.z);

			this._updateCanvas();

			this._updatePositionAndTarget(this._front, this._back);

			this._updateMatrices();

			this._updateDirections();
		}

		update() {
			// http://www.grahamwideman.com/gw/brain/orientation/orientterms.htm
			// do magics depending on orientation and convention
			// also needs a default mode
			if (this._orientation === 'default') {
				switch (this._getMaxIndex(this._directions[2])) {
					case 0:
						this._orientation = 'sagittal';
						break;

					case 1:
						this._orientation = 'coronal';
						break;

					case 2:
						this._orientation = 'axial';
						break;

					default:
						this._orientation = 'free';
						break;
				}
			}

			if (this._orientation === 'free') {
				this._right = this._directions[0];
				this._up = this._directions[1];
				this._direction = this._directions[2];
			} else {
				let leftIndex = this.leftDirection();
				let leftDirection = this._directions[leftIndex];
				let posteriorIndex = this.posteriorDirection();
				let posteriorDirection = this._directions[posteriorIndex];
				let superiorIndex = this.superiorDirection();
				let superiorDirection = this._directions[superiorIndex];

				if (this._convention === 'radio') {
					switch (this._orientation) {
						case 'axial':
							// up vector is 'anterior'
							if (posteriorDirection.y > 0) {
								posteriorDirection.negate();
							} // looking towards superior


							if (superiorDirection.z < 0) {
								superiorDirection.negate();
							} //


							this._right = leftDirection; // does not matter right/left

							this._up = posteriorDirection;
							this._direction = superiorDirection;
							break;

						case 'coronal':
							// up vector is 'superior'
							if (superiorDirection.z < 0) {
								superiorDirection.negate();
							} // looking towards posterior


							if (posteriorDirection.y < 0) {
								posteriorDirection.negate();
							} //


							this._right = leftDirection; // does not matter right/left

							this._up = superiorDirection;
							this._direction = posteriorDirection;
							break;

						case 'sagittal':
							// up vector is 'superior'
							if (superiorDirection.z < 0) {
								superiorDirection.negate();
							} // looking towards right


							if (leftDirection.x > 0) {
								leftDirection.negate();
							} //


							this._right = posteriorDirection; // does not matter right/left

							this._up = superiorDirection;
							this._direction = leftDirection;
							break;

						default:
							console.warn(`"${this._orientation}" orientation is not valid.
									(choices: axial, coronal, sagittal)`);
							break;
					}
				} else if (this._convention === 'neuro') {
					switch (this._orientation) {
						case 'axial':
							// up vector is 'anterior'
							if (posteriorDirection.y > 0) {
								posteriorDirection.negate();
							} // looking towards inferior


							if (superiorDirection.z > 0) {
								superiorDirection.negate();
							} //


							this._right = leftDirection; // does not matter right/left

							this._up = posteriorDirection;
							this._direction = superiorDirection;
							break;

						case 'coronal':
							// up vector is 'superior'
							if (superiorDirection.z < 0) {
								superiorDirection.negate();
							} // looking towards anterior


							if (posteriorDirection.y > 0) {
								posteriorDirection.negate();
							} //


							this._right = leftDirection; // does not matter right/left

							this._up = superiorDirection;
							this._direction = posteriorDirection;
							break;

						case 'sagittal':
							// up vector is 'superior'
							if (superiorDirection.z < 0) {
								superiorDirection.negate();
							} // looking towards right


							if (leftDirection.x > 0) {
								leftDirection.negate();
							} //


							this._right = posteriorDirection; // does not matter right/left

							this._up = superiorDirection;
							this._direction = leftDirection;
							break;

						default:
							console.warn(`"${this._orientation}" orientation is not valid.
									(choices: axial, coronal, sagittal)`);
							break;
					}
				} else {
					console.warn(`${this._convention} is not valid (choices: radio, neuro)`);
				}
			} // that is what determines left/right


			let ray = {
				position: this._box.center,
				direction: this._direction
			};

			let intersections = this._orderIntersections(Intersections.rayBox(ray, this._box), this._direction);

			this._front = intersections[0];
			this._back = intersections[1]; // set default values

			this.up.set(this._up.x, this._up.y, this._up.z);

			this._updateCanvas();

			this._updatePositionAndTarget(this._front, this._back);

			this._updateMatrices();

			this._updateDirections();
		}

		leftDirection() {
			return this._findMaxIndex(this._directions, 0);
		}

		posteriorDirection() {
			return this._findMaxIndex(this._directions, 1);
		}

		superiorDirection() {
			return this._findMaxIndex(this._directions, 2);
		}
		/**
		 * Invert rows in the current slice.
		 * Inverting rows in 2 steps:
		 *	 * Flip the "up" vector
		 *	 * Look at the slice from the other side
		 */


		invertRows() {
			// flip "up" vector
			// we flip up first because invertColumns update projectio matrices
			this.up.multiplyScalar(-1);
			this.invertColumns();

			this._updateDirections();
		}
		/**
		 * Invert rows in the current slice.
		 * Inverting rows in 1 step:
		 *	 * Look at the slice from the other side
		 */


		invertColumns() {
			this.center(); // rotate 180 degrees around the up vector...

			let oppositePosition = this._oppositePosition(this.position); // update posistion and target
			// clone is needed because this.position is overwritten in method


			this._updatePositionAndTarget(oppositePosition, this.position.clone());

			this._updateMatrices();

			this._fromFront = !this._fromFront;
			this._angle %= 360;
			this._angle = 360 - this._angle;

			this._updateDirections();
		}
		/**
		 * Center slice in the camera FOV.
		 * It also updates the controllers properly.
		 * We can center a camera from the front or from the back.
		 */


		center() {
			if (this._fromFront) {
				this._updatePositionAndTarget(this._front, this._back);
			} else {
				this._updatePositionAndTarget(this._back, this._front);
			}

			this._updateMatrices();

			this._updateDirections();
		}
		/**
		 * Pi/2 rotation around the zCosine axis.
		 * Clock-wise rotation from the user point of view.
		 */


		rotate(angle = null) {
			this.center();
			let rotationToApply = 90;

			if (angle === null) {
				rotationToApply *= -1;
				this._angle += 90;
			} else {
				rotationToApply = 360 - (angle - this._angle);
				this._angle = angle;
			}

			this._angle %= 360; // Rotate the up vector around the "zCosine"

			let rotation = new three.Matrix4().makeRotationAxis(this._direction, rotationToApply * Math.PI / 180);
			this.up.applyMatrix4(rotation);

			this._updateMatrices();

			this._updateDirections();
		} // dimensions[0] // width
		// dimensions[1] // height
		// direction= 0 width, 1 height, 2 best
		// factor


		fitBox(direction = 0, factor = 1.5) {
			//
			// if (!(dimensions && dimensions.length >= 2)) {
			//	 console.log('Invalid dimensions container.');
			//	 console.log(dimensions);
			//	 return false;
			// }
			//
			let zoom = 1; // update zoom

			switch (direction) {
				case 0:
					zoom = factor * this._computeZoom(this._canvas.width, this._right);
					break;

				case 1:
					zoom = factor * this._computeZoom(this._canvas.height, this._up);
					break;

				case 2:
					zoom = factor * Math.min(this._computeZoom(this._canvas.width, this._right), this._computeZoom(this._canvas.height, this._up));
					break;
			}

			if (!zoom) {
				return false;
			}

			this.zoom = zoom;
			this.center();
		}

		_adjustTopDirection(horizontalDirection, verticalDirection) {
			const vMaxIndex = this._getMaxIndex(verticalDirection); // should handle vMax index === 0


			if (vMaxIndex === 2 && verticalDirection.getComponent(vMaxIndex) < 0 || vMaxIndex === 1 && verticalDirection.getComponent(vMaxIndex) > 0 || vMaxIndex === 0 && verticalDirection.getComponent(vMaxIndex) > 0) {
				verticalDirection.negate();
			}

			return verticalDirection;
		}

		_getMaxIndex(vector) {
			// init with X value
			let maxValue = Math.abs(vector.x);
			let index = 0;

			if (Math.abs(vector.y) > maxValue) {
				maxValue = Math.abs(vector.y);
				index = 1;
			}

			if (Math.abs(vector.z) > maxValue) {
				index = 2;
			}

			return index;
		}

		_findMaxIndex(directions, target) {
			// get index of the most superior direction
			let maxIndices = this._getMaxIndices(directions);

			for (let i = 0; i < maxIndices.length; i++) {
				if (maxIndices[i] === target) {
					return i;
				}
			}
		}

		_getMaxIndices(directions) {
			let indices = [];
			indices.push(this._getMaxIndex(directions[0]));
			indices.push(this._getMaxIndex(directions[1]));
			indices.push(this._getMaxIndex(directions[2]));
			return indices;
		}

		_orderIntersections(intersections, direction) {
			const ordered = intersections[0].dot(direction) < intersections[1].dot(direction);

			if (!ordered) {
				return [intersections[1], intersections[0]];
			}

			return intersections;
		}

		_updateCanvas() {
			let camFactor = 2;
			this.left = -this._canvas.width / camFactor;
			this.right = this._canvas.width / camFactor;
			this.top = this._canvas.height / camFactor;
			this.bottom = -this._canvas.height / camFactor;

			this._updateMatrices();

			this.controls.handleResize();
		}

		_oppositePosition(position) {
			let oppositePosition = position.clone(); // center world postion around box center

			oppositePosition.sub(this._box.center); // rotate

			let rotation = new three.Matrix4().makeRotationAxis(this.up, Math.PI);
			oppositePosition.applyMatrix4(rotation); // translate back to world position

			oppositePosition.add(this._box.center);
			return oppositePosition;
		}

		_computeZoom(dimension, direction) {
			if (!(dimension && dimension > 0)) {
				console.log('Invalid dimension provided.');
				console.log(dimension);
				return false;
			} // ray


			let ray = {
				position: this._box.center.clone(),
				direction: direction
			};
			let intersections = Intersections.rayBox(ray, this._box);

			if (intersections.length < 2) {
				console.log('Can not adjust the camera ( < 2 intersections).');
				console.log(ray);
				console.log(this._box);
				return false;
			}

			return dimension / intersections[0].distanceTo(intersections[1]);
		}

		_updatePositionAndTarget(position, target) {
			// position
			this.position.set(position.x, position.y, position.z); // targets

			this.lookAt(target.x, target.y, target.z);

			this._controls.target.set(target.x, target.y, target.z);
		}

		_updateMatrices() {
			this._controls.update(); // THEN camera


			this.updateProjectionMatrix();
			this.updateMatrixWorld();
		}

		_updateLabels() {
			this._directionsLabel = [this._vector2Label(this._up), this._vector2Label(this._up.clone().negate()), this._vector2Label(this._right), this._vector2Label(this._right.clone().negate()), this._vector2Label(this._direction), this._vector2Label(this._direction.clone().negate())];
		}

		_vector2Label(direction) {
			const index = this._getMaxIndex(direction); // set vector max value to 1


			const scaledDirection = direction.clone().divideScalar(Math.abs(direction.getComponent(index)));
			const delta = 0.2;
			let label = ''; // loop through components of the vector

			for (let i = 0; i < 3; i++) {
				if (i === 0) {
					if (scaledDirection.getComponent(i) + delta >= 1) {
						label += 'L';
					} else if (scaledDirection.getComponent(i) - delta <= -1) {
						label += 'R';
					}
				}

				if (i === 1) {
					if (scaledDirection.getComponent(i) + delta >= 1) {
						label += 'P';
					} else if (scaledDirection.getComponent(i) - delta <= -1) {
						label += 'A';
					}
				}

				if (i === 2) {
					if (scaledDirection.getComponent(i) + delta >= 1) {
						label += 'S';
					} else if (scaledDirection.getComponent(i) - delta <= -1) {
						label += 'I';
					}
				}
			}

			return label;
		}

		_updateDirections() {
			// up is correct
			this._up = this.up.clone(); // direction

			let pLocal = new three.Vector3(0, 0, -1);
			let pWorld = pLocal.applyMatrix4(this.matrixWorld);
			this._direction = pWorld.sub(this.position).normalize(); // right

			this._right = new three.Vector3().crossVectors(this._direction, this.up); // update labels accordingly

			this._updateLabels();
		}

		set controls(controls) {
			this._controls = controls;
		}

		get controls() {
			return this._controls;
		}

		set box(box) {
			this._box = box;
		}

		get box() {
			return this._box;
		}

		set canvas(canvas) {
			this._canvas = canvas;

			this._updateCanvas();
		}

		get canvas() {
			return this._canvas;
		}

		set angle(angle) {
			this.rotate(angle);
		}

		get angle() {
			return this._angle;
		}

		set directions(directions) {
			this._directions = directions;
		}

		get directions() {
			return this._directions;
		}

		set convention(convention) {
			this._convention = convention;
		}

		get convention() {
			return this._convention;
		}

		set orientation(orientation) {
			this._orientation = orientation;
		}

		get orientation() {
			return this._orientation;
		}

		set directionsLabel(directionsLabel) {
			this._directionsLabel = directionsLabel;
		}

		get directionsLabel() {
			return this._directionsLabel;
		}

		set stackOrientation(stackOrientation) {
			this._stackOrientation = stackOrientation;

			if (this._stackOrientation === 0) {
				this._orientation = 'default';
			} else {
				const maxIndex = this._getMaxIndex(this._directions[(this._stackOrientation + 2) % 3]);

				if (maxIndex === 0) {
					this._orientation = 'sagittal';
				} else if (maxIndex === 1) {
					this._orientation = 'coronal';
				} else if (maxIndex === 2) {
					this._orientation = 'axial';
				}
			}
		}

		get stackOrientation() {
			//
			if (this._orientation === 'default') {
				this._stackOrientation = 0;
			} else {
				let maxIndex = this._getMaxIndex(this._direction);

				if (maxIndex === this._getMaxIndex(this._directions[2])) {
					this._stackOrientation = 0;
				} else if (maxIndex === this._getMaxIndex(this._directions[0])) {
					this._stackOrientation = 1;
				} else if (maxIndex === this._getMaxIndex(this._directions[1])) {
					this._stackOrientation = 2;
				}
			}

			return this._stackOrientation;
		}

	}

	/**
	 * Original authors from THREEJS repo
	 * @author Eberhard Graether / http://egraether.com/
	 * @author Mark Lundin	/ http://mark-lundin.com
	 * @author Simone Manini / http://daron1337.github.io
	 * @author Luca Antiga	/ http://lantiga.github.io
	 */

	class trackball extends three.EventDispatcher {
		constructor(object, domElement) {
			super();

			let _this = this;

			let STATE = {
				NONE: -1,
				ROTATE: 0,
				ZOOM: 1,
				PAN: 2,
				TOUCH_ROTATE: 3,
				TOUCH_ZOOM: 4,
				TOUCH_PAN: 5,
				CUSTOM: 99
			};
			this.object = object;
			this.domElement = domElement !== undefined ? domElement : document; // API

			this.enabled = true;
			this.screen = {
				left: 0,
				top: 0,
				width: 0,
				height: 0
			};
			this.rotateSpeed = 1.0;
			this.zoomSpeed = 1.2;
			this.panSpeed = 0.3;
			this.noRotate = false;
			this.noZoom = false;
			this.noPan = false;
			this.noCustom = false;
			this.forceState = -1;
			this.staticMoving = false;
			this.dynamicDampingFactor = 0.2;
			this.minDistance = 0;
			this.maxDistance = Infinity;
			this.keys = [65
			/* A*/
			, 83
			/* S*/
			, 68]; // internals

			this.target = new three.Vector3();
			let EPS = 0.000001;
			let lastPosition = new three.Vector3();

			let _state = STATE.NONE,
					_prevState = STATE.NONE,
					_eye = new three.Vector3(),
					_movePrev = new three.Vector2(),
					_moveCurr = new three.Vector2(),
					_lastAxis = new three.Vector3(),
					_lastAngle = 0,
					_zoomStart = new three.Vector2(),
					_zoomEnd = new three.Vector2(),
					_touchZoomDistanceStart = 0,
					_touchZoomDistanceEnd = 0,
					_panStart = new three.Vector2(),
					_panEnd = new three.Vector2(),
					_customStart = new three.Vector2(),
					_customEnd = new three.Vector2(); // for reset


			this.target0 = this.target.clone();
			this.position0 = this.object.position.clone();
			this.up0 = this.object.up.clone(); // events

			let changeEvent = {
				type: 'change'
			};
			let startEvent = {
				type: 'start'
			};
			let endEvent = {
				type: 'end'
			}; // methods

			this.handleResize = function () {
				if (this.domElement === document) {
					this.screen.left = 0;
					this.screen.top = 0;
					this.screen.width = innerWidth;
					this.screen.height = innerHeight;
				} else {
					let box = this.domElement.getBoundingClientRect(); // adjustments come from similar code in the jquery offset() function

					let d = this.domElement.ownerDocument.documentElement;
					this.screen.left = box.left + scrollX - d.clientLeft;
					this.screen.top = box.top + scrollY - d.clientTop;
					this.screen.width = box.width;
					this.screen.height = box.height;
				}
			};

			this.handleEvent = function (event) {
				if (typeof this[event.type] == 'function') {
					this[event.type](event);
				}
			};

			let getMouseOnScreen = function () {
				let vector = new three.Vector2();
				return function (pageX, pageY) {
					vector.set((pageX - _this.screen.left) / _this.screen.width, (pageY - _this.screen.top) / _this.screen.height);
					return vector;
				};
			}();

			let getMouseOnCircle = function () {
				let vector = new three.Vector2();
				return function (pageX, pageY) {
					vector.set((pageX - _this.screen.width * 0.5 - _this.screen.left) / (_this.screen.width * 0.5), (_this.screen.height + 2 * (_this.screen.top - pageY)) / _this.screen.width // screen.width intentional
					);
					return vector;
				};
			}();

			this.rotateCamera = function () {
				let axis = new three.Vector3(),
						quaternion = new three.Quaternion(),
						eyeDirection = new three.Vector3(),
						objectUpDirection = new three.Vector3(),
						objectSidewaysDirection = new three.Vector3(),
						moveDirection = new three.Vector3(),
						angle;
				return function () {
					moveDirection.set(_moveCurr.x - _movePrev.x, _moveCurr.y - _movePrev.y, 0);
					angle = moveDirection.length();

					if (angle) {
						_eye.copy(_this.object.position).sub(_this.target);

						eyeDirection.copy(_eye).normalize();
						objectUpDirection.copy(_this.object.up).normalize();
						objectSidewaysDirection.crossVectors(objectUpDirection, eyeDirection).normalize();
						objectUpDirection.setLength(_moveCurr.y - _movePrev.y);
						objectSidewaysDirection.setLength(_moveCurr.x - _movePrev.x);
						moveDirection.copy(objectUpDirection.add(objectSidewaysDirection));
						axis.crossVectors(moveDirection, _eye).normalize();
						angle *= _this.rotateSpeed;
						quaternion.setFromAxisAngle(axis, angle);

						_eye.applyQuaternion(quaternion);

						_this.object.up.applyQuaternion(quaternion);

						_lastAxis.copy(axis);

						_lastAngle = angle;
					} else if (!_this.staticMoving && _lastAngle) {
						_lastAngle *= Math.sqrt(1.0 - _this.dynamicDampingFactor);

						_eye.copy(_this.object.position).sub(_this.target);

						quaternion.setFromAxisAngle(_lastAxis, _lastAngle);

						_eye.applyQuaternion(quaternion);

						_this.object.up.applyQuaternion(quaternion);
					}

					_movePrev.copy(_moveCurr);
				};
			}();

			this.zoomCamera = function () {
				let factor;

				if (_state === STATE.TOUCH_ZOOM) {
					factor = _touchZoomDistanceStart / _touchZoomDistanceEnd;
					_touchZoomDistanceStart = _touchZoomDistanceEnd;

					_eye.multiplyScalar(factor);
				} else {
					factor = 1.0 + (_zoomEnd.y - _zoomStart.y) * _this.zoomSpeed;

					if (factor !== 1.0 && factor > 0.0) {
						_eye.multiplyScalar(factor);

						if (_this.staticMoving) {
							_zoomStart.copy(_zoomEnd);
						} else {
							_zoomStart.y += (_zoomEnd.y - _zoomStart.y) * this.dynamicDampingFactor;
						}
					}
				}
			};

			this.panCamera = function () {
				let mouseChange = new three.Vector2(),
						objectUp = new three.Vector3(),
						pan = new three.Vector3();
				return function () {
					mouseChange.copy(_panEnd).sub(_panStart);

					if (mouseChange.lengthSq()) {
						mouseChange.multiplyScalar(_eye.length() * _this.panSpeed);
						pan.copy(_eye).cross(_this.object.up).setLength(mouseChange.x);
						pan.add(objectUp.copy(_this.object.up).setLength(mouseChange.y));

						_this.object.position.add(pan);

						_this.target.add(pan);

						if (_this.staticMoving) {
							_panStart.copy(_panEnd);
						} else {
							_panStart.add(mouseChange.subVectors(_panEnd, _panStart).multiplyScalar(_this.dynamicDampingFactor));
						}
					}
				};
			}();

			this.checkDistances = function () {
				if (!_this.noZoom || !_this.noPan) {
					if (_eye.lengthSq() > _this.maxDistance * _this.maxDistance) {
						_this.object.position.addVectors(_this.target, _eye.setLength(_this.maxDistance));
					}

					if (_eye.lengthSq() < _this.minDistance * _this.minDistance) {
						_this.object.position.addVectors(_this.target, _eye.setLength(_this.minDistance));
					}
				}
			};

			this.update = function () {
				_eye.subVectors(_this.object.position, _this.target);

				if (!_this.noRotate) {
					_this.rotateCamera();
				}

				if (!_this.noZoom) {
					_this.zoomCamera();
				}

				if (!_this.noPan) {
					_this.panCamera();
				}

				if (!_this.noCustom) {
					_this.custom(_customStart, _customEnd);
				}

				_this.object.position.addVectors(_this.target, _eye);

				_this.checkDistances();

				_this.object.lookAt(_this.target);

				if (lastPosition.distanceToSquared(_this.object.position) > EPS) {
					_this.dispatchEvent(changeEvent);

					lastPosition.copy(_this.object.position);
				}
			};

			this.reset = function () {
				_state = STATE.NONE;
				_prevState = STATE.NONE;

				_this.target.copy(_this.target0);

				_this.object.position.copy(_this.position0);

				_this.object.up.copy(_this.up0);

				_eye.subVectors(_this.object.position, _this.target);

				_this.object.lookAt(_this.target);

				_this.dispatchEvent(changeEvent);

				lastPosition.copy(_this.object.position);
			};

			this.setState = function (targetState) {
				_this.forceState = targetState;
				_prevState = targetState;
				_state = targetState;
			};

			this.custom = function (customStart, customEnd) {}; // listeners


			function keydown(event) {
				if (_this.enabled === false) return;
				removeEventListener('keydown', keydown);
				_prevState = _state;

				if (_state !== STATE.NONE) {
					return;
				} else if (event.keyCode === _this.keys[STATE.ROTATE] && !_this.noRotate) {
					_state = STATE.ROTATE;
				} else if (event.keyCode === _this.keys[STATE.ZOOM] && !_this.noZoom) {
					_state = STATE.ZOOM;
				} else if (event.keyCode === _this.keys[STATE.PAN] && !_this.noPan) {
					_state = STATE.PAN;
				}
			}

			function keyup(event) {
				if (_this.enabled === false) return;
				_state = _prevState;
				addEventListener('keydown', keydown, false);
			}

			function mousedown(event) {
				if (_this.enabled === false) return;
				event.preventDefault();
				event.stopPropagation();

				if (_state === STATE.NONE) {
					_state = event.button;
				}

				if (_state === STATE.ROTATE && !_this.noRotate) {
					_moveCurr.copy(getMouseOnCircle(event.pageX, event.pageY));

					_movePrev.copy(_moveCurr);
				} else if (_state === STATE.ZOOM && !_this.noZoom) {
					_zoomStart.copy(getMouseOnScreen(event.pageX, event.pageY));

					_zoomEnd.copy(_zoomStart);
				} else if (_state === STATE.PAN && !_this.noPan) {
					_panStart.copy(getMouseOnScreen(event.pageX, event.pageY));

					_panEnd.copy(_panStart);
				} else if (_state === STATE.CUSTOM && !_this.noCustom) {
					_customStart.copy(getMouseOnScreen(event.pageX, event.pageY));

					_customEnd.copy(_panStart);
				}

				document.addEventListener('mousemove', mousemove, false);
				document.addEventListener('mouseup', mouseup, false);

				_this.dispatchEvent(startEvent);
			}

			function mousemove(event) {
				if (_this.enabled === false) return;
				event.preventDefault();
				event.stopPropagation();

				if (_state === STATE.ROTATE && !_this.noRotate) {
					_movePrev.copy(_moveCurr);

					_moveCurr.copy(getMouseOnCircle(event.pageX, event.pageY));
				} else if (_state === STATE.ZOOM && !_this.noZoom) {
					_zoomEnd.copy(getMouseOnScreen(event.pageX, event.pageY));
				} else if (_state === STATE.PAN && !_this.noPan) {
					_panEnd.copy(getMouseOnScreen(event.pageX, event.pageY));
				} else if (_state === STATE.CUSTOM && !_this.noCustom) {
					_customEnd.copy(getMouseOnScreen(event.pageX, event.pageY));
				}
			}

			function mouseup(event) {
				if (_this.enabled === false) return;
				event.preventDefault();
				event.stopPropagation();

				if (_this.forceState === -1) {
					_state = STATE.NONE;
				}

				document.removeEventListener('mousemove', mousemove);
				document.removeEventListener('mouseup', mouseup);

				_this.dispatchEvent(endEvent);
			}

			function mousewheel(event) {
				if (_this.enabled === false) return;
				if (_this.noZoom === true) return;
				event.preventDefault();
				event.stopPropagation();

				switch (event.deltaMode) {
					case 2:
						// Zoom in pages
						_zoomStart.y -= event.deltaY * 0.025;
						break;

					case 1:
						// Zoom in lines
						_zoomStart.y -= event.deltaY * 0.01;
						break;

					default:
						// undefined, 0, assume pixels
						_zoomStart.y -= event.deltaY * 0.00025;
						break;
				} // _zoomStart.y += delta * 0.01;


				_this.dispatchEvent(startEvent);

				_this.dispatchEvent(endEvent);
			}

			function touchstart(event) {
				if (_this.enabled === false) return;

				if (_this.forceState === -1) {
					switch (event.touches.length) {
						case 1:
							_state = STATE.TOUCH_ROTATE;

							_moveCurr.copy(getMouseOnCircle(event.touches[0].pageX, event.touches[0].pageY));

							_movePrev.copy(_moveCurr);

							break;

						case 2:
							_state = STATE.TOUCH_ZOOM;
							var dx = event.touches[0].pageX - event.touches[1].pageX;
							var dy = event.touches[0].pageY - event.touches[1].pageY;
							_touchZoomDistanceEnd = _touchZoomDistanceStart = Math.sqrt(dx * dx + dy * dy);
							var x = (event.touches[0].pageX + event.touches[1].pageX) / 2;
							var y = (event.touches[0].pageY + event.touches[1].pageY) / 2;

							_panStart.copy(getMouseOnScreen(x, y));

							_panEnd.copy(_panStart);

							break;

						default:
							_state = STATE.NONE;
					}
				} else {
					// { NONE: -1, ROTATE: 0, ZOOM: 1, PAN: 2, TOUCH_ROTATE: 3, TOUCH_ZOOM_PAN: 4, CUSTOM: 99 };
					switch (_state) {
						case 0:
							// 1 or 2 fingers, smae behavior
							_state = STATE.TOUCH_ROTATE;

							_moveCurr.copy(getMouseOnCircle(event.touches[0].pageX, event.touches[0].pageY));

							_movePrev.copy(_moveCurr);

							break;

						case 1:
						case 4:
							if (event.touches.length >= 2) {
								_state = STATE.TOUCH_ZOOM;
								var dx = event.touches[0].pageX - event.touches[1].pageX;
								var dy = event.touches[0].pageY - event.touches[1].pageY;
								_touchZoomDistanceEnd = _touchZoomDistanceStart = Math.sqrt(dx * dx + dy * dy);
							} else {
								_state = STATE.ZOOM;

								_zoomStart.copy(getMouseOnScreen(event.touches[0].pageX, event.touches[0].pageY));

								_zoomEnd.copy(_zoomStart);
							}

							break;

						case 2:
						case 5:
							if (event.touches.length >= 2) {
								_state = STATE.TOUCH_PAN;
								var x = (event.touches[0].pageX + event.touches[1].pageX) / 2;
								var y = (event.touches[0].pageY + event.touches[1].pageY) / 2;

								_panStart.copy(getMouseOnScreen(x, y));

								_panEnd.copy(_panStart);
							} else {
								_state = STATE.PAN;

								_panStart.copy(getMouseOnScreen(event.touches[0].pageX, event.touches[0].pageY));

								_panEnd.copy(_panStart);
							}

							break;

						case 99:
							_state = STATE.CUSTOM;
							var x = (event.touches[0].pageX + event.touches[1].pageX) / 2;
							var y = (event.touches[0].pageY + event.touches[1].pageY) / 2;

							_customStart.copy(getMouseOnScreen(x, y));

							_customEnd.copy(_customStart);

							break;

						default:
							_state = STATE.NONE;
					}
				}

				_this.dispatchEvent(startEvent);
			}

			function touchmove(event) {
				if (_this.enabled === false) return;
				event.preventDefault();
				event.stopPropagation();

				if (_this.forceState === -1) {
					switch (event.touches.length) {
						case 1:
							_movePrev.copy(_moveCurr);

							_moveCurr.copy(getMouseOnCircle(event.touches[0].pageX, event.touches[0].pageY));

							break;

						case 2:
							var dx = event.touches[0].pageX - event.touches[1].pageX;
							var dy = event.touches[0].pageY - event.touches[1].pageY;
							_touchZoomDistanceEnd = Math.sqrt(dx * dx + dy * dy);
							var x = (event.touches[0].pageX + event.touches[1].pageX) / 2;
							var y = (event.touches[0].pageY + event.touches[1].pageY) / 2;

							_panEnd.copy(getMouseOnScreen(x, y));

							break;

						default:
							_state = STATE.NONE;
					}
				} else {
					// { NONE: -1, ROTATE: 0, ZOOM: 1, PAN: 2, TOUCH_ROTATE: 3, TOUCH_ZOOM_PAN: 4, CUSTOM: 99 };
					switch (_state) {
						case 0:
							_movePrev.copy(_moveCurr);

							_moveCurr.copy(getMouseOnCircle(event.touches[0].pageX, event.touches[0].pageY));

							break;

						case 1:
							_zoomEnd.copy(getMouseOnScreen(event.touches[0].pageX, event.touches[0].pageY));

							break;

						case 2:
							_panEnd.copy(getMouseOnScreen(event.touches[0].pageX, event.touches[0].pageY));

							break;

						case 4:
							// 2 fingers!
							// TOUCH ZOOM
							var dx = event.touches[0].pageX - event.touches[1].pageX;
							var dy = event.touches[0].pageY - event.touches[1].pageY;
							_touchZoomDistanceEnd = Math.sqrt(dx * dx + dy * dy);
							break;

						case 5:
							// 2 fingers
							// TOUCH_PAN
							var x = (event.touches[0].pageX + event.touches[1].pageX) / 2;
							var y = (event.touches[0].pageY + event.touches[1].pageY) / 2;

							_panEnd.copy(getMouseOnScreen(x, y));

							break;

						case 99:
							var x = (event.touches[0].pageX + event.touches[1].pageX) / 2;
							var y = (event.touches[0].pageY + event.touches[1].pageY) / 2;

							_customEnd.copy(getMouseOnScreen(x, y));

							break;

						default:
							_state = STATE.NONE;
					}
				}
			}

			function touchend(event) {
				if (_this.enabled === false) return;

				if (_this.forceState === -1) {
					switch (event.touches.length) {
						case 1:
							_movePrev.copy(_moveCurr);

							_moveCurr.copy(getMouseOnCircle(event.touches[0].pageX, event.touches[0].pageY));

							break;

						case 2:
							_touchZoomDistanceStart = _touchZoomDistanceEnd = 0;
							var x = (event.touches[0].pageX + event.touches[1].pageX) / 2;
							var y = (event.touches[0].pageY + event.touches[1].pageY) / 2;

							_panEnd.copy(getMouseOnScreen(x, y));

							_panStart.copy(_panEnd);

							break;
					}

					_state = STATE.NONE;
				} else {
					switch (_state) {
						case 0:
							_movePrev.copy(_moveCurr);

							_moveCurr.copy(getMouseOnCircle(event.touches[0].pageX, event.touches[0].pageY));

							break;

						case 1:
						case 2:
							break;

						case 4:
							// TOUCH ZOOM
							_touchZoomDistanceStart = _touchZoomDistanceEnd = 0;
							_state = STATE.ZOOM;
							break;

						case 5:
							// TOUCH ZOOM
							if (event.touches.length >= 2) {
								var x = (event.touches[0].pageX + event.touches[1].pageX) / 2;
								var y = (event.touches[0].pageY + event.touches[1].pageY) / 2;

								_panEnd.copy(getMouseOnScreen(x, y));

								_panStart.copy(_panEnd);
							}

							_state = STATE.PAN;
							break;

						case 99:
							var x = (event.touches[0].pageX + event.touches[1].pageX) / 2;
							var y = (event.touches[0].pageY + event.touches[1].pageY) / 2;

							_customEnd.copy(getMouseOnScreen(x, y));

							_customStart.copy(_customEnd);

							break;

						default:
							_state = STATE.NONE;
					}
				}

				_this.dispatchEvent(endEvent);
			}

			function contextmenu(event) {
				event.preventDefault();
			}

			this.dispose = function () {
				this.domElement.removeEventListener('contextmenu', contextmenu, false);
				this.domElement.removeEventListener('mousedown', mousedown, false);
				this.domElement.removeEventListener('wheel', mousewheel, false);
				this.domElement.removeEventListener('touchstart', touchstart, false);
				this.domElement.removeEventListener('touchend', touchend, false);
				this.domElement.removeEventListener('touchmove', touchmove, false);
				removeEventListener('keydown', keydown, false);
				removeEventListener('keyup', keyup, false);
			};

			this.domElement.addEventListener('contextmenu', contextmenu, false);
			this.domElement.addEventListener('mousedown', mousedown, false);
			this.domElement.addEventListener('wheel', mousewheel, false);
			this.domElement.addEventListener('touchstart', touchstart, false);
			this.domElement.addEventListener('touchend', touchend, false);
			this.domElement.addEventListener('touchmove', touchmove, false);
			addEventListener('keydown', keydown, false);
			addEventListener('keyup', keyup, false);
			this.handleResize(); // force an update at start

			this.update();
		}

	}

	/**
	 * @author Eberhard Graether / http://egraether.com/
	 * @author Mark Lundin	/ http://mark-lundin.com
	 * @author Patrick Fuller / http://patrick-fuller.com
	 * @author Max Smolens / https://github.com/msmolens
	 */

	class trackballOrtho extends three.EventDispatcher {
		constructor(object, domElement, state = {
			NONE: -1,
			ROTATE: 1,
			ZOOM: 2,
			PAN: 0,
			SCROLL: 4,
			TOUCH_ROTATE: 4,
			TOUCH_ZOOM_PAN: 5
		}) {
			super();

			let _this = this;

			let STATE = state;
			this.object = object;
			this.domElement = domElement !== undefined ? domElement : document; // API

			this.enabled = true;
			this.screen = {
				left: 0,
				top: 0,
				width: 0,
				height: 0
			};
			this.radius = 0;
			this.zoomSpeed = 1.2;
			this.noZoom = false;
			this.noPan = false;
			this.staticMoving = false;
			this.dynamicDampingFactor = 0.2;
			this.keys = [65
			/* A*/
			, 83
			/* S*/
			, 68]; // internals

			this.target = new three.Vector3();
			let EPS = 0.000001;
			let _changed = true;

			let _state = STATE.NONE,
					_prevState = STATE.NONE,
					_eye = new three.Vector3(),
					_zoomStart = new three.Vector2(),
					_zoomEnd = new three.Vector2(),
					_touchZoomDistanceStart = 0,
					_touchZoomDistanceEnd = 0,
					_panStart = new three.Vector2(),
					_panEnd = new three.Vector2(); // window level fire after...
			// for reset


			this.target0 = this.target.clone();
			this.position0 = this.object.position.clone();
			this.up0 = this.object.up.clone();
			this.left0 = this.object.left;
			this.right0 = this.object.right;
			this.top0 = this.object.top;
			this.bottom0 = this.object.bottom; // events

			let changeEvent = {
				type: 'change'
			};
			let startEvent = {
				type: 'start'
			};
			let endEvent = {
				type: 'end'
			}; // methods

			this.handleResize = function () {
				if (this.domElement === document) {
					this.screen.left = 0;
					this.screen.top = 0;
					this.screen.width = innerWidth;
					this.screen.height = innerHeight;
				} else {
					let box = this.domElement.getBoundingClientRect(); // adjustments come from similar code in the jquery offset() function

					let d = this.domElement.ownerDocument.documentElement;
					this.screen.left = box.left + pageXOffset - d.clientLeft;
					this.screen.top = box.top + pageYOffset - d.clientTop;
					this.screen.width = box.width;
					this.screen.height = box.height;
				}

				this.radius = 0.5 * Math.min(this.screen.width, this.screen.height);
				this.left0 = this.object.left;
				this.right0 = this.object.right;
				this.top0 = this.object.top;
				this.bottom0 = this.object.bottom;
			};

			this.handleEvent = function (event) {
				if (typeof this[event.type] == 'function') {
					this[event.type](event);
				}
			};

			let getMouseOnScreen = function () {
				let vector = new three.Vector2();
				return function getMouseOnScreen(pageX, pageY) {
					vector.set((pageX - _this.screen.left) / _this.screen.width, (pageY - _this.screen.top) / _this.screen.height);
					return vector;
				};
			}();

			this.zoomCamera = function () {
				if (_state === STATE.TOUCH_ZOOM_PAN) {
					var factor = _touchZoomDistanceEnd / _touchZoomDistanceStart;
					_touchZoomDistanceStart = _touchZoomDistanceEnd;
					_this.object.zoom *= factor;
					_changed = true;
				} else {
					var factor = 1.0 + (_zoomEnd.y - _zoomStart.y) * _this.zoomSpeed;

					if (Math.abs(factor - 1.0) > EPS && factor > 0.0) {
						_this.object.zoom /= factor;

						if (_this.staticMoving) {
							_zoomStart.copy(_zoomEnd);
						} else {
							_zoomStart.y += (_zoomEnd.y - _zoomStart.y) * this.dynamicDampingFactor;
						}

						_changed = true;
					}
				}
			};

			this.panCamera = function () {
				let mouseChange = new three.Vector2(),
						objectUp = new three.Vector3(),
						pan = new three.Vector3();
				return function panCamera() {
					mouseChange.copy(_panEnd).sub(_panStart);

					if (mouseChange.lengthSq()) {
						// Scale movement to keep clicked/dragged position under cursor
						let scale_x = (_this.object.right - _this.object.left) / _this.object.zoom;
						let scale_y = (_this.object.top - _this.object.bottom) / _this.object.zoom;
						mouseChange.x *= scale_x;
						mouseChange.y *= scale_y;
						pan.copy(_eye).cross(_this.object.up).setLength(mouseChange.x);
						pan.add(objectUp.copy(_this.object.up).setLength(mouseChange.y));

						_this.object.position.add(pan);

						_this.target.add(pan);

						if (_this.staticMoving) {
							_panStart.copy(_panEnd);
						} else {
							_panStart.add(mouseChange.subVectors(_panEnd, _panStart).multiplyScalar(_this.dynamicDampingFactor));
						}

						_changed = true;
					}
				};
			}();

			this.update = function () {
				_eye.subVectors(_this.object.position, _this.target);

				if (!_this.noZoom) {
					_this.zoomCamera();

					if (_changed) {
						_this.object.updateProjectionMatrix();
					}
				}

				if (!_this.noPan) {
					_this.panCamera();
				}

				_this.object.position.addVectors(_this.target, _eye);

				_this.object.lookAt(_this.target);

				if (_changed) {
					_this.dispatchEvent(changeEvent);

					_changed = false;
				}
			};

			this.reset = function () {
				_state = STATE.NONE;
				_prevState = STATE.NONE;

				_this.target.copy(_this.target0);

				_this.object.position.copy(_this.position0);

				_this.object.up.copy(_this.up0);

				_eye.subVectors(_this.object.position, _this.target);

				_this.object.left = _this.left0;
				_this.object.right = _this.right0;
				_this.object.top = _this.top0;
				_this.object.bottom = _this.bottom0;

				_this.object.lookAt(_this.target);

				_this.dispatchEvent(changeEvent);

				_changed = false;
			}; // listeners


			function keydown(event) {
				if (_this.enabled === false) return;
				removeEventListener('keydown', keydown);
				_prevState = _state;

				if (_state !== STATE.NONE) {
					return;
				} else if (event.keyCode === _this.keys[STATE.ROTATE] && !_this.noRotate) {
					_state = STATE.ROTATE;
				} else if (event.keyCode === _this.keys[STATE.ZOOM] && !_this.noZoom) {
					_state = STATE.ZOOM;
				} else if (event.keyCode === _this.keys[STATE.PAN] && !_this.noPan) {
					_state = STATE.PAN;
				}
			}

			function keyup(event) {
				if (_this.enabled === false) return;
				_state = _prevState;
				addEventListener('keydown', keydown, false);
			}

			function mousedown(event) {
				if (_this.enabled === false) return;
				event.preventDefault();
				event.stopPropagation();

				if (_state === STATE.NONE) {
					_state = event.button;
				}

				if (_state === STATE.ROTATE && !_this.noRotate) ; else if (_state === STATE.ZOOM && !_this.noZoom) {
					_zoomStart.copy(getMouseOnScreen(event.pageX, event.pageY));

					_zoomEnd.copy(_zoomStart);
				} else if (_state === STATE.PAN && !_this.noPan) {
					_panStart.copy(getMouseOnScreen(event.pageX, event.pageY));

					_panEnd.copy(_panStart);
				}

				document.addEventListener('mousemove', mousemove, false);
				document.addEventListener('mouseup', mouseup, false);

				_this.dispatchEvent(startEvent);
			}

			function mousemove(event) {
				if (_this.enabled === false) return;
				event.preventDefault();
				event.stopPropagation();

				if (_state === STATE.ROTATE && !_this.noRotate) ; else if (_state === STATE.ZOOM && !_this.noZoom) {
					_zoomEnd.copy(getMouseOnScreen(event.pageX, event.pageY));
				} else if (_state === STATE.PAN && !_this.noPan) {
					_panEnd.copy(getMouseOnScreen(event.pageX, event.pageY));
				}
			}

			function mouseup(event) {
				if (_this.enabled === false) return;
				event.preventDefault();
				event.stopPropagation();
				_state = STATE.NONE;
				document.removeEventListener('mousemove', mousemove);
				document.removeEventListener('mouseup', mouseup);

				_this.dispatchEvent(endEvent);
			}

			function mousewheel(event) {
				if (_this.enabled === false) return;
				event.preventDefault();
				event.stopPropagation(); //_zoomStart.y += event.deltaY * 0.01;

				/**
				 * Watch deltaX and deltaY because in some cases, (i.e. Shift or Alt key pressed)
				 * deltaX and deltaY are inverted.
				 *
				 * It is known behaviors/shortcuts to scroll through a page horizontally.
				 */

				_this.dispatchEvent({
					type: 'OnScroll',
					delta: event.deltaX * 0.01 + event.deltaY * 0.01
				});

				_this.dispatchEvent(startEvent);

				_this.dispatchEvent(endEvent);
			}

			function touchstart(event) {
				if (_this.enabled === false) return;

				switch (event.touches.length) {
					case 1:
						_state = STATE.TOUCH_ROTATE;
						break;

					case 2:
						_state = STATE.TOUCH_ZOOM_PAN;
						var dx = event.touches[0].pageX - event.touches[1].pageX;
						var dy = event.touches[0].pageY - event.touches[1].pageY;
						_touchZoomDistanceEnd = _touchZoomDistanceStart = Math.sqrt(dx * dx + dy * dy);
						var x = (event.touches[0].pageX + event.touches[1].pageX) / 2;
						var y = (event.touches[0].pageY + event.touches[1].pageY) / 2;

						_panStart.copy(getMouseOnScreen(x, y));

						_panEnd.copy(_panStart);

						break;

					default:
						_state = STATE.NONE;
				}

				_this.dispatchEvent(startEvent);
			}

			function touchmove(event) {
				if (_this.enabled === false) return;
				event.preventDefault();
				event.stopPropagation();

				switch (event.touches.length) {
					case 1:
						break;

					case 2:
						var dx = event.touches[0].pageX - event.touches[1].pageX;
						var dy = event.touches[0].pageY - event.touches[1].pageY;
						_touchZoomDistanceEnd = Math.sqrt(dx * dx + dy * dy);
						var x = (event.touches[0].pageX + event.touches[1].pageX) / 2;
						var y = (event.touches[0].pageY + event.touches[1].pageY) / 2;

						_panEnd.copy(getMouseOnScreen(x, y));

						break;

					default:
						_state = STATE.NONE;
				}
			}

			function touchend(event) {
				if (_this.enabled === false) return;

				switch (event.touches.length) {
					case 1:
						break;

					case 2:
						_touchZoomDistanceStart = _touchZoomDistanceEnd = 0;
						var x = (event.touches[0].pageX + event.touches[1].pageX) / 2;
						var y = (event.touches[0].pageY + event.touches[1].pageY) / 2;

						_panEnd.copy(getMouseOnScreen(x, y));

						_panStart.copy(_panEnd);

						break;
				}

				_state = STATE.NONE;

				_this.dispatchEvent(endEvent);
			}

			function contextmenu(event) {
				event.preventDefault();
			}

			this.dispose = function () {
				this.domElement.removeEventListener('contextmenu', contextmenu, false);
				this.domElement.removeEventListener('mousedown', mousedown, false);
				this.domElement.removeEventListener('wheel', mousewheel, false);
				this.domElement.removeEventListener('touchstart', touchstart, false);
				this.domElement.removeEventListener('touchend', touchend, false);
				this.domElement.removeEventListener('touchmove', touchmove, false);
				removeEventListener('keydown', keydown, false);
				removeEventListener('keyup', keyup, false);
			};

			this.domElement.addEventListener('contextmenu', contextmenu, false);
			this.domElement.addEventListener('mousedown', mousedown, false);
			this.domElement.addEventListener('wheel', mousewheel, false);
			this.domElement.addEventListener('touchstart', touchstart, false);
			this.domElement.addEventListener('touchend', touchend, false);
			this.domElement.addEventListener('touchmove', touchmove, false);
			addEventListener('keydown', keydown, false);
			addEventListener('keyup', keyup, false);
			this.handleResize(); // force an update at start

			this.update();
		}

	}

	/**
	 * @author qiao / https://github.com/qiao
	 * @author mrdoob / http://mrdoob.com
	 * @author alteredq / http://alteredqualia.com/
	 * @author WestLangley / http://github.com/WestLangley
	 * @author erich666 / http://erichaines.com
	 */
	// This set of controls performs orbiting, dollying (zooming), and panning.
	// Unlike TrackballControls, it maintains the "up" direction object.up (+Y by default).
	//
	//		Orbit - left mouse / touch: one-finger move
	//		Zoom - middle mouse, or mousewheel / touch: two-finger spread or squish
	//		Pan - right mouse, or left mouse + ctrl/meta/shiftKey, or arrow keys / touch: two-finger move
	// adapted from https://github.com/mrdoob/js/blob/dev/examples/jsm/controls/OrbitControls.js

	class OrbitControls extends three.EventDispatcher {
		get center() {
			console.warn('OrbitControls: .center has been renamed to .target');
			return this.target;
		}
		/**
		 * @type {boolean}
		 */


		get noZoom() {
			console.warn('OrbitControls: .noZoom has been deprecated. Use .enableZoom instead.');
			return !this.enableZoom;
		}

		set noZoom(value) {
			console.warn('OrbitControls: .noZoom has been deprecated. Use .enableZoom instead.');
			this.enableZoom = !value;
		}
		/**
		 * @type {boolean}
		 */


		get noRotate() {
			console.warn('OrbitControls: .noRotate has been deprecated. Use .enableRotate instead.');
			return !this.enableRotate;
		}

		set noRotate(value) {
			console.warn('OrbitControls: .noRotate has been deprecated. Use .enableRotate instead.');
			this.enableRotate = !value;
		}
		/**
		 * @type {boolean}
		 */


		get noPan() {
			console.warn('OrbitControls: .noPan has been deprecated. Use .enablePan instead.');
			return !this.enablePan;
		}

		set noPan(value) {
			console.warn('OrbitControls: .noPan has been deprecated. Use .enablePan instead.');
			this.enablePan = !value;
		}
		/**
		 * @type {boolean}
		 */


		get noKeys() {
			console.warn('OrbitControls: .noKeys has been deprecated. Use .enableKeys instead.');
			return !this.enableKeys;
		}

		set noKeys(value) {
			console.warn('OrbitControls: .noKeys has been deprecated. Use .enableKeys instead.');
			this.enableKeys = !value;
		}
		/**
		 * @type {boolean}
		 */


		get staticMoving() {
			console.warn('OrbitControls: .staticMoving has been deprecated. Use .enableDamping instead.');
			return !this.enableDamping;
		}

		set staticMoving(value) {
			console.warn('OrbitControls: .staticMoving has been deprecated. Use .enableDamping instead.');
			this.enableDamping = !value;
		}
		/**
		 * @type {number}
		 */


		get dynamicDampingFactor() {
			console.warn('OrbitControls: .dynamicDampingFactor has been renamed. Use .dampingFactor instead.');
			return this.dampingFactor;
		}

		set dynamicDampingFactor(value) {
			console.warn('OrbitControls: .dynamicDampingFactor has been renamed. Use .dampingFactor instead.');
			this.dampingFactor = value;
		}

		constructor(object, domElement) {
			this.object = object;
			this.domElement = domElement !== undefined ? domElement : document; // Set to false to disable this control

			this.enabled = true; // Set to prevent default event

			this.preventDefault = true; // "target" sets the location of focus, where the object orbits around

			this.target = new three.Vector3(); // How far you can dolly in and out ( PerspectiveCamera only )

			this.minDistance = 0;
			this.maxDistance = Infinity; // How far you can zoom in and out ( OrthographicCamera only )

			this.minZoom = 0;
			this.maxZoom = Infinity; // How far you can orbit vertically, upper and lower limits.
			// Range is 0 to Math.PI radians.

			this.minPolarAngle = 0; // radians

			this.maxPolarAngle = Math.PI; // radians
			// How far you can orbit horizontally, upper and lower limits.
			// If set, must be a sub-interval of the interval [ - Math.PI, Math.PI ].

			this.minAzimuthAngle = -Infinity; // radians

			this.maxAzimuthAngle = Infinity; // radians
			// Set to true to enable damping (inertia)
			// If damping is enabled, you must call controls.update() in your animation loop

			this.enableDamping = false;
			this.dampingFactor = 0.25; // This option actually enables dollying in and out; left as "zoom" for backwards compatibility.
			// Set to false to disable zooming

			this.enableZoom = true;
			this.zoomSpeed = 1.0; // Set to false to disable rotating

			this.enableRotate = true;
			this.rotateSpeed = 1.0; // Set to false to disable panning

			this.enablePan = true;
			this.panSpeed = 1.0;
			this.screenSpacePanning = false; // if true, pan in screen-space

			this.keyPanSpeed = 7.0; // pixels moved per arrow key push
			// Set to true to automatically rotate around the target
			// If auto-rotate is enabled, you must call controls.update() in your animation loop

			this.autoRotate = false;
			this.autoRotateSpeed = 2.0; // 30 seconds per round when fps is 60
			// Set to false to disable use of the keys

			this.enableKeys = true; // The four arrow keys

			this.keys = {
				LEFT: 37,
				UP: 38,
				RIGHT: 39,
				BOTTOM: 40
			}; // Mouse buttons

			this.mouseButtons = {
				LEFT: three.MOUSE.LEFT,
				MIDDLE: three.MOUSE.MIDDLE,
				RIGHT: three.MOUSE.RIGHT
			}; // for reset

			this.target0 = this.target.clone();
			this.position0 = this.object.position.clone();
			this.zoom0 = this.object.zoom; //
			// public methods
			//

			this.getPolarAngle = function () {
				return spherical.phi;
			};

			this.getAzimuthalAngle = function () {
				return spherical.theta;
			};

			this.saveState = function () {
				scope.target0.copy(scope.target);
				scope.position0.copy(scope.object.position);
				scope.zoom0 = scope.object.zoom;
			};

			this.reset = function () {
				scope.target.copy(scope.target0);
				scope.object.position.copy(scope.position0);
				scope.object.zoom = scope.zoom0;
				scope.object.updateProjectionMatrix();
				scope.dispatchEvent(changeEvent);
				scope.update();
				state = STATE.NONE;
			}; // this method is there to match the Trackball API


			this.handleResize = function () {}; // this method is exposed, but perhaps it would be better if we can make it private...


			this.update = function () {
				var offset = new three.Vector3(); // so camera.up is the orbit axis

				var quat = new three.Quaternion().setFromUnitVectors(object.up, new three.Vector3(0, 1, 0));
				var quatInverse = quat.clone().inverse();
				var lastPosition = new three.Vector3();
				var lastQuaternion = new three.Quaternion();
				return function update() {
					var position = scope.object.position;
					offset.copy(position).sub(scope.target); // rotate offset to "y-axis-is-up" space

					offset.applyQuaternion(quat); // angle from z-axis around y-axis

					spherical.setFromVector3(offset);

					if (scope.autoRotate && state === STATE.NONE) {
						rotateLeft(getAutoRotationAngle());
					}

					spherical.theta += sphericalDelta.theta;
					spherical.phi += sphericalDelta.phi; // restrict theta to be between desired limits

					spherical.theta = Math.max(scope.minAzimuthAngle, Math.min(scope.maxAzimuthAngle, spherical.theta)); // restrict phi to be between desired limits

					spherical.phi = Math.max(scope.minPolarAngle, Math.min(scope.maxPolarAngle, spherical.phi));
					spherical.makeSafe();
					spherical.radius *= scale; // restrict radius to be between desired limits

					spherical.radius = Math.max(scope.minDistance, Math.min(scope.maxDistance, spherical.radius)); // move target to panned location

					scope.target.add(panOffset);
					offset.setFromSpherical(spherical); // rotate offset back to "camera-up-vector-is-up" space

					offset.applyQuaternion(quatInverse);
					position.copy(scope.target).add(offset);
					scope.object.lookAt(scope.target);

					if (scope.enableDamping === true) {
						sphericalDelta.theta *= 1 - scope.dampingFactor;
						sphericalDelta.phi *= 1 - scope.dampingFactor;
						panOffset.multiplyScalar(1 - scope.dampingFactor);
					} else {
						sphericalDelta.set(0, 0, 0);
						panOffset.set(0, 0, 0);
					}

					scale = 1; // update condition is:
					// min(camera displacement, camera rotation in radians)^2 > EPS
					// using small-angle approximation cos(x/2) = 1 - x^2 / 8

					if (zoomChanged || lastPosition.distanceToSquared(scope.object.position) > EPS || 8 * (1 - lastQuaternion.dot(scope.object.quaternion)) > EPS) {
						scope.dispatchEvent(changeEvent);
						lastPosition.copy(scope.object.position);
						lastQuaternion.copy(scope.object.quaternion);
						zoomChanged = false;
						return true;
					}

					return false;
				};
			}();

			this.dispose = function () {
				scope.domElement.removeEventListener('contextmenu', onContextMenu, false);
				scope.domElement.removeEventListener('mousedown', onMouseDown, false);
				scope.domElement.removeEventListener('wheel', onMouseWheel, false);
				scope.domElement.removeEventListener('touchstart', onTouchStart, false);
				scope.domElement.removeEventListener('touchend', onTouchEnd, false);
				scope.domElement.removeEventListener('touchmove', onTouchMove, false);
				document.removeEventListener('mousemove', onMouseMove, false);
				document.removeEventListener('mouseup', onMouseUp, false);
				removeEventListener('keydown', onKeyDown, false); //scope.dispatchEvent( { type: 'dispose' } ); // should this be added here?
			}; //
			// internals
			//


			var scope = this;
			var changeEvent = {
				type: 'change'
			};
			var startEvent = {
				type: 'start'
			};
			var endEvent = {
				type: 'end'
			};
			var STATE = {
				NONE: -1,
				ROTATE: 0,
				DOLLY: 1,
				PAN: 2,
				TOUCH_ROTATE: 3,
				TOUCH_DOLLY_PAN: 4
			};
			var state = STATE.NONE;
			var EPS = 0.000001; // current position in spherical coordinates

			var spherical = new three.Spherical();
			var sphericalDelta = new three.Spherical();
			var scale = 1;
			var panOffset = new three.Vector3();
			var zoomChanged = false;
			var rotateStart = new three.Vector2();
			var rotateEnd = new three.Vector2();
			var rotateDelta = new three.Vector2();
			var panStart = new three.Vector2();
			var panEnd = new three.Vector2();
			var panDelta = new three.Vector2();
			var dollyStart = new three.Vector2();
			var dollyEnd = new three.Vector2();
			var dollyDelta = new three.Vector2();

			function getAutoRotationAngle() {
				return 2 * Math.PI / 60 / 60 * scope.autoRotateSpeed;
			}

			function getZoomScale() {
				return Math.pow(0.95, scope.zoomSpeed);
			}

			function rotateLeft(angle) {
				sphericalDelta.theta -= angle;
			}

			function rotateUp(angle) {
				sphericalDelta.phi -= angle;
			}

			var panLeft = function () {
				var v = new three.Vector3();
				return function panLeft(distance, objectMatrix) {
					v.setFromMatrixColumn(objectMatrix, 0); // get X column of objectMatrix

					v.multiplyScalar(-distance);
					panOffset.add(v);
				};
			}();

			var panUp = function () {
				var v = new three.Vector3();
				return function panUp(distance, objectMatrix) {
					if (scope.screenSpacePanning === true) {
						v.setFromMatrixColumn(objectMatrix, 1);
					} else {
						v.setFromMatrixColumn(objectMatrix, 0);
						v.crossVectors(scope.object.up, v);
					}

					v.multiplyScalar(distance);
					panOffset.add(v);
				};
			}(); // deltaX and deltaY are in pixels; right and down are positive


			var pan = function () {
				var offset = new three.Vector3();
				return function pan(deltaX, deltaY) {
					var element = scope.domElement === document ? scope.domElement.body : scope.domElement;

					if (scope.object.isPerspectiveCamera) {
						// perspective
						var position = scope.object.position;
						offset.copy(position).sub(scope.target);
						var targetDistance = offset.length(); // half of the fov is center to top of screen

						targetDistance *= Math.tan(scope.object.fov / 2 * Math.PI / 180.0); // we use only clientHeight here so aspect ratio does not distort speed

						panLeft(2 * deltaX * targetDistance / element.clientHeight, scope.object.matrix);
						panUp(2 * deltaY * targetDistance / element.clientHeight, scope.object.matrix);
					} else if (scope.object.isOrthographicCamera) {
						// orthographic
						panLeft(deltaX * (scope.object.right - scope.object.left) / scope.object.zoom / element.clientWidth, scope.object.matrix);
						panUp(deltaY * (scope.object.top - scope.object.bottom) / scope.object.zoom / element.clientHeight, scope.object.matrix);
					} else {
						// camera neither orthographic nor perspective
						console.warn('WARNING: OrbitControls.js encountered an unknown camera type - pan disabled.');
						scope.enablePan = false;
					}
				};
			}();

			function dollyIn(dollyScale) {
				if (scope.object.isPerspectiveCamera) {
					scale /= dollyScale;
				} else if (scope.object.isOrthographicCamera) {
					scope.object.zoom = Math.max(scope.minZoom, Math.min(scope.maxZoom, scope.object.zoom * dollyScale));
					scope.object.updateProjectionMatrix();
					zoomChanged = true;
				} else {
					console.warn('WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled.');
					scope.enableZoom = false;
				}
			}

			function dollyOut(dollyScale) {
				if (scope.object.isPerspectiveCamera) {
					scale *= dollyScale;
				} else if (scope.object.isOrthographicCamera) {
					scope.object.zoom = Math.max(scope.minZoom, Math.min(scope.maxZoom, scope.object.zoom / dollyScale));
					scope.object.updateProjectionMatrix();
					zoomChanged = true;
				} else {
					console.warn('WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled.');
					scope.enableZoom = false;
				}
			} //
			// event callbacks - update the object state
			//


			function handleMouseDownRotate(event) {
				//console.log( 'handleMouseDownRotate' );
				rotateStart.set(event.clientX, event.clientY);
			}

			function handleMouseDownDolly(event) {
				//console.log( 'handleMouseDownDolly' );
				dollyStart.set(event.clientX, event.clientY);
			}

			function handleMouseDownPan(event) {
				//console.log( 'handleMouseDownPan' );
				panStart.set(event.clientX, event.clientY);
			}

			function handleMouseMoveRotate(event) {
				//console.log( 'handleMouseMoveRotate' );
				rotateEnd.set(event.clientX, event.clientY);
				rotateDelta.subVectors(rotateEnd, rotateStart).multiplyScalar(scope.rotateSpeed);
				var element = scope.domElement === document ? scope.domElement.body : scope.domElement;
				rotateLeft(2 * Math.PI * rotateDelta.x / element.clientHeight); // yes, height

				rotateUp(2 * Math.PI * rotateDelta.y / element.clientHeight);
				rotateStart.copy(rotateEnd);
				scope.update();
			}

			function handleMouseMoveDolly(event) {
				//console.log( 'handleMouseMoveDolly' );
				dollyEnd.set(event.clientX, event.clientY);
				dollyDelta.subVectors(dollyEnd, dollyStart);

				if (dollyDelta.y > 0) {
					dollyIn(getZoomScale());
				} else if (dollyDelta.y < 0) {
					dollyOut(getZoomScale());
				}

				dollyStart.copy(dollyEnd);
				scope.update();
			}

			function handleMouseMovePan(event) {
				//console.log( 'handleMouseMovePan' );
				panEnd.set(event.clientX, event.clientY);
				panDelta.subVectors(panEnd, panStart).multiplyScalar(scope.panSpeed);
				pan(panDelta.x, panDelta.y);
				panStart.copy(panEnd);
				scope.update();
			}

			function handleMouseWheel(event) {
				// console.log( 'handleMouseWheel' );
				if (event.deltaY < 0) {
					dollyOut(getZoomScale());
				} else if (event.deltaY > 0) {
					dollyIn(getZoomScale());
				}

				scope.update();
			}

			function handleKeyDown(event) {
				//console.log( 'handleKeyDown' );
				switch (event.keyCode) {
					case scope.keys.UP:
						pan(0, scope.keyPanSpeed);
						scope.update();
						break;

					case scope.keys.BOTTOM:
						pan(0, -scope.keyPanSpeed);
						scope.update();
						break;

					case scope.keys.LEFT:
						pan(scope.keyPanSpeed, 0);
						scope.update();
						break;

					case scope.keys.RIGHT:
						pan(-scope.keyPanSpeed, 0);
						scope.update();
						break;
				}
			}

			function handleTouchStartRotate(event) {
				//console.log( 'handleTouchStartRotate' );
				rotateStart.set(event.touches[0].pageX, event.touches[0].pageY);
			}

			function handleTouchStartDollyPan(event) {
				//console.log( 'handleTouchStartDollyPan' );
				if (scope.enableZoom) {
					var dx = event.touches[0].pageX - event.touches[1].pageX;
					var dy = event.touches[0].pageY - event.touches[1].pageY;
					var distance = Math.sqrt(dx * dx + dy * dy);
					dollyStart.set(0, distance);
				}

				if (scope.enablePan) {
					var x = 0.5 * (event.touches[0].pageX + event.touches[1].pageX);
					var y = 0.5 * (event.touches[0].pageY + event.touches[1].pageY);
					panStart.set(x, y);
				}
			}

			function handleTouchMoveRotate(event) {
				//console.log( 'handleTouchMoveRotate' );
				rotateEnd.set(event.touches[0].pageX, event.touches[0].pageY);
				rotateDelta.subVectors(rotateEnd, rotateStart).multiplyScalar(scope.rotateSpeed);
				var element = scope.domElement === document ? scope.domElement.body : scope.domElement;
				rotateLeft(2 * Math.PI * rotateDelta.x / element.clientHeight); // yes, height

				rotateUp(2 * Math.PI * rotateDelta.y / element.clientHeight);
				rotateStart.copy(rotateEnd);
				scope.update();
			}

			function handleTouchMoveDollyPan(event) {
				//console.log( 'handleTouchMoveDollyPan' );
				if (scope.enableZoom) {
					var dx = event.touches[0].pageX - event.touches[1].pageX;
					var dy = event.touches[0].pageY - event.touches[1].pageY;
					var distance = Math.sqrt(dx * dx + dy * dy);
					dollyEnd.set(0, distance);
					dollyDelta.set(0, Math.pow(dollyEnd.y / dollyStart.y, scope.zoomSpeed));
					dollyIn(dollyDelta.y);
					dollyStart.copy(dollyEnd);
				}

				if (scope.enablePan) {
					var x = 0.5 * (event.touches[0].pageX + event.touches[1].pageX);
					var y = 0.5 * (event.touches[0].pageY + event.touches[1].pageY);
					panEnd.set(x, y);
					panDelta.subVectors(panEnd, panStart).multiplyScalar(scope.panSpeed);
					pan(panDelta.x, panDelta.y);
					panStart.copy(panEnd);
				}

				scope.update();
			}
			// event handlers - FSM: listen for events and reset state
			//


			function onMouseDown(event) {
				if (scope.enabled === false) return;
				if (scope.preventDefault === true) event.preventDefault();

				switch (event.button) {
					case scope.mouseButtons.LEFT:
						if (event.ctrlKey || event.metaKey || event.shiftKey) {
							if (scope.enablePan === false) return;
							handleMouseDownPan(event);
							state = STATE.PAN;
						} else {
							if (scope.enableRotate === false) return;
							handleMouseDownRotate(event);
							state = STATE.ROTATE;
						}

						break;

					case scope.mouseButtons.MIDDLE:
						if (scope.enableZoom === false) return;
						handleMouseDownDolly(event);
						state = STATE.DOLLY;
						break;

					case scope.mouseButtons.RIGHT:
						if (scope.enablePan === false) return;
						handleMouseDownPan(event);
						state = STATE.PAN;
						break;
				}

				if (state !== STATE.NONE) {
					document.addEventListener('mousemove', onMouseMove, false);
					document.addEventListener('mouseup', onMouseUp, false);
					scope.dispatchEvent(startEvent);
				}
			}

			function onMouseMove(event) {
				if (scope.enabled === false) return;
				if (scope.preventDefault === true) event.preventDefault();

				switch (state) {
					case STATE.ROTATE:
						if (scope.enableRotate === false) return;
						handleMouseMoveRotate(event);
						break;

					case STATE.DOLLY:
						if (scope.enableZoom === false) return;
						handleMouseMoveDolly(event);
						break;

					case STATE.PAN:
						if (scope.enablePan === false) return;
						handleMouseMovePan(event);
						break;
				}
			}

			function onMouseUp(event) {
				if (scope.enabled === false) return;
				document.removeEventListener('mousemove', onMouseMove, false);
				document.removeEventListener('mouseup', onMouseUp, false);
				scope.dispatchEvent(endEvent);
				state = STATE.NONE;
			}

			function onMouseWheel(event) {
				if (scope.enabled === false || scope.enableZoom === false || state !== STATE.NONE && state !== STATE.ROTATE) return;

				if (scope.preventDefault === true) {
					event.preventDefault();
					event.stopPropagation();
				}

				scope.dispatchEvent(startEvent);
				handleMouseWheel(event);
				scope.dispatchEvent(endEvent);
			}

			function onKeyDown(event) {
				if (scope.enabled === false || scope.enableKeys === false || scope.enablePan === false) return;
				handleKeyDown(event);
			}

			function onTouchStart(event) {
				if (scope.enabled === false) return;
				if (scope.preventDefault === true) event.preventDefault();

				switch (event.touches.length) {
					case 1:
						// one-fingered touch: rotate
						if (scope.enableRotate === false) return;
						handleTouchStartRotate(event);
						state = STATE.TOUCH_ROTATE;
						break;

					case 2:
						// two-fingered touch: dolly-pan
						if (scope.enableZoom === false && scope.enablePan === false) return;
						handleTouchStartDollyPan(event);
						state = STATE.TOUCH_DOLLY_PAN;
						break;

					default:
						state = STATE.NONE;
				}

				if (state !== STATE.NONE) {
					scope.dispatchEvent(startEvent);
				}
			}

			function onTouchMove(event) {
				if (scope.enabled === false) return;

				if (scope.preventDefault === true) {
					event.preventDefault();
					event.stopPropagation();
				}

				switch (event.touches.length) {
					case 1:
						// one-fingered touch: rotate
						if (scope.enableRotate === false) return;
						if (state !== STATE.TOUCH_ROTATE) return; // is this needed?

						handleTouchMoveRotate(event);
						break;

					case 2:
						// two-fingered touch: dolly-pan
						if (scope.enableZoom === false && scope.enablePan === false) return;
						if (state !== STATE.TOUCH_DOLLY_PAN) return; // is this needed?

						handleTouchMoveDollyPan(event);
						break;

					default:
						state = STATE.NONE;
				}
			}

			function onTouchEnd(event) {
				if (scope.enabled === false) return;
				scope.dispatchEvent(endEvent);
				state = STATE.NONE;
			}

			function onContextMenu(event) {
				if (scope.enabled === false) return;
				if (scope.preventDefault === true) event.preventDefault();
			} //


			scope.domElement.addEventListener('contextmenu', onContextMenu, false);
			scope.domElement.addEventListener('mousedown', onMouseDown, false);
			scope.domElement.addEventListener('wheel', onMouseWheel, false);
			scope.domElement.addEventListener('touchstart', onTouchStart, false);
			scope.domElement.addEventListener('touchend', onTouchEnd, false);
			scope.domElement.addEventListener('touchmove', onTouchMove, false);
			addEventListener('keydown', onKeyDown, false); // force an update at start

			this.update();
		}

	}

	const COLORS = {
		blue: '#00B0FF',
		yellow: '#FFEB3B',
		red: '#F50057',
		green: '#76FF03',
		white: '#FFF',
		lightRed: '#F77'
	};
	/**
	 * Colors utility functions
	 */

	class Colors {
		/**
		 * Convert LAB to XYZ
		 * http://www.easyrgb.com/index.php?X=MATH&H=08#text8
		 *
		 * @param {*} l
		 * @param {*} a
		 * @param {*} b
		 *
		 * @return {*}
		 */
		static cielab2XYZ(l, a, b) {
			// https://www.mathworks.com/help/images/ref/whitepoint.html
			// d65: 0.9504, 1, 1.0888
			const refX = 95.047;
			const refY = 100.0;
			const refZ = 108.883;
			let y = (l + 16) / 116;
			let x = a / 500 + y;
			let z = y - b / 200;

			if (Math.pow(y, 3) > 0.008856) {
				y = Math.pow(y, 3);
			} else {
				y = (y - 16 / 116) / 7.787;
			}

			if (Math.pow(x, 3) > 0.008856) {
				x = Math.pow(x, 3);
			} else {
				x = (x - 16 / 116) / 7.787;
			}

			if (Math.pow(z, 3) > 0.008856) {
				z = Math.pow(z, 3);
			} else {
				z = (z - 16 / 116) / 7.787;
			}

			return [refX * x, refY * y, refZ * z];
		}
		/**
		 * Convert XYZ to RGB space
		 *
		 * @param {*} x
		 * @param {*} y
		 * @param {*} z
		 *
		 * @return {*}
		 */


		static xyz2RGB(x, y, z) {
			x /= 100;
			y /= 100;
			z /= 100;
			let r = x * 3.2406 + y * -1.5372 + z * -0.4986;
			let g = x * -0.9689 + y * 1.8758 + z * 0.0415;
			let b = x * 0.0557 + y * -0.204 + z * 1.057;

			if (r > 0.0031308) {
				r = 1.055 * Math.pow(r, 1 / 2.4) - 0.055;
			} else {
				r = 12.92 * r;
			}

			if (g > 0.0031308) {
				g = 1.055 * Math.pow(g, 1 / 2.4) - 0.055;
			} else {
				g = 12.92 * g;
			}

			if (b > 0.0031308) {
				b = 1.055 * Math.pow(b, 1 / 2.4) - 0.055;
			} else {
				b = 12.92 * b;
			}

			r = r * 255;
			g = g * 255;
			b = b * 255;
			return [r, g, b];
		}
		/**
		 * Convert LAB to RGB
		 *
		 * @param {*} l
		 * @param {*} a
		 * @param {*} b
		 *
		 * @return {*}
		 */


		static cielab2RGB(l = 50, a = 0, b = 0) {
			if (!(l >= 0 && l <= 100)) {
				return null;
			}

			const [x, y, z] = this.cielab2XYZ(l, a, b);
			return this.xyz2RGB(x, y, z);
		}

	}

	/**
	 *
	 * It is typically used for creating an irregular 3D planar shape given a box and the cut-plane.
	 *
	 * Demo: {@link https://fnndsc.github.io/vjs#geometry_slice}
	 *
	 * @module geometries/slice
	 *
	 * @param {Vector3} halfDimensions - Half-dimensions of the box to be sliced.
	 * @param {Vector3} center - Center of the box to be sliced.
	 * @param {Vector3<Vector3>} orientation - Orientation of the box to be sliced. (might not be necessary..?)
	 * @param {Vector3} position - Position of the cutting plane.
	 * @param {Vector3} direction - Cross direction of the cutting plane.
	 *
	 * @example
	 * // Define box to be sliced
	 * let halfDimensions = new THREE.Vector(123, 45, 67);
	 * let center = new Vector3(0, 0, 0);
	 * let orientation = new Vector3(
	 *	 new Vector3(1, 0, 0),
	 *	 new Vector3(0, 1, 0),
	 *	 new Vector3(0, 0, 1)
	 * );
	 *
	 * // Define slice plane
	 * let position = center.clone();
	 * let direction = new Vector3(-0.2, 0.5, 0.3);
	 *
	 * // Create the slice geometry & materials
	 * let sliceGeometry = new VJS.geometries.slice(halfDimensions, center, orientation, position, direction);
	 * let sliceMaterial = new THREE.MeshBasicMaterial({
	 *	 'side': THREE.DoubleSide,
	 *	 'color': 0xFF5722
	 * });
	 *
	 *	// Create mesh and add it to the scene
	 *	let slice = new THREE.Mesh(sliceGeometry, sliceMaterial);
	 *	scene.add(slice);
	 */

	class geometriesSlice extends three.ShapeBufferGeometry {
		constructor(halfDimensions, center, position, direction, toAABB = new three.Matrix4()) {
			//
			// prepare data for the shape!
			//
			let aabb = {
				halfDimensions,
				center,
				toAABB
			};
			let plane = {
				position,
				direction
			}; // BOOM!

			let intersections = Intersections.aabbPlane(aabb, plane); // can not exist before calling the constructor

			if (intersections.length < 3) {
				console.log('WARNING: Less than 3 intersections between AABB and Plane.');
				console.log('AABB');
				console.log(aabb);
				console.log('Plane');
				console.log(plane);
				console.log('exiting...');
				const err = new Error('geometries.slice has less than 3 intersections, can not create a valid geometry.');
				throw err;
			}

			let points = CoreUtils.orderIntersections(intersections, direction); // create the shape

			let shape = new three.Shape(); // move to first point!

			shape.moveTo(points[0].xy.x, points[0].xy.y); // loop through all points!

			const positions = new Float32Array(points.length * 3);
			positions.set(points[0].toArray(), 0);

			for (let i = 1; i < points.length; i++) {
				// project each on plane!
				positions.set(points[i].toArray(), i * 3);
				shape.lineTo(points[i].xy.x, points[i].xy.y);
			} // close the shape!


			shape.lineTo(points[0].xy.x, points[0].xy.y); //
			// Generate Slice Buffer Geometry from Shape Buffer Geomtry
			// bewcause it does triangulation for us!

			super(shape);
			this.type = 'SliceBufferGeometry'; // update real position of each vertex! (not in 2d)

			this.setAttribute('position', new three.Float32BufferAttribute(positions, 3));
			this.vertices = points; // legacy code to compute normals int he SliceHelper
		}

	}

	/**
	 *
	 * @module geometries/voxel
	 */

	class geometriesVoxel extends three.BoxGeometry {
		constructor(dataPosition) {
			super(1, 1, 1);
			this._location = dataPosition;
			this.applyMatrix(new three.Matrix4().makeTranslation(this._location.x, this._location.y, this._location.z));
			this.verticesNeedUpdate = true;
		}

		resetVertices() {
			this.vertices[0].set(0.5, 0.5, 0.5);
			this.vertices[1].set(0.5, 0.5, -0.5);
			this.vertices[2].set(0.5, -0.5, 0.5);
			this.vertices[3].set(0.5, -0.5, -0.5);
			this.vertices[4].set(-0.5, 0.5, -0.5);
			this.vertices[5].set(-0.5, 0.5, 0.5);
			this.vertices[6].set(-0.5, -0.5, -0.5);
			this.vertices[7].set(-0.5, -0.5, 0.5);
		}

		set location(location) {
			this._location = location; // update vertices from location

			this.vertices[0].set(+0.5, +0.5, +0.5);
			this.vertices[1].set(+0.5, +0.5, -0.5);
			this.vertices[2].set(+0.5, -0.5, +0.5);
			this.vertices[3].set(+0.5, -0.5, -0.5);
			this.vertices[4].set(-0.5, +0.5, -0.5);
			this.vertices[5].set(-0.5, +0.5, +0.5);
			this.vertices[6].set(-0.5, -0.5, -0.5);
			this.vertices[7].set(-0.5, -0.5, +0.5);
			this.applyMatrix(new three.Matrix4().makeTranslation(this._location.x, this._location.y, this._location.z));
			this.verticesNeedUpdate = true;
		}

		get location() {
			return this._location;
		}

	}

	/**
	 * @module helpers/border
	 */

	class helpersBorder extends three.Object3D {
		constructor(helpersSlice) {
			//
			super();
			this._helpersSlice = helpersSlice;
			this._visible = true;
			this._color = 0xff0000;
			this._material = null;
			this._geometry = null;
			this._mesh = null;

			this._create();
		}

		set helpersSlice(helpersSlice) {
			this._helpersSlice = helpersSlice;

			this._update();
		}

		get helpersSlice() {
			return this._helpersSlice;
		}

		set visible(visible) {
			this._visible = visible;

			if (this._mesh) {
				this._mesh.visible = this._visible;
			}
		}

		get visible() {
			return this._visible;
		}

		set color(color) {
			this._color = color;

			if (this._material) {
				this._material.color.set(this._color);
			}
		}

		get color() {
			return this._color;
		}

		_create() {
			if (!this._material) {
				this._material = new three.LineBasicMaterial({
					color: this._color,
					linewidth: 1
				});
			}

			if (!this._helpersSlice.geometry.vertices) {
				return;
			}

			this._geometry = new three.BufferGeometry(); // set vertices positions

			const nbOfVertices = this._helpersSlice.geometry.vertices.length;
			const positions = new Float32Array((nbOfVertices + 1) * 3);
			positions.set(this._helpersSlice.geometry.attributes.position.array, 0);
			positions.set(this._helpersSlice.geometry.vertices[0].toArray(), nbOfVertices * 3);

			this._geometry.setAttribute('position', new three.Float32BufferAttribute(positions, 3));

			this._mesh = new three.Line(this._geometry, this._material);

			if (this._helpersSlice.aabbSpace === 'IJK') {
				this._mesh.applyMatrix4(this._helpersSlice.stack.ijk2LPS);
			}

			this._mesh.visible = this._visible; // and add it!

			this.add(this._mesh);
		}

		_update() {
			// update slice
			if (this._mesh) {
				this.remove(this._mesh);

				this._mesh.geometry.dispose();

				this._mesh = null;
			}

			this._create();
		}

		dispose() {
			this._mesh.material.dispose();

			this._mesh.material = null;

			this._geometry.dispose();

			this._geometry = null;

			this._material.dispose();

			this._material = null;
		}

	}

	/**
	 * @module helpers/boundingbox
	 */

	class helpersBoundingBox extends three.Object3D {
		constructor(stack) {
			//
			super(); // private vars

			this._stack = stack;
			this._visible = true;
			this._color = 0xffffff;
			this._material = null;
			this._geometry = null;
			this._mesh = null;
			this._meshStack = null; // create object

			this._create();
		} // getters/setters


		set visible(visible) {
			this._visible = visible;

			if (this._mesh) {
				this._mesh.visible = this._visible;
			}
		}

		get visible() {
			return this._visible;
		}

		set color(color) {
			this._color = color;

			if (this._material) {
				this._material.color.set(this._color);
			}
		}

		get color() {
			return this._color;
		} // private methods


		_create() {
			// Convenience vars
			const dimensions = this._stack.dimensionsIJK;
			const halfDimensions = this._stack.halfDimensionsIJK;
			const offset = new three.Vector3(-0.5, -0.5, -0.5); // Geometry

			const geometry = new three.BoxGeometry(dimensions.x, dimensions.y, dimensions.z);
			geometry.applyMatrix4(new three.Matrix4().makeTranslation(halfDimensions.x + offset.x, halfDimensions.y + offset.y, halfDimensions.z + offset.z));
			this._geometry = geometry; // Material

			this._material = new three.MeshBasicMaterial({
				wireframe: true
			});
			const mesh = new three.Mesh(this._geometry, null);
			mesh.applyMatrix4(this._stack.ijk2LPS);
			mesh.visible = this._visible;
			this._meshStack = mesh;
			this._mesh = new three.BoxHelper(this._meshStack, this._color);
			this._material = this._mesh.material;
			this.add(this._mesh);
		}

		_update() {
			if (this._mesh) {
				this.remove(this._mesh);

				this._mesh.geometry.dispose();

				this._mesh.geometry = null;

				this._mesh.material.dispose();

				this._mesh.material = null;
				this._mesh = null;
			}

			this._create();
		}

		dispose() {
			this._mesh.material.dispose();

			this._mesh.material = null;

			this._geometry.dispose();

			this._geometry = null;

			this._material.dispose();

			this._material = null;
		}

	}

	/**
	 * @module shaders/data
	 */
	class ShadersUniform$4 {
		static uniforms() {
			return {
				uCanvasWidth: {
					type: 'f',
					value: 0,
					typeGLSL: 'float'
				},
				uCanvasHeight: {
					type: 'f',
					value: 0,
					typeGLSL: 'float'
				},
				uWidth: {
					type: 'f',
					value: 1,
					typeGLSL: 'float'
				},
				uOpacity: {
					type: 'f',
					value: 1,
					typeGLSL: 'float'
				},
				uTextureFilled: {
					type: 't',
					value: [],
					typeGLSL: 'sampler2D'
				}
			};
		}

	}

	class ShadersVertex$4 {
		compute() {
			return `
varying vec4 vProjectedCoords;

//
// main
//
void main() {

	vec4 vPos = modelMatrix * vec4(position, 1.0 );
	mat4 vProjectionViewMatrix = projectionMatrix * viewMatrix;
	vProjectedCoords =	projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
	gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0 );

}
				`;
		}

	}

	class ShadersFragment$4 {
		// pass uniforms object
		constructor(uniforms) {
			this._uniforms = uniforms;
			this._functions = {};
			this._main = '';
		}

		functions() {
			if (this._main === '') {
				// if main is empty, functions can not have been computed
				this.main();
			}

			let content = '';

			for (let property in this._functions) {
				content += this._functions[property] + '\n';
			}

			return content;
		}

		uniforms() {
			let content = '';

			for (let property in this._uniforms) {
				let uniform = this._uniforms[property];
				content += `uniform ${uniform.typeGLSL} ${property}`;

				if (uniform && uniform.length) {
					content += `[${uniform.length}]`;
				}

				content += ';\n';
			}

			return content;
		}

		main() {
			// need to pre-call main to fill up the functions list
			this._main = `

float luma (vec3 rgb) {
	return (rgb.r + rgb.g + rgb.b)/3.0;
}

const float T = 0.04;
const float M = 1.0;
const float L = 0.002;

void main(void) {

	vec2 texCoord = vec2(((vProjectedCoords.x / vProjectedCoords.w) + 1.0 ) / 2.0,
								((vProjectedCoords.y / vProjectedCoords.w) + 1.0 ) / 2.0 );

	float borderWidth = uWidth; // in px
	float step_u = borderWidth * 1.0 / uCanvasWidth;
	float step_v = borderWidth * 1.0 / uCanvasHeight;
	vec4 centerPixel = texture2D(uTextureFilled, texCoord);

	vec4 rightPixel	= texture2D(uTextureFilled, texCoord + vec2(step_u, 0.0));
	vec4 bottomPixel = texture2D(uTextureFilled, texCoord + vec2(0.0, step_v));

	// now manually compute the derivatives
	float _dFdX = length(rightPixel - centerPixel) / step_u;
	float _dFdY = length(bottomPixel - centerPixel) / step_v;

	// gl_FragColor.r = _dFdX;
	// gl_FragColor.g = _dFdY;
	gl_FragColor.r = max(max(centerPixel.r, rightPixel.r), bottomPixel.r);
	gl_FragColor.g = max(max(centerPixel.g, rightPixel.g), bottomPixel.g);
	gl_FragColor.b = max(max(centerPixel.b, rightPixel.b), bottomPixel.b);
	float maxDerivative = max(_dFdX, _dFdY);
	float clampedDerivative = clamp(maxDerivative, 0., 1.);
	gl_FragColor.a = uOpacity * clampedDerivative;

	return;
	// float h = 1./uCanvasHeight;
	// float w = 1./uCanvasWidth;
	// vec4 n[9];
	// n[0] = texture2D(uTextureFilled, vProjectedTextCoords + vec2( -w, -h));
	// n[1] = texture2D(uTextureFilled, vProjectedTextCoords + vec2(0.0, -h));
	// n[2] = texture2D(uTextureFilled, vProjectedTextCoords + vec2(	w, -h));
	// n[3] = texture2D(uTextureFilled, vProjectedTextCoords + vec2( -w, 0.0));
	// n[4] = texture2D(uTextureFilled, vProjectedTextCoords);
	// n[5] = texture2D(uTextureFilled, texCoord + vec2(	w, 0.0));
	// n[6] = texture2D(uTextureFilled, texCoord + vec2( -w, h));
	// n[7] = texture2D(uTextureFilled, texCoord + vec2(0.0, h));
	// n[8] = texture2D(uTextureFilled, texCoord + vec2(	w, h));
	// vec4 sobel_horizEdge = n[2] + (2.0*n[5]) + n[8] - (n[0] + (2.0*n[3]) + n[6]);
	// vec4 sobel_vertEdge	= n[0] + (2.0*n[1]) + n[2] - (n[6] + (2.0*n[7]) + n[8]);
	// vec3 sobel = sqrt((sobel_horizEdge.rgb * sobel_horizEdge.rgb) + (sobel_vertEdge.rgb * sobel_vertEdge.rgb));
	// gl_FragColor = vec4( sobel, max(max(sobel.r, sobel.g), sobel.b) );

	// return;
}
	 `;
		}

		compute() {
			// shaderInterpolation.functions(args)

			return `
// uniforms
${this.uniforms()}

// varying (should fetch it from vertex directly)
varying vec4			vProjectedCoords;

// tailored functions
${this.functions()}

// main loop
${this._main}
			`;
		}

	}

	/** * Imports ***/
	/**
	 * @module helpers/contour
	 */

	class helpersContour extends three.Object3D {
		constructor(stack, geometry, texture) {
			//
			super();
			this._stack = stack;
			this._textureToFilter = texture;
			this._contourWidth = 1;
			this._contourOpacity = 1;
			this._canvasWidth = 0;
			this._canvasHeight = 0;
			this._shadersFragment = ShadersFragment$4;
			this._shadersVertex = ShadersVertex$4;
			this._uniforms = ShadersUniform$4.uniforms();
			this._material = null;
			this._geometry = geometry;

			this._create();
		}

		_create() {
			this._prepareMaterial();

			this._mesh = new three.Mesh(this._geometry, this._material);

			this._mesh.applyMatrix4(this._stack._ijk2LPS);

			this.add(this._mesh);
		}

		_prepareMaterial() {
			if (!this._material) {
				// contour default width
				this._uniforms.uWidth.value = this._contourWidth;
				this._uniforms.uOpacity.value = this._contourOpacity; //

				this._uniforms.uCanvasWidth.value = this._canvasWidth;
				this._uniforms.uCanvasHeight.value = this._canvasHeight; // generate material

				let fs = new ShadersFragment$4(this._uniforms);
				let vs = new ShadersVertex$4();
				this._material = new three.ShaderMaterial({
					side: three.DoubleSide,
					uniforms: this._uniforms,
					vertexShader: vs.compute(),
					fragmentShader: fs.compute(),
					transparent: true
				});
			}
		}

		update() {
			if (this._mesh) {
				this.remove(this._mesh);

				this._mesh.geometry.dispose();

				this._mesh.geometry = null;
				this._mesh = null;
			}

			this._create();
		}

		dispose() {
			//
			if (this._textureToFilter !== null) {
				this._textureToFilter.dispose();

				this._textureToFilter = null;
			}

			this._shadersFragment = null;
			this._shadersVertex = null;
			this._uniforms = null; // material, geometry and mesh

			this.remove(this._mesh);

			this._mesh.geometry.dispose();

			this._mesh.geometry = null;

			this._mesh.material.dispose();

			this._mesh.material = null;
			this._mesh = null;

			this._geometry.dispose();

			this._geometry = null;
			this._material.vertexShader = null;
			this._material.fragmentShader = null;
			this._material.uniforms = null;

			this._material.dispose();

			this._material = null;
			this._stack = null;
		}

		get geometry() {
			return this._geometry;
		}

		set geometry(geometry) {
			if (this._mesh) {
				this.remove(this._mesh);

				this._mesh.geometry.dispose();

				this._mesh.geometry = null;
				this._mesh = null;

				this._geometry.dispose();

				this._geometry = null;
			}

			this._geometry = geometry;

			this._create();
		}

		get textureToFilter() {
			return this._textureToFilter;
		}

		set textureToFilter(texture) {
			this._textureToFilter = texture;
			this._uniforms.uTextureFilled.value = texture;
			this._material.needsUpdate = true;
		}

		get contourOpacity() {
			return this._contourOpacity;
		}

		set contourOpacity(contourOpacity) {
			this._contourOpacity = contourOpacity;
			this._uniforms.uOpacity.value = this._contourOpacity;
		}

		get contourWidth() {
			return this._contourWidth;
		}

		set contourWidth(contourWidth) {
			this._contourWidth = contourWidth;
			this._uniforms.uWidth.value = this._contourWidth;
		}

		get canvasWidth() {
			return this._canvasWidth;
		}

		set canvasWidth(canvasWidth) {
			this._canvasWidth = canvasWidth;
			this._uniforms.uCanvasWidth.value = this._canvasWidth;
		}

		get canvasHeight() {
			return this._canvasHeight;
		}

		set canvasHeight(canvasHeight) {
			this._canvasHeight = canvasHeight;
			this._uniforms.uCanvasHeight.value = this._canvasHeight;
		}

	}

	/**
	 * @module shaders/localizer/uniforms
	 */
	class ShadersUniform$3 {
		/**
		 * Shaders data uniforms
		 */
		static uniforms() {
			return {
				uCanvasWidth: {
					type: 'f',
					value: 0,
					typeGLSL: 'float'
				},
				uCanvasHeight: {
					type: 'f',
					value: 0,
					typeGLSL: 'float'
				},
				uSlice: {
					type: 'v4',
					value: [0.0, 0.0, 0.0, 0.0],
					typeGLSL: 'vec4'
				},
				uPlane1: {
					type: 'v4',
					value: [0.0, 0.0, 0.0, 0.0],
					typeGLSL: 'vec4'
				},
				uPlaneColor1: {
					type: 'v3',
					value: [1.0, 1.0, 0.0],
					typeGLSL: 'vec3'
				},
				uPlane2: {
					type: 'v4',
					value: [0.0, 0.0, 0.0, 0.0],
					typeGLSL: 'vec4'
				},
				uPlaneColor2: {
					type: 'v3',
					value: [1.0, 1.0, 0.0],
					typeGLSL: 'vec3'
				},
				uPlane3: {
					type: 'v4',
					value: [0.0, 0.0, 0.0, 0.0],
					typeGLSL: 'vec4'
				},
				uPlaneColor3: {
					type: 'v3',
					value: [1.0, 1.0, 0.0],
					typeGLSL: 'vec3'
				}
			};
		}

	}

	/**
	 *
	 */
	class ShadersVertex$3 {
		/**
		 *
		 */
		compute() {
			return `
varying vec4 vPos;
varying mat4 vProjectionViewMatrix;

//
// main
//
void main() {

	vPos = modelMatrix * vec4(position, 1.0 );
	vProjectionViewMatrix = projectionMatrix * viewMatrix;
	gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0 );

}
				`;
		}

	}

	/**
	 * Localizer fragment shader
	 */
	class ShadersFragment$3 {
		/**
		 *
		 */
		constructor(uniforms) {
			this._uniforms = uniforms;
			this._functions = {};
			this._main = '';
		}
		/**
		 *
		 */


		functions() {
			if (this._main === '') {
				// if main is empty, functions can not have been computed
				this.main();
			}

			let content = '';

			for (let property in this._functions) {
				content += this._functions[property] + '\n';
			}

			return content;
		}
		/**
		 *
		 */


		uniforms() {
			let content = '';

			for (let property in this._uniforms) {
				let uniform = this._uniforms[property];
				content += `uniform ${uniform.typeGLSL} ${property}`;

				if (uniform && uniform.length) {
					content += `[${uniform.length}]`;
				}

				content += ';\n';
			}

			return content;
		}
		/**
		 *
		 */


		main() {
			// need to pre-call main to fill up the functions list
			this._main = `
void intersectionProjection(
	in vec4 plane,
	in vec4 slice,
	out vec3 intersectionProjection){

			vec3 intersectionDirection = normalize(cross(plane.xyz, slice.xyz));
			vec3 intersectionPoint = 
				cross(intersectionDirection,slice.xyz) * plane.w +
				cross(plane.xyz, intersectionDirection) * slice.w;

			intersectionProjection =
				intersectionPoint.xyz +
				(dot(vPos.xyz - intersectionPoint, intersectionDirection)
					* intersectionDirection);

}

void main(void) {
			vec4 c1 = vec4(0., 0., 0., 0.);
			vec4 c2 = vec4(0., 0., 0., 0.);
			vec4 c3 = vec4(0., 0., 0., 0.);

			// localizer #1
			// must be normalized!
			if(length(uPlane1.xyz) > 0.5) {
				vec3 projection1 = vec3(1.);
				intersectionProjection(
					uPlane1,
					uSlice,
					projection1
				);

				vec4 projInter1 = (vProjectionViewMatrix * vec4(projection1, 1.));
				vec3 ndc1 = projInter1.xyz / projInter1.w;
				vec2 screenSpace1 = (ndc1.xy * .5 + .5) * vec2(uCanvasWidth, uCanvasHeight);

				float d1 = distance(gl_FragCoord.xy, screenSpace1.xy);
				c1 = vec4(uPlaneColor1, 1. - smoothstep(.5, .7, d1));
			}

			// localizer #2
			if(length(uPlane2.xyz) > 0.5) {
				vec3 projection2 = vec3(1.);
				intersectionProjection(
					uPlane2,
					uSlice,
					projection2
				);

				vec4 projInter2 = (vProjectionViewMatrix * vec4(projection2, 1.));
				vec3 ndc2 = projInter2.xyz / projInter2.w;
				vec2 screenSpace2 = (ndc2.xy * .5 + .5) * vec2(uCanvasWidth, uCanvasHeight);

				float d2 = distance(gl_FragCoord.xy, screenSpace2.xy);
				c2 = vec4(uPlaneColor2, 1. - smoothstep(.5, .7, d2));
			}

			// localizer #3
			if(length(uPlane3.xyz) > 0.5) {
				vec3 projection3 = vec3(1.);
				intersectionProjection(
					uPlane3,
					uSlice,
					projection3
				);

				vec4 projInter3 = (vProjectionViewMatrix * vec4(projection3, 1.));
				vec3 ndc3 = projInter3.xyz / projInter3.w;
				vec2 screenSpace3 = (ndc3.xy * .5 + .5) * vec2(uCanvasWidth, uCanvasHeight);

				float d3 = distance(gl_FragCoord.xy, screenSpace3.xy);
				c3 = vec4(uPlaneColor3, 1. - smoothstep(.5, .7, d3));
			}

			// float uBorderDashLength = 10.0;
			// float uBorderWidth = 2.0;
			// float valueX = mod(gl_FragCoord.x, 2. * uBorderDashLength);
			// float valueY = mod(gl_FragCoord.y, 2. * uBorderDashLength);
			// if( valueX < uBorderDashLength || valueY < uBorderDashLength ){
				vec3 colorMix = c1.xyz*c1.w + c2.xyz*c2.w + c3.xyz*c3.w;
				gl_FragColor = vec4(colorMix, max(max(c1.w, c2.w),c3.w)*0.5);
				return;
			// }
			
			// gl_FragColor = vec4(0., 0., 0., 0.);
			// return;
}
	 `;
		}
		/**
		 *
		 */


		compute() {
			return `
// uniforms
${this.uniforms()}

// varying (should fetch it from vertex directly)
varying vec4 vPos;
varying mat4 vProjectionViewMatrix;

// tailored functions
${this.functions()}

// main loop
${this._main}
			`;
		}

	}

	/** * Imports ***/
	/**
	 * @module helpers/localizer
	 */

	class helpersLocalizer extends three.Object3D {
		constructor(stack, geometry, referencePlane) {
			//
			super();
			this._stack = stack;
			this._referencePlane = referencePlane;
			this._plane1 = null;
			this._color1 = null;
			this._plane2 = null;
			this._color2 = null;
			this._plane3 = null;
			this._color3 = null;
			this._canvasWidth = 0;
			this._canvasHeight = 0;
			this._shadersFragment = ShadersFragment$3;
			this._shadersVertex = ShadersVertex$3;
			this._uniforms = ShadersUniform$3.uniforms();
			this._material = null;
			this._geometry = geometry;

			this._create();
		}

		_create() {
			this._prepareMaterial();

			this._mesh = new three.Mesh(this._geometry, this._material);

			this._mesh.applyMatrix(this._stack._ijk2LPS);

			this.add(this._mesh);
		}

		_prepareMaterial() {
			if (!this._material) {
				// reference plane
				this._uniforms.uSlice.value = this._referencePlane; // localizer planes

				if (this._plane1) {
					this._uniforms.uPlane1.value = this._plane1;
					this._uniforms.uPlaneColor1.value = this._color1;
				}

				if (this._plane2) {
					this._uniforms.uPlane2.value = this._plane2;
					this._uniforms.uPlaneColor2.value = this._color2;
				}

				if (this._plane3) {
					this._uniforms.uPlane3.value = this._plane3;
					this._uniforms.uPlaneColor3.value = this._color3;
				} //


				this._uniforms.uCanvasWidth.value = this._canvasWidth;
				this._uniforms.uCanvasHeight.value = this._canvasHeight; // generate material

				let fs = new ShadersFragment$3(this._uniforms);
				let vs = new ShadersVertex$3();
				this._material = new three.ShaderMaterial({
					side: three.DoubleSide,
					uniforms: this._uniforms,
					vertexShader: vs.compute(),
					fragmentShader: fs.compute()
				});
				this._material.transparent = true;
			}
		}

		update() {
			if (this._mesh) {
				this.remove(this._mesh);

				this._mesh.geometry.dispose();

				this._mesh.geometry = null;
				this._mesh = null;
			}

			this._create();
		}

		dispose() {
			//
			this._referencePlane = null;
			this._plane1 = null;
			this._color1 = null;
			this._plane2 = null;
			this._color2 = null;
			this._plane3 = null;
			this._color3 = null;
			this._shadersFragment = null;
			this._shadersVertex = null;
			this._uniforms = null; // material, geometry and mesh

			this.remove(this._mesh);

			this._mesh.geometry.dispose();

			this._mesh.geometry = null;

			this._mesh.material.dispose();

			this._mesh.material = null;
			this._mesh = null;

			this._geometry.dispose();

			this._geometry = null;
			this._material.vertexShader = null;
			this._material.fragmentShader = null;
			this._material.uniforms = null;

			this._material.dispose();

			this._material = null;
			this._stack = null;
		}

		get geometry() {
			return this._geometry;
		}

		set geometry(geometry) {
			if (this._mesh) {
				this.remove(this._mesh);

				this._mesh.geometry.dispose();

				this._mesh.geometry = null;
				this._mesh = null;

				this._geometry.dispose();

				this._geometry = null;
			}

			this._geometry = geometry;

			this._create();
		}

		get referencePlane() {
			return this._referencePlane;
		}

		set referencePlane(referencePlane) {
			this._referencePlane = referencePlane;
			this._uniforms.uSlice.value = this._referencePlane;
		}

		get plane1() {
			return this._plane1;
		}

		set plane1(plane1) {
			this._plane1 = plane1;
			this._uniforms.uPlane1.value = this._plane1;
		}

		get color1() {
			return this._color1;
		}

		set color1(color1) {
			this._color1 = color1;
			this._uniforms.uPlaneColor1.value = this._color1;
		}

		get plane2() {
			return this._plane2;
		}

		set plane2(plane2) {
			this._plane2 = plane2;
			this._uniforms.uPlane2.value = this._plane2;
		}

		get color2() {
			return this._color2;
		}

		set color2(color2) {
			this._color2 = color2;
			this._uniforms.uPlaneColor2.value = this._color2;
		}

		get plane3() {
			return this._plane3;
		}

		set plane3(plane3) {
			this._plane3 = plane3;
			this._uniforms.uPlane3.value = this._plane3;
		}

		get color3() {
			return this._color3;
		}

		set color3(color3) {
			this._color3 = color3;
			this._uniforms.uPlaneColor3.value = this._color3;
		}

		get canvasWidth() {
			return this._canvasWidth;
		}

		set canvasWidth(canvasWidth) {
			this._canvasWidth = canvasWidth;
			this._uniforms.uCanvasWidth.value = this._canvasWidth;
		}

		get canvasHeight() {
			return this._canvasHeight;
		}

		set canvasHeight(canvasHeight) {
			this._canvasHeight = canvasHeight;
			this._uniforms.uCanvasHeight.value = this._canvasHeight;
		}

	}

	/**
	 * @module helpers/lut
	 */

	class helpersLut extends three.Object3D {
		constructor(domTarget, lut = 'default', lutO = 'linear', color = [[0, 0, 0, 0], [1, 1, 1, 1]], opacity = [[0, 0], [1, 1]], discrete = false) {
			// min/max (0-1 or real intensities)
			// show/hide
			// horizontal/vertical
			super();

			if (CoreUtils.isString(domTarget)) {
				this._dom = document.getElementById(domTarget);
			} else {
				this._dom = domTarget;
			}

			this._discrete = discrete;
			this._color = color;
			this._lut = lut;
			this._luts = {
				[lut]: color
			};
			this._opacity = opacity;
			this._lutO = lutO;
			this._lutsO = {
				[lutO]: opacity
			};
			this.initCanvas();
			this.paintCanvas();
		}

		initCanvas() {
			// container
			this._canvasContainer = this.initCanvasContainer(this._dom); // background

			this._canvasBg = this.createCanvas();

			this._canvasContainer.appendChild(this._canvasBg); // foreground


			this._canvas = this.createCanvas();

			this._canvasContainer.appendChild(this._canvas);
		}

		initCanvasContainer(dom) {
			let canvasContainer = dom;
			canvasContainer.style.border = '1px solid #F9F9F9';
			return canvasContainer;
		}

		createCanvas() {
			let canvas = document.createElement('canvas');
			canvas.height = 1;
			canvas.width = 256;
			canvas.style.width = '256px';
			canvas.style.height = '16px';
			return canvas;
		}

		paintCanvas() {
			// setup context
			let ctx = this._canvas.getContext('2d');

			ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);
			ctx.globalCompositeOperation = 'source-over'; // apply color

			if (!this._discrete) {
				let color = ctx.createLinearGradient(0, 0, this._canvas.width, 0);

				for (let i = 0; i < this._color.length; i++) {
					color.addColorStop(this._color[i][0], `rgba( ${Math.round(this._color[i][1] * 255)}, ${Math.round(this._color[i][2] * 255)}, ${Math.round(this._color[i][3] * 255)}, 1)`);
				}

				ctx.fillStyle = color;
				ctx.fillRect(0, 0, this._canvas.width, this._canvas.height); // setup context

				ctx.globalCompositeOperation = 'destination-in'; // apply opacity

				let opacity = ctx.createLinearGradient(0, 0, this._canvas.width, 0);

				for (let i = 0; i < this._opacity.length; i++) {
					opacity.addColorStop(this._opacity[i][0], 'rgba(255, 255, 255, ' + this._opacity[i][1] + ')');
				}

				ctx.fillStyle = opacity;
				ctx.fillRect(0, 0, this._canvas.width, this._canvas.height);
			} else {
				ctx.lineWidth = 2 * this._canvas.height;

				for (let i = 0; i < this._color.length; i++) {
					let currentPos = this._color[i][0];
					let nextPos = 1;

					if (i < this._color.length - 1) {
						nextPos = this._color[i + 1][0];
					}

					let previousPos = 0;

					if (i > 0) {
						previousPos = this._color[i - 1][0];
					}

					let from = previousPos + (currentPos - previousPos) / 2;
					let to = currentPos + (nextPos - currentPos) / 2;
					let color = this._color[i];
					let opacity = this._opacity[i] ? this._opacity[i][1] : 1;
					ctx.beginPath();
					ctx.strokeStyle = `rgba( ${Math.round(color[1] * 255)}, ${Math.round(color[2] * 255)}, ${Math.round(color[3] * 255)}, ${opacity})`;
					ctx.moveTo(from * this._canvas.width, 0);
					ctx.lineTo(to * this._canvas.width, 0);
					ctx.stroke();
					ctx.closePath();
				}
			}
		}

		get texture() {
			let texture = new three.Texture(this._canvas);
			texture.mapping = three.UVMapping;
			texture.wrapS = texture.wrapT = three.ClampToEdgeWrapping;
			texture.magFilter = texture.minFilter = three.NearestFilter;
			texture.premultiplyAlpha = true;
			texture.needsUpdate = true;
			return texture;
		}

		set lut(targetLUT) {
			this._color = this._luts[targetLUT];
			this._lut = targetLUT;
			this.paintCanvas();
		}

		get lut() {
			return this._lut;
		}

		set luts(newLuts) {
			this._luts = newLuts;
		}

		get luts() {
			return this._luts;
		}

		set lutO(targetLUTO) {
			this._opacity = this._lutsO[targetLUTO];
			this._lutO = targetLUTO;
			this.paintCanvas();
		}

		get lutO() {
			return this._lutO;
		}

		set lutsO(newLutsO) {
			this._lutsO = newLutsO;
		}

		get lutsO() {
			return this._lutsO;
		}

		set discrete(discrete) {
			this._discrete = discrete;
			this.paintCanvas();
		}

		get discrete() {
			return this._discrete;
		}

		lutsAvailable(type = 'color') {
			let available = [];
			let luts = this._luts;

			if (type !== 'color') {
				luts = this._lutsO;
			}

			for (let i in luts) {
				available.push(i);
			}

			return available;
		} // add luts to class' lut (so a user can add its own as well)


		static presetLuts() {
			return {
				default: [[0, 0, 0, 0], [1, 1, 1, 1]],
				spectrum: [[0, 0, 0, 0], [0.1, 0, 0, 1], [0.33, 0, 1, 1], [0.5, 0, 1, 0], [0.66, 1, 1, 0], [0.9, 1, 0, 0], [1, 1, 1, 1]],
				hot_and_cold: [[0, 0, 0, 1], [0.15, 0, 1, 1], [0.3, 0, 1, 0], [0.45, 0, 0, 0], [0.5, 0, 0, 0], [0.55, 0, 0, 0], [0.7, 1, 1, 0], [0.85, 1, 0, 0], [1, 1, 1, 1]],
				gold: [[0, 0, 0, 0], [0.13, 0.19, 0.03, 0], [0.25, 0.39, 0.12, 0], [0.38, 0.59, 0.26, 0], [0.5, 0.8, 0.46, 0.08], [0.63, 0.99, 0.71, 0.21], [0.75, 0.99, 0.88, 0.34], [0.88, 0.99, 0.99, 0.48], [1, 0.9, 0.95, 0.61]],
				red: [[0, 0.75, 0, 0], [0.5, 1, 0.5, 0], [0.95, 1, 1, 0], [1, 1, 1, 1]],
				green: [[0, 0, 0.75, 0], [0.5, 0.5, 1, 0], [0.95, 1, 1, 0], [1, 1, 1, 1]],
				blue: [[0, 0, 0, 1], [0.5, 0, 0.5, 1], [0.95, 0, 1, 1], [1, 1, 1, 1]],
				walking_dead: [[0, 0.1, 1, 1], [1, 1, 1, 1]],
				random: [[0, 0, 0, 0], [0.27, 0.18, 0.18, 0.18], [0.41, 1, 1, 1], [0.7, 1, 0, 0], [1, 1, 1, 1]],
				muscle_bone: [[0, 0, 0, 0], [0.00392156862745098, 0.00784313725490196, 0, 0], [0.00784313725490196, 0.0196078431372549, 0, 0], [0.011764705882352941, 0.03137254901960784, 0, 0], [0.01568627450980392, 0.0392156862745098, 0, 0.00392156862745098], [0.0196078431372549, 0.050980392156862744, 0.00392156862745098, 0.00392156862745098], [0.023529411764705882, 0.06274509803921569, 0.00392156862745098, 0.00392156862745098], [0.027450980392156862, 0.07058823529411765, 0.00392156862745098, 0.00784313725490196], [0.03137254901960784, 0.08235294117647059, 0.00392156862745098, 0.00784313725490196], [0.03529411764705882, 0.09411764705882353, 0.00784313725490196, 0.00784313725490196], [0.0392156862745098, 0.10196078431372549, 0.00784313725490196, 0.00784313725490196], [0.043137254901960784, 0.11372549019607843, 0.00784313725490196, 0.011764705882352941], [0.047058823529411764, 0.12549019607843137, 0.00784313725490196, 0.011764705882352941], [0.050980392156862744, 0.13333333333333333, 0.011764705882352941, 0.011764705882352941], [0.054901960784313725, 0.1450980392156863, 0.011764705882352941, 0.01568627450980392], [0.058823529411764705, 0.1568627450980392, 0.011764705882352941, 0.01568627450980392], [0.06274509803921569, 0.16470588235294117, 0.011764705882352941, 0.01568627450980392], [0.06666666666666667, 0.17647058823529413, 0.011764705882352941, 0.0196078431372549], [0.07058823529411765, 0.18823529411764706, 0.01568627450980392, 0.0196078431372549], [0.07450980392156863, 0.2, 0.01568627450980392, 0.0196078431372549], [0.0784313725490196, 0.20784313725490197, 0.01568627450980392, 0.0196078431372549], [0.08235294117647059, 0.2196078431372549, 0.01568627450980392, 0.023529411764705882], [0.08627450980392157, 0.23137254901960785, 0.0196078431372549, 0.023529411764705882], [0.09019607843137255, 0.23921568627450981, 0.0196078431372549, 0.023529411764705882], [0.09411764705882353, 0.25098039215686274, 0.0196078431372549, 0.027450980392156862], [0.09803921568627451, 0.2627450980392157, 0.0196078431372549, 0.027450980392156862], [0.10196078431372549, 0.27058823529411763, 0.023529411764705882, 0.027450980392156862], [0.10588235294117647, 0.2823529411764706, 0.023529411764705882, 0.027450980392156862], [0.10980392156862745, 0.29411764705882354, 0.023529411764705882, 0.03137254901960784], [0.11372549019607843, 0.30196078431372547, 0.023529411764705882, 0.03137254901960784], [0.11764705882352941, 0.3137254901960784, 0.023529411764705882, 0.03137254901960784], [0.12156862745098039, 0.3254901960784314, 0.027450980392156862, 0.03529411764705882], [0.12549019607843137, 0.3333333333333333, 0.027450980392156862, 0.03529411764705882], [0.12941176470588237, 0.34509803921568627, 0.027450980392156862, 0.03529411764705882], [0.13333333333333333, 0.3568627450980392, 0.027450980392156862, 0.0392156862745098], [0.13725490196078433, 0.36470588235294116, 0.03137254901960784, 0.0392156862745098], [0.1411764705882353, 0.3764705882352941, 0.03137254901960784, 0.0392156862745098], [0.1450980392156863, 0.38823529411764707, 0.03137254901960784, 0.0392156862745098], [0.14901960784313725, 0.4, 0.03137254901960784, 0.043137254901960784], [0.15294117647058825, 0.40784313725490196, 0.03529411764705882, 0.043137254901960784], [0.1568627450980392, 0.4196078431372549, 0.03529411764705882, 0.043137254901960784], [0.1607843137254902, 0.43137254901960786, 0.03529411764705882, 0.047058823529411764], [0.16470588235294117, 0.4392156862745098, 0.03529411764705882, 0.047058823529411764], [0.16862745098039217, 0.45098039215686275, 0.03529411764705882, 0.047058823529411764], [0.17254901960784313, 0.4627450980392157, 0.0392156862745098, 0.047058823529411764], [0.17647058823529413, 0.47058823529411764, 0.0392156862745098, 0.050980392156862744], [0.1803921568627451, 0.4823529411764706, 0.0392156862745098, 0.050980392156862744], [0.1843137254901961, 0.49411764705882355, 0.0392156862745098, 0.050980392156862744], [0.18823529411764706, 0.5019607843137255, 0.043137254901960784, 0.054901960784313725], [0.19215686274509805, 0.5137254901960784, 0.043137254901960784, 0.054901960784313725], [0.19607843137254902, 0.5254901960784314, 0.043137254901960784, 0.054901960784313725], [0.2, 0.5333333333333333, 0.043137254901960784, 0.058823529411764705], [0.20392156862745098, 0.5450980392156862, 0.047058823529411764, 0.058823529411764705], [0.20784313725490197, 0.5568627450980392, 0.047058823529411764, 0.058823529411764705], [0.21176470588235294, 0.5647058823529412, 0.047058823529411764, 0.058823529411764705], [0.21568627450980393, 0.5764705882352941, 0.047058823529411764, 0.06274509803921569], [0.2196078431372549, 0.5882352941176471, 0.047058823529411764, 0.06274509803921569], [0.2235294117647059, 0.6, 0.050980392156862744, 0.06274509803921569], [0.22745098039215686, 0.6078431372549019, 0.050980392156862744, 0.06666666666666667], [0.23137254901960785, 0.6196078431372549, 0.050980392156862744, 0.06666666666666667], [0.23529411764705882, 0.6313725490196078, 0.050980392156862744, 0.06666666666666667], [0.23921568627450981, 0.6392156862745098, 0.054901960784313725, 0.06666666666666667], [0.24313725490196078, 0.6509803921568628, 0.054901960784313725, 0.07058823529411765], [0.24705882352941178, 0.6627450980392157, 0.054901960784313725, 0.07058823529411765], [0.25098039215686274, 0.6705882352941176, 0.054901960784313725, 0.07058823529411765], [0.2549019607843137, 0.6823529411764706, 0.058823529411764705, 0.07450980392156863], [0.25882352941176473, 0.6941176470588235, 0.058823529411764705, 0.07450980392156863], [0.2627450980392157, 0.7019607843137254, 0.058823529411764705, 0.07450980392156863], [0.26666666666666666, 0.7137254901960784, 0.058823529411764705, 0.0784313725490196], [0.27058823529411763, 0.7254901960784313, 0.058823529411764705, 0.0784313725490196], [0.27450980392156865, 0.7333333333333333, 0.06274509803921569, 0.0784313725490196], [0.2784313725490196, 0.7450980392156863, 0.06274509803921569, 0.0784313725490196], [0.2823529411764706, 0.7568627450980392, 0.06274509803921569, 0.08235294117647059], [0.28627450980392155, 0.7647058823529411, 0.06274509803921569, 0.08235294117647059], [0.2901960784313726, 0.7764705882352941, 0.06666666666666667, 0.08235294117647059], [0.29411764705882354, 0.788235294117647, 0.06666666666666667, 0.08627450980392157], [0.2980392156862745, 0.8, 0.06666666666666667, 0.08627450980392157], [0.30196078431372547, 0.807843137254902, 0.06666666666666667, 0.08627450980392157], [0.3058823529411765, 0.8196078431372549, 0.07058823529411765, 0.08627450980392157], [0.30980392156862746, 0.8313725490196079, 0.07058823529411765, 0.09019607843137255], [0.3137254901960784, 0.8392156862745098, 0.07058823529411765, 0.09019607843137255], [0.3176470588235294, 0.8509803921568627, 0.07058823529411765, 0.09019607843137255], [0.3215686274509804, 0.8627450980392157, 0.07058823529411765, 0.09411764705882353], [0.3254901960784314, 0.8705882352941177, 0.07450980392156863, 0.09411764705882353], [0.32941176470588235, 0.8823529411764706, 0.07450980392156863, 0.09411764705882353], [0.3333333333333333, 0.8941176470588236, 0.07450980392156863, 0.09803921568627451], [0.33725490196078434, 0.9019607843137255, 0.07450980392156863, 0.09803921568627451], [0.3411764705882353, 0.9137254901960784, 0.0784313725490196, 0.09803921568627451], [0.34509803921568627, 0.9254901960784314, 0.0784313725490196, 0.09803921568627451], [0.34901960784313724, 0.9333333333333333, 0.0784313725490196, 0.10196078431372549], [0.35294117647058826, 0.9450980392156862, 0.0784313725490196, 0.10196078431372549], [0.3568627450980392, 0.9568627450980393, 0.08235294117647059, 0.10196078431372549], [0.3607843137254902, 0.9647058823529412, 0.08235294117647059, 0.10588235294117647], [0.36470588235294116, 0.9764705882352941, 0.08235294117647059, 0.10588235294117647], [0.3686274509803922, 0.9882352941176471, 0.08235294117647059, 0.10588235294117647], [0.37254901960784315, 1, 0.08235294117647059, 0.10588235294117647], [0.3764705882352941, 1, 0.09411764705882353, 0.10588235294117647], [0.3803921568627451, 1, 0.10588235294117647, 0.10588235294117647], [0.3843137254901961, 1, 0.11764705882352941, 0.10196078431372549], [0.38823529411764707, 1, 0.12941176470588237, 0.10196078431372549], [0.39215686274509803, 1, 0.1411764705882353, 0.10196078431372549], [0.396078431372549, 1, 0.15294117647058825, 0.09803921568627451], [0.4, 1, 0.16470588235294117, 0.09803921568627451], [0.403921568627451, 1, 0.17647058823529413, 0.09803921568627451], [0.40784313725490196, 1, 0.18823529411764706, 0.09411764705882353], [0.4117647058823529, 1, 0.2, 0.09411764705882353], [0.41568627450980394, 1, 0.21176470588235294, 0.09411764705882353], [0.4196078431372549, 1, 0.2235294117647059, 0.09019607843137255], [0.4235294117647059, 1, 0.23529411764705882, 0.09019607843137255], [0.42745098039215684, 1, 0.24705882352941178, 0.08627450980392157], [0.43137254901960786, 1, 0.25882352941176473, 0.08627450980392157], [0.43529411764705883, 1, 0.27058823529411763, 0.08627450980392157], [0.4392156862745098, 1, 0.2823529411764706, 0.08235294117647059], [0.44313725490196076, 1, 0.29411764705882354, 0.08235294117647059], [0.4470588235294118, 1, 0.3058823529411765, 0.08235294117647059], [0.45098039215686275, 1, 0.3176470588235294, 0.0784313725490196], [0.4549019607843137, 1, 0.32941176470588235, 0.0784313725490196], [0.4588235294117647, 1, 0.3411764705882353, 0.0784313725490196], [0.4627450980392157, 1, 0.35294117647058826, 0.07450980392156863], [0.4666666666666667, 1, 0.36470588235294116, 0.07450980392156863], [0.47058823529411764, 1, 0.3764705882352941, 0.07450980392156863], [0.4745098039215686, 1, 0.38823529411764707, 0.07058823529411765], [0.47843137254901963, 1, 0.4, 0.07058823529411765], [0.4823529411764706, 1, 0.4117647058823529, 0.07058823529411765], [0.48627450980392156, 1, 0.4235294117647059, 0.06666666666666667], [0.49019607843137253, 1, 0.43529411764705883, 0.06666666666666667], [0.49411764705882355, 1, 0.4470588235294118, 0.06274509803921569], [0.4980392156862745, 1, 0.4588235294117647, 0.06274509803921569], [0.5019607843137255, 1, 0.47058823529411764, 0.06274509803921569], [0.5058823529411764, 1, 0.4823529411764706, 0.058823529411764705], [0.5098039215686274, 1, 0.49411764705882355, 0.058823529411764705], [0.5137254901960784, 1, 0.5058823529411764, 0.058823529411764705], [0.5176470588235295, 1, 0.5137254901960784, 0.054901960784313725], [0.5215686274509804, 1, 0.5254901960784314, 0.054901960784313725], [0.5254901960784314, 1, 0.5372549019607843, 0.054901960784313725], [0.5294117647058824, 1, 0.5490196078431373, 0.050980392156862744], [0.5333333333333333, 1, 0.5607843137254902, 0.050980392156862744], [0.5372549019607843, 1, 0.5725490196078431, 0.050980392156862744], [0.5411764705882353, 1, 0.5843137254901961, 0.047058823529411764], [0.5450980392156862, 1, 0.596078431372549, 0.047058823529411764], [0.5490196078431373, 1, 0.6078431372549019, 0.043137254901960784], [0.5529411764705883, 1, 0.6196078431372549, 0.043137254901960784], [0.5568627450980392, 1, 0.6313725490196078, 0.043137254901960784], [0.5607843137254902, 1, 0.6431372549019608, 0.0392156862745098], [0.5647058823529412, 1, 0.6549019607843137, 0.0392156862745098], [0.5686274509803921, 1, 0.6666666666666666, 0.0392156862745098], [0.5725490196078431, 1, 0.6784313725490196, 0.03529411764705882], [0.5764705882352941, 1, 0.6901960784313725, 0.03529411764705882], [0.5803921568627451, 1, 0.6941176470588235, 0.0392156862745098], [0.5843137254901961, 1, 0.7019607843137254, 0.0392156862745098], [0.5882352941176471, 1, 0.7058823529411765, 0.043137254901960784], [0.592156862745098, 1, 0.7098039215686275, 0.043137254901960784], [0.596078431372549, 1, 0.7137254901960784, 0.047058823529411764], [0.6, 1, 0.7176470588235294, 0.047058823529411764], [0.6039215686274509, 1, 0.7254901960784313, 0.050980392156862744], [0.6078431372549019, 1, 0.7294117647058823, 0.050980392156862744], [0.611764705882353, 1, 0.7333333333333333, 0.054901960784313725], [0.615686274509804, 1, 0.7372549019607844, 0.058823529411764705], [0.6196078431372549, 1, 0.7411764705882353, 0.058823529411764705], [0.6235294117647059, 1, 0.7490196078431373, 0.06274509803921569], [0.6274509803921569, 1, 0.7529411764705882, 0.06274509803921569], [0.6313725490196078, 1, 0.7568627450980392, 0.06666666666666667], [0.6352941176470588, 1, 0.7607843137254902, 0.06666666666666667], [0.6392156862745098, 1, 0.7647058823529411, 0.07058823529411765], [0.6431372549019608, 1, 0.7725490196078432, 0.07058823529411765], [0.6470588235294118, 1, 0.7764705882352941, 0.07450980392156863], [0.6509803921568628, 1, 0.7803921568627451, 0.07450980392156863], [0.6549019607843137, 1, 0.7843137254901961, 0.0784313725490196], [0.6588235294117647, 1, 0.788235294117647, 0.08235294117647059], [0.6627450980392157, 1, 0.796078431372549, 0.08235294117647059], [0.6666666666666666, 1, 0.8, 0.08627450980392157], [0.6705882352941176, 1, 0.803921568627451, 0.08627450980392157], [0.6745098039215687, 1, 0.807843137254902, 0.09019607843137255], [0.6784313725490196, 1, 0.8117647058823529, 0.09019607843137255], [0.6823529411764706, 1, 0.8196078431372549, 0.09411764705882353], [0.6862745098039216, 1, 0.8235294117647058, 0.09411764705882353], [0.6901960784313725, 1, 0.8274509803921568, 0.09803921568627451], [0.6941176470588235, 1, 0.8313725490196079, 0.10196078431372549], [0.6980392156862745, 1, 0.8352941176470589, 0.10196078431372549], [0.7019607843137254, 1, 0.8431372549019608, 0.10588235294117647], [0.7058823529411765, 1, 0.8470588235294118, 0.10588235294117647], [0.7098039215686275, 1, 0.8509803921568627, 0.10980392156862745], [0.7137254901960784, 1, 0.8549019607843137, 0.10980392156862745], [0.7176470588235294, 1, 0.8627450980392157, 0.11372549019607843], [0.7215686274509804, 1, 0.8666666666666667, 0.11372549019607843], [0.7254901960784313, 1, 0.8705882352941177, 0.11764705882352941], [0.7294117647058823, 1, 0.8745098039215686, 0.12156862745098039], [0.7333333333333333, 1, 0.8784313725490196, 0.12156862745098039], [0.7372549019607844, 1, 0.8862745098039215, 0.12549019607843137], [0.7411764705882353, 1, 0.8901960784313725, 0.12549019607843137], [0.7450980392156863, 1, 0.8941176470588236, 0.12941176470588237], [0.7490196078431373, 1, 0.8980392156862745, 0.12941176470588237], [0.7529411764705882, 1, 0.9019607843137255, 0.13333333333333333], [0.7568627450980392, 1, 0.9098039215686274, 0.13333333333333333], [0.7607843137254902, 1, 0.9137254901960784, 0.13725490196078433], [0.7647058823529411, 1, 0.9176470588235294, 0.1411764705882353], [0.7686274509803922, 1, 0.9215686274509803, 0.1411764705882353], [0.7725490196078432, 1, 0.9254901960784314, 0.1450980392156863], [0.7764705882352941, 1, 0.9333333333333333, 0.1450980392156863], [0.7803921568627451, 1, 0.9372549019607843, 0.14901960784313725], [0.7843137254901961, 1, 0.9411764705882353, 0.14901960784313725], [0.788235294117647, 1, 0.9450980392156862, 0.15294117647058825], [0.792156862745098, 1, 0.9450980392156862, 0.16862745098039217], [0.796078431372549, 1, 0.9490196078431372, 0.1843137254901961], [0.8, 1, 0.9490196078431372, 0.2], [0.803921568627451, 1, 0.9490196078431372, 0.21568627450980393], [0.807843137254902, 1, 0.9490196078431372, 0.22745098039215686], [0.8117647058823529, 1, 0.9529411764705882, 0.24313725490196078], [0.8156862745098039, 1, 0.9529411764705882, 0.25882352941176473], [0.8196078431372549, 1, 0.9529411764705882, 0.27450980392156865], [0.8235294117647058, 1, 0.9529411764705882, 0.2901960784313726], [0.8274509803921568, 1, 0.9568627450980393, 0.3058823529411765], [0.8313725490196079, 1, 0.9568627450980393, 0.3215686274509804], [0.8352941176470589, 1, 0.9568627450980393, 0.33725490196078434], [0.8392156862745098, 1, 0.9568627450980393, 0.35294117647058826], [0.8431372549019608, 1, 0.9607843137254902, 0.3686274509803922], [0.8470588235294118, 1, 0.9607843137254902, 0.3843137254901961], [0.8509803921568627, 1, 0.9607843137254902, 0.4], [0.8549019607843137, 1, 0.9607843137254902, 0.4117647058823529], [0.8588235294117647, 1, 0.9647058823529412, 0.42745098039215684], [0.8627450980392157, 1, 0.9647058823529412, 0.44313725490196076], [0.8666666666666667, 1, 0.9647058823529412, 0.4588235294117647], [0.8705882352941177, 1, 0.9647058823529412, 0.4745098039215686], [0.8745098039215686, 1, 0.9686274509803922, 0.49019607843137253], [0.8784313725490196, 1, 0.9686274509803922, 0.5058823529411764], [0.8823529411764706, 1, 0.9686274509803922, 0.5215686274509804], [0.8862745098039215, 1, 0.9686274509803922, 0.5372549019607843], [0.8901960784313725, 1, 0.9725490196078431, 0.5529411764705883], [0.8941176470588236, 1, 0.9725490196078431, 0.5686274509803921], [0.8980392156862745, 1, 0.9725490196078431, 0.5843137254901961], [0.9019607843137255, 1, 0.9725490196078431, 0.6], [0.9058823529411765, 1, 0.9725490196078431, 0.611764705882353], [0.9098039215686274, 1, 0.9764705882352941, 0.6274509803921569], [0.9137254901960784, 1, 0.9764705882352941, 0.6431372549019608], [0.9176470588235294, 1, 0.9764705882352941, 0.6588235294117647], [0.9215686274509803, 1, 0.9764705882352941, 0.6745098039215687], [0.9254901960784314, 1, 0.9803921568627451, 0.6901960784313725], [0.9294117647058824, 1, 0.9803921568627451, 0.7058823529411765], [0.9333333333333333, 1, 0.9803921568627451, 0.7215686274509804], [0.9372549019607843, 1, 0.9803921568627451, 0.7372549019607844], [0.9411764705882353, 1, 0.984313725490196, 0.7529411764705882], [0.9450980392156862, 1, 0.984313725490196, 0.7686274509803922], [0.9490196078431372, 1, 0.984313725490196, 0.7843137254901961], [0.9529411764705882, 1, 0.984313725490196, 0.8], [0.9568627450980393, 1, 0.9882352941176471, 0.8117647058823529], [0.9607843137254902, 1, 0.9882352941176471, 0.8274509803921568], [0.9647058823529412, 1, 0.9882352941176471, 0.8431372549019608], [0.9686274509803922, 1, 0.9882352941176471, 0.8588235294117647], [0.9725490196078431, 1, 0.9921568627450981, 0.8745098039215686], [0.9764705882352941, 1, 0.9921568627450981, 0.8901960784313725], [0.9803921568627451, 1, 0.9921568627450981, 0.9058823529411765], [0.984313725490196, 1, 0.9921568627450981, 0.9215686274509803], [0.9882352941176471, 1, 0.996078431372549, 0.9372549019607843], [0.9921568627450981, 1, 0.996078431372549, 0.9529411764705882], [0.996078431372549, 1, 0.996078431372549, 0.9686274509803922], [1, 1, 0.996078431372549, 0.984313725490196]]
			};
		}

		static presetLutsO() {
			return {
				linear: [[0, 0], [1, 1]],
				lowpass: [[0, 0.8], [0.2, 0.6], [0.3, 0.1], [1, 0]],
				bandpass: [[0, 0], [0.4, 0.8], [0.6, 0.8], [1, 0]],
				highpass: [[0, 0], [0.7, 0.1], [0.8, 0.6], [1, 0.8]],
				flat: [[0, 0.7], [1, 1]],
				random: [[0, 0], [0.38, 0], [0.55, 1], [0.72, 1], [1, 0.05]],
				linear_full: [[0, 0], [0.00392156862745098, 0.00392156862745098], [0.00784313725490196, 0.00784313725490196], [0.011764705882352941, 0.011764705882352941], [0.01568627450980392, 0.01568627450980392], [0.0196078431372549, 0.0196078431372549], [0.023529411764705882, 0.023529411764705882], [0.027450980392156862, 0.027450980392156862], [0.03137254901960784, 0.03137254901960784], [0.03529411764705882, 0.03529411764705882], [0.0392156862745098, 0.0392156862745098], [0.043137254901960784, 0.043137254901960784], [0.047058823529411764, 0.047058823529411764], [0.050980392156862744, 0.050980392156862744], [0.054901960784313725, 0.054901960784313725], [0.058823529411764705, 0.058823529411764705], [0.06274509803921569, 0.06274509803921569], [0.06666666666666667, 0.06666666666666667], [0.07058823529411765, 0.07058823529411765], [0.07450980392156863, 0.07450980392156863], [0.0784313725490196, 0.0784313725490196], [0.08235294117647059, 0.08235294117647059], [0.08627450980392157, 0.08627450980392157], [0.09019607843137255, 0.09019607843137255], [0.09411764705882353, 0.09411764705882353], [0.09803921568627451, 0.09803921568627451], [0.10196078431372549, 0.10196078431372549], [0.10588235294117647, 0.10588235294117647], [0.10980392156862745, 0.10980392156862745], [0.11372549019607843, 0.11372549019607843], [0.11764705882352941, 0.11764705882352941], [0.12156862745098039, 0.12156862745098039], [0.12549019607843137, 0.12549019607843137], [0.12941176470588237, 0.12941176470588237], [0.13333333333333333, 0.13333333333333333], [0.13725490196078433, 0.13725490196078433], [0.1411764705882353, 0.1411764705882353], [0.1450980392156863, 0.1450980392156863], [0.14901960784313725, 0.14901960784313725], [0.15294117647058825, 0.15294117647058825], [0.1568627450980392, 0.1568627450980392], [0.1607843137254902, 0.1607843137254902], [0.16470588235294117, 0.16470588235294117], [0.16862745098039217, 0.16862745098039217], [0.17254901960784313, 0.17254901960784313], [0.17647058823529413, 0.17647058823529413], [0.1803921568627451, 0.1803921568627451], [0.1843137254901961, 0.1843137254901961], [0.18823529411764706, 0.18823529411764706], [0.19215686274509805, 0.19215686274509805], [0.19607843137254902, 0.19607843137254902], [0.2, 0.2], [0.20392156862745098, 0.20392156862745098], [0.20784313725490197, 0.20784313725490197], [0.21176470588235294, 0.21176470588235294], [0.21568627450980393, 0.21568627450980393], [0.2196078431372549, 0.2196078431372549], [0.2235294117647059, 0.2235294117647059], [0.22745098039215686, 0.22745098039215686], [0.23137254901960785, 0.23137254901960785], [0.23529411764705882, 0.23529411764705882], [0.23921568627450981, 0.23921568627450981], [0.24313725490196078, 0.24313725490196078], [0.24705882352941178, 0.24705882352941178], [0.25098039215686274, 0.25098039215686274], [0.2549019607843137, 0.2549019607843137], [0.25882352941176473, 0.25882352941176473], [0.2627450980392157, 0.2627450980392157], [0.26666666666666666, 0.26666666666666666], [0.27058823529411763, 0.27058823529411763], [0.27450980392156865, 0.27450980392156865], [0.2784313725490196, 0.2784313725490196], [0.2823529411764706, 0.2823529411764706], [0.28627450980392155, 0.28627450980392155], [0.2901960784313726, 0.2901960784313726], [0.29411764705882354, 0.29411764705882354], [0.2980392156862745, 0.2980392156862745], [0.30196078431372547, 0.30196078431372547], [0.3058823529411765, 0.3058823529411765], [0.30980392156862746, 0.30980392156862746], [0.3137254901960784, 0.3137254901960784], [0.3176470588235294, 0.3176470588235294], [0.3215686274509804, 0.3215686274509804], [0.3254901960784314, 0.3254901960784314], [0.32941176470588235, 0.32941176470588235], [0.3333333333333333, 0.3333333333333333], [0.33725490196078434, 0.33725490196078434], [0.3411764705882353, 0.3411764705882353], [0.34509803921568627, 0.34509803921568627], [0.34901960784313724, 0.34901960784313724], [0.35294117647058826, 0.35294117647058826], [0.3568627450980392, 0.3568627450980392], [0.3607843137254902, 0.3607843137254902], [0.36470588235294116, 0.36470588235294116], [0.3686274509803922, 0.3686274509803922], [0.37254901960784315, 0.37254901960784315], [0.3764705882352941, 0.3764705882352941], [0.3803921568627451, 0.3803921568627451], [0.3843137254901961, 0.3843137254901961], [0.38823529411764707, 0.38823529411764707], [0.39215686274509803, 0.39215686274509803], [0.396078431372549, 0.396078431372549], [0.4, 0.4], [0.403921568627451, 0.403921568627451], [0.40784313725490196, 0.40784313725490196], [0.4117647058823529, 0.4117647058823529], [0.41568627450980394, 0.41568627450980394], [0.4196078431372549, 0.4196078431372549], [0.4235294117647059, 0.4235294117647059], [0.42745098039215684, 0.42745098039215684], [0.43137254901960786, 0.43137254901960786], [0.43529411764705883, 0.43529411764705883], [0.4392156862745098, 0.4392156862745098], [0.44313725490196076, 0.44313725490196076], [0.4470588235294118, 0.4470588235294118], [0.45098039215686275, 0.45098039215686275], [0.4549019607843137, 0.4549019607843137], [0.4588235294117647, 0.4588235294117647], [0.4627450980392157, 0.4627450980392157], [0.4666666666666667, 0.4666666666666667], [0.47058823529411764, 0.47058823529411764], [0.4745098039215686, 0.4745098039215686], [0.47843137254901963, 0.47843137254901963], [0.4823529411764706, 0.4823529411764706], [0.48627450980392156, 0.48627450980392156], [0.49019607843137253, 0.49019607843137253], [0.49411764705882355, 0.49411764705882355], [0.4980392156862745, 0.4980392156862745], [0.5019607843137255, 0.5019607843137255], [0.5058823529411764, 0.5058823529411764], [0.5098039215686274, 0.5098039215686274], [0.5137254901960784, 0.5137254901960784], [0.5176470588235295, 0.5176470588235295], [0.5215686274509804, 0.5215686274509804], [0.5254901960784314, 0.5254901960784314], [0.5294117647058824, 0.5294117647058824], [0.5333333333333333, 0.5333333333333333], [0.5372549019607843, 0.5372549019607843], [0.5411764705882353, 0.5411764705882353], [0.5450980392156862, 0.5450980392156862], [0.5490196078431373, 0.5490196078431373], [0.5529411764705883, 0.5529411764705883], [0.5568627450980392, 0.5568627450980392], [0.5607843137254902, 0.5607843137254902], [0.5647058823529412, 0.5647058823529412], [0.5686274509803921, 0.5686274509803921], [0.5725490196078431, 0.5725490196078431], [0.5764705882352941, 0.5764705882352941], [0.5803921568627451, 0.5803921568627451], [0.5843137254901961, 0.5843137254901961], [0.5882352941176471, 0.5882352941176471], [0.592156862745098, 0.592156862745098], [0.596078431372549, 0.596078431372549], [0.6, 0.6], [0.6039215686274509, 0.6039215686274509], [0.6078431372549019, 0.6078431372549019], [0.611764705882353, 0.611764705882353], [0.615686274509804, 0.615686274509804], [0.6196078431372549, 0.6196078431372549], [0.6235294117647059, 0.6235294117647059], [0.6274509803921569, 0.6274509803921569], [0.6313725490196078, 0.6313725490196078], [0.6352941176470588, 0.6352941176470588], [0.6392156862745098, 0.6392156862745098], [0.6431372549019608, 0.6431372549019608], [0.6470588235294118, 0.6470588235294118], [0.6509803921568628, 0.6509803921568628], [0.6549019607843137, 0.6549019607843137], [0.6588235294117647, 0.6588235294117647], [0.6627450980392157, 0.6627450980392157], [0.6666666666666666, 0.6666666666666666], [0.6705882352941176, 0.6705882352941176], [0.6745098039215687, 0.6745098039215687], [0.6784313725490196, 0.6784313725490196], [0.6823529411764706, 0.6823529411764706], [0.6862745098039216, 0.6862745098039216], [0.6901960784313725, 0.6901960784313725], [0.6941176470588235, 0.6941176470588235], [0.6980392156862745, 0.6980392156862745], [0.7019607843137254, 0.7019607843137254], [0.7058823529411765, 0.7058823529411765], [0.7098039215686275, 0.7098039215686275], [0.7137254901960784, 0.7137254901960784], [0.7176470588235294, 0.7176470588235294], [0.7215686274509804, 0.7215686274509804], [0.7254901960784313, 0.7254901960784313], [0.7294117647058823, 0.7294117647058823], [0.7333333333333333, 0.7333333333333333], [0.7372549019607844, 0.7372549019607844], [0.7411764705882353, 0.7411764705882353], [0.7450980392156863, 0.7450980392156863], [0.7490196078431373, 0.7490196078431373], [0.7529411764705882, 0.7529411764705882], [0.7568627450980392, 0.7568627450980392], [0.7607843137254902, 0.7607843137254902], [0.7647058823529411, 0.7647058823529411], [0.7686274509803922, 0.7686274509803922], [0.7725490196078432, 0.7725490196078432], [0.7764705882352941, 0.7764705882352941], [0.7803921568627451, 0.7803921568627451], [0.7843137254901961, 0.7843137254901961], [0.788235294117647, 0.788235294117647], [0.792156862745098, 0.792156862745098], [0.796078431372549, 0.796078431372549], [0.8, 0.8], [0.803921568627451, 0.803921568627451], [0.807843137254902, 0.807843137254902], [0.8117647058823529, 0.8117647058823529], [0.8156862745098039, 0.8156862745098039], [0.8196078431372549, 0.8196078431372549], [0.8235294117647058, 0.8235294117647058], [0.8274509803921568, 0.8274509803921568], [0.8313725490196079, 0.8313725490196079], [0.8352941176470589, 0.8352941176470589], [0.8392156862745098, 0.8392156862745098], [0.8431372549019608, 0.8431372549019608], [0.8470588235294118, 0.8470588235294118], [0.8509803921568627, 0.8509803921568627], [0.8549019607843137, 0.8549019607843137], [0.8588235294117647, 0.8588235294117647], [0.8627450980392157, 0.8627450980392157], [0.8666666666666667, 0.8666666666666667], [0.8705882352941177, 0.8705882352941177], [0.8745098039215686, 0.8745098039215686], [0.8784313725490196, 0.8784313725490196], [0.8823529411764706, 0.8823529411764706], [0.8862745098039215, 0.8862745098039215], [0.8901960784313725, 0.8901960784313725], [0.8941176470588236, 0.8941176470588236], [0.8980392156862745, 0.8980392156862745], [0.9019607843137255, 0.9019607843137255], [0.9058823529411765, 0.9058823529411765], [0.9098039215686274, 0.9098039215686274], [0.9137254901960784, 0.9137254901960784], [0.9176470588235294, 0.9176470588235294], [0.9215686274509803, 0.9215686274509803], [0.9254901960784314, 0.9254901960784314], [0.9294117647058824, 0.9294117647058824], [0.9333333333333333, 0.9333333333333333], [0.9372549019607843, 0.9372549019607843], [0.9411764705882353, 0.9411764705882353], [0.9450980392156862, 0.9450980392156862], [0.9490196078431372, 0.9490196078431372], [0.9529411764705882, 0.9529411764705882], [0.9568627450980393, 0.9568627450980393], [0.9607843137254902, 0.9607843137254902], [0.9647058823529412, 0.9647058823529412], [0.9686274509803922, 0.9686274509803922], [0.9725490196078431, 0.9725490196078431], [0.9764705882352941, 0.9764705882352941], [0.9803921568627451, 0.9803921568627451], [0.984313725490196, 0.984313725490196], [0.9882352941176471, 0.9882352941176471], [0.9921568627450981, 0.9921568627450981], [0.996078431372549, 0.996078431372549], [1, 1]]
			};
		}

	}

	let defaultSegmentation = {
		0: {
			color: [0, 0, 0],
			opacity: 0,
			label: 'background'
		},
		1: {
			color: [255, 0, 0],
			opacity: 1,
			label: 'white matter'
		}
	};
	class HelpersSegmentationLut {
		constructor(domTarget, segmentation = defaultSegmentation) {
			if (CoreUtils.isString(domTarget)) {
				this._dom = document.getElementById(domTarget);
			} else {
				this._dom = domTarget;
			}

			this._segmentation = segmentation;
			/* The segmentation object contains the color, opacity, label and structures associated:
				e.g
				const freesurferSegmentation = {
				0: {color: [0, 0, 0],opacity: 0,label: 'background'},
				1: {color: [255, 0, 0],opacity: 1,label: 'white matter'},
				}
			*/

			this.initCanvas();
			this.paintCanvas();
		}

		initCanvas() {
			// container
			this._canvasContainer = this.initCanvasContainer(this._dom); // background

			this._canvasBg = this.createCanvas();

			this._canvasContainer.appendChild(this._canvasBg); // foreground


			this._canvas = this.createCanvas();

			this._canvasContainer.appendChild(this._canvas);
		}

		initCanvasContainer(dom) {
			let canvasContainer = dom;
			canvasContainer.style.width = '256 px';
			canvasContainer.style.height = '128 px';
			canvasContainer.style.border = '1px solid #F9F9F9';
			return canvasContainer;
		}

		createCanvas() {
			let canvas = document.createElement('canvas');
			canvas.height = 128;
			canvas.width = 256;
			return canvas;
		}

		paintCanvas() {
			// setup context
			let ctx = this._canvas.getContext('2d');

			ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);
			ctx.globalCompositeOperation = 'source-over';
			ctx.lineWidth = 1;

			for (let i in this._segmentation) {
				// i is the label number and specifies the coordinates inside the canvas
				let xCoord = i % this._canvas.width;
				let yCoord = Math.floor(i / this._canvas.width);
				let opacity = typeof this._segmentation[i]['opacity'] != 'undefined' ? this._segmentation[i]['opacity'] : 1;
				let color = this._segmentation[i]['color'];
				ctx.fillStyle = `rgba( ${Math.round(color[0])}, ${Math.round(color[1])}, ${Math.round(color[2])}, ${opacity})`;
				ctx.fillRect(xCoord, yCoord, 1, 1);
			}
		}

		get texture() {
			let texture = new three.Texture(this._canvas);
			texture.mapping = three.UVMapping;
			texture.wrapS = texture.wrapT = three.ClampToEdgeWrapping;
			texture.magFilter = texture.minFilter = three.NearestFilter;
			texture.premultiplyAlpha = true;
			texture.needsUpdate = true;
			return texture;
		}
		/**
		 * Set and get the segmentation object
		 * (you can create it or get it from the presets file)
		 *
		 * @param {*} segmentation
		 */


		set segmentation(segmentation) {
			this._segmentation = segmentation;
			this.paintCanvas();
		}

		get segmentation() {
			return this._segmentation;
		}

	}

	/**
	 * @module helpers/progressBar
	 */
	class HelpersProgressBar {
		constructor(container) {
			this._container = container;
			this._modes = {
				load: {
					name: 'load',
					color: '#FFF56F'
				},
				parse: {
					name: 'parse',
					color: '#2196F3'
				}
			};
			this.requestAnimationFrameID = null;
			this._mode = null;
			this._value = null;
			this._total = null;
			this._totalFiles = null;
			this.init();
		}

		free() {
			let progressContainers = this._container.getElementsByClassName('progress container');

			if (progressContainers.length > 0) {
				progressContainers[0].parentNode.removeChild(progressContainers[0]);
			}

			progressContainers = null; // stop rendering loop

			cancelAnimationFrame(this.requestAnimationFrameID);
		}

		init() {
			let progressContainer = this._domContainer();

			for (let mode in this._modes) {
				if (this._modes.hasOwnProperty(mode)) {
					let bar = this._domBar(this._modes[mode]);

					progressContainer.appendChild(bar);
					bar = null;
				}
			}

			this._container.appendChild(progressContainer);

			progressContainer = null; // start rendering loop

			this.updateUI();
		} // url can be used in child class to show overall progress bar


		update(value, total, mode, url = '') {
			this._mode = mode;
			this._value = value; // depending on CDN, total return to XHTTPRequest can be 0.
			// In this case, we generate a random number to animate the progressbar

			if (total === 0) {
				this._total = value;
				this._value = Math.random() * value;
			} else {
				this._total = total;
			}
		}

		updateUI() {
			this.requestAnimationFrameID = requestAnimationFrame(() => {
				this.updateUI();
			});

			if (!(this._modes.hasOwnProperty(this._mode) && this._modes[this._mode].hasOwnProperty('name') && this._modes[this._mode].hasOwnProperty('color'))) {
				return false;
			}

			const progress = Math.round(this._value / this._total * 100);
			const color = this._modes[this._mode].color;

			let progressBar = this._container.getElementsByClassName('progress ' + this._modes[this._mode].name);

			if (progressBar.length > 0) {
				progressBar[0].style.borderColor = color;
				progressBar[0].style.width = progress + '%';
			}

			progressBar = null;
		}

		_domContainer() {
			let container = document.createElement('div'); // class it

			container.classList.add('progress');
			container.classList.add('container'); // style it

			container.style.width = '100%';
			container.style.height = '8px';
			container.style.position = 'absolute';
			container.style.backgroundColor = 'rgba(158, 158, 158, 0.5)';
			container.style.top = '0';
			container.style.zIndex = '1';
			return container;
		}

		_domBar(mode) {
			if (!(mode.hasOwnProperty('name') && mode.hasOwnProperty('color'))) {
				console.log('Invalid mode provided.');
				console.log(mode);
				return false;
			}

			let bar = document.createElement('div'); // class it

			bar.classList.add(mode.name);
			bar.classList.add('progress'); // style it

			bar.style.border = '2px solid ' + mode.color;
			bar.style.width = '0%';
			return bar;
		}

		set totalFiles(totalFiles) {
			this._totalFiles = totalFiles;
		}

		get totalFiles() {
			return this._totalFiles;
		}

	}

	/**
	 * Event Based progressbar
	 * @module helpers/progressBar
	 *
	 * @example
	 *
	 * let loader = new LoadersVolume();
	 * const domContainer = document.getElementById('progressbar');
	 * const pb = new HelpersProgressBarEventBased(loader, domContainer);
	 */

	class HelpersProgressBarEventBased {
		constructor(emitter, domTarget) {
			if (!emitter || !this._isFunction(emitter.emit)) {
				console.error('please give the this._emitter instance');
				return;
			}

			if (CoreUtils.isString(domTarget)) {
				this._dom = document.getElementById(domTarget);
			} else {
				this._dom = domTarget;
			}

			if (!CoreUtils.isElement(this._dom)) {
				console.error('please give the id of container dom or directly a dom instance');
				return;
			}

			this._emitter = emitter;
			this.initContainerDom();
			this.initEventListenner();
			this.loaded = 0;
			this.totalFile = 0;
		}

		_isFunction(fn) {
			return Object.prototype.toString.call(fn) === '[object Function]';
		}

		initEventListenner() {
			const self = this;

			this._emitter.on('load-start', function (event) {
				const totalFiles = event.files.length;
				self.totalFile = totalFiles;
				self._domTotalFile.innerHTML = totalFiles;
			});

			this._emitter.on('fetch-start', function (event) {
				const fetchLi = document.createElement('li');
				const fileTag = document.createElement('div');
				fileTag.innerHTML = 'file: ' + event.file;
				fileTag.style.color = '#ffffff';
				fetchLi.append(fileTag);
				fetchLi.className = 'fetch-file';
				fetchLi.id = 'file-' + event.file;
				fetchLi.style.marginBottom = '7px';
				fetchLi.style.border = '1px solid #ffffff;';
				fetchLi.style.width = '60%';
				const fetchprogress = document.createElement('div');
				fetchprogress.id = 'file-fetch-' + event.file;
				fetchprogress.style.width = '0%';
				fetchLi.append(fetchprogress);

				self._domProcessList.append(fetchLi);
			});

			this._emitter.on('fetch-progress', function (event) {
				const id = 'file-fetch-' + event.file;
				const fileFetchDom = document.getElementById(id);
				fileFetchDom.style.width = event.loaded / event.total * 100 + '%';
				fileFetchDom.style.border = '1px solid red';
			});

			this._emitter.on('fetch-success', function (event) {
				// show result
				const liParent = document.getElementById('file-' + event.file);
				const result = document.createElement('div');
				result.id = 'file-result-' + event.file;
				result.innerHTML = 'fetch-success';
				result.style.color = '#ffffff';
				liParent.append(result);
			});

			this._emitter.on('fetch-error', function (event) {// console.log(event);
			});

			this._emitter.on('fetch-abort', function (event) {// console.log(event);
			});

			this._emitter.on('fetch-end', function (event) {// console.log(event);
			});

			this._emitter.on('fetch-timeout', function (event) {// console.log(event);
			});

			this._emitter.on('parse-start', function (event) {
				const liParent = document.getElementById('file-' + event.file);
				const parseprogress = document.createElement('div');
				parseprogress.id = 'file-parse-' + event.file;
				parseprogress.style.width = '0%';
				liParent.append(parseprogress);
			});

			this._emitter.on('parsing', function (event) {
				const id = 'file-parse-' + event.file;
				const fileParseDom = document.getElementById(id);
				fileParseDom.style.width = event.parsed / event.total * 100 + '%';
				fileParseDom.style.border = '1px solid yellow';
			});

			this._emitter.on('parse-success', function (event) {
				self.loaded += 1;
				self._domCurrentFile.innerHTML = self.loaded;
				self._domCurrentProgress.style.width = self.loaded / self.totalFile * 100 + '%'; // show result

				const liParent = document.getElementById('file-' + event.file);
				const result = document.createElement('div');
				result.id = 'file-result-' + event.file;
				result.innerHTML = 'parse-success';
				result.style.color = '#ffffff';
				liParent.append(result);
			});
		}

		initContainerDom() {
			const containerDom = `
			<div id="ami-progress-bar-container" style="background-color: rgb(33, 33, 33); color: #ffffff;">
			<div>
			<label for="progress-bar" id="progress-label" style="width: 60%; border: 1px solid #ffffff; text-align: center;">
			<span id="current-file-index">0</span>
			<span id="total-file">0</span>
			</label>
			<div id="progress-bar" style="width: 60%; border: 1px solid #ffffff; text-align: center;">
			<div id="current-progress" style="border: 1px solid red; width: 0%;"></div>
			</div>
			</div>
			<ul id="process-list" style="list-style-type: none; padding: 0; overflow-y: auto;">
			</ul>
			</div>`;
			const wrap = document.createElement('div');
			wrap.innerHTML = containerDom;

			this._dom.append(wrap); // dom interface


			this._domCurrentFile = document.getElementById('current-file-index');
			this._domTotalFile = document.getElementById('total-file');
			this._domProcessList = document.getElementById('process-list');
			this._domCurrentProgress = document.getElementById('current-progress');
		}

	}

	/**
	 * @module shaders/data
	 */

	class ShadersUniform$2 {
		/**
		 * Shaders data uniforms
		 */
		static uniforms() {
			return {
				uTextureSize: {
					type: 'i',
					value: 0,
					typeGLSL: 'int'
				},
				uTextureContainer: {
					type: 'tv',
					value: [],
					typeGLSL: 'sampler2D',
					length: 7
				},
				uDataDimensions: {
					type: 'iv',
					value: [0, 0, 0],
					typeGLSL: 'ivec3'
				},
				uWorldToData: {
					type: 'm4',
					value: new three.Matrix4(),
					typeGLSL: 'mat4'
				},
				uWindowCenterWidth: {
					type: 'fv1',
					value: [0.0, 0.0],
					typeGLSL: 'float',
					length: 2
				},
				uLowerUpperThreshold: {
					type: 'fv1',
					value: [0.0, 0.0],
					typeGLSL: 'float',
					length: 2
				},
				uRescaleSlopeIntercept: {
					type: 'fv1',
					value: [0.0, 0.0],
					typeGLSL: 'float',
					length: 2
				},
				uNumberOfChannels: {
					type: 'i',
					value: 1,
					typeGLSL: 'int'
				},
				uBitsAllocated: {
					type: 'i',
					value: 8,
					typeGLSL: 'int'
				},
				uInvert: {
					type: 'i',
					value: 0,
					typeGLSL: 'int'
				},
				uLut: {
					type: 'i',
					value: 0,
					typeGLSL: 'int'
				},
				uTextureLUT: {
					type: 't',
					value: [],
					typeGLSL: 'sampler2D'
				},
				uLutSegmentation: {
					type: 'i',
					value: 0,
					typeGLSL: 'int'
				},
				uTextureLUTSegmentation: {
					type: 't',
					value: [],
					typeGLSL: 'sampler2D'
				},
				uPixelType: {
					type: 'i',
					value: 0,
					typeGLSL: 'int'
				},
				uPackedPerPixel: {
					type: 'i',
					value: 1,
					typeGLSL: 'int'
				},
				uInterpolation: {
					type: 'i',
					value: 1,
					typeGLSL: 'int'
				},
				uCanvasWidth: {
					type: 'f',
					value: 0,
					typeGLSL: 'float'
				},
				uCanvasHeight: {
					type: 'f',
					value: 0,
					typeGLSL: 'float'
				},
				uBorderColor: {
					type: 'v3',
					value: [1.0, 0.0, 0.5],
					typeGLSL: 'vec3'
				},
				uBorderWidth: {
					type: 'f',
					value: 2,
					typeGLSL: 'float'
				},
				uBorderMargin: {
					type: 'f',
					value: 2,
					typeGLSL: 'float'
				},
				uBorderDashLength: {
					type: 'f',
					value: 10,
					typeGLSL: 'float'
				},
				uOpacity: {
					type: 'f',
					value: 1.0,
					typeGLSL: 'float'
				},
				uSpacing: {
					type: 'f',
					value: 0,
					typeGLSL: 'float'
				},
				uThickness: {
					type: 'f',
					value: 0,
					typeGLSL: 'float'
				},
				uThicknessMethod: {
					type: 'i',
					value: 0,
					typeGLSL: 'int'
				}
			};
		}

	}

	class ShadersVertex$2 {
		compute() {
			return `
varying vec3 vPos;
varying vec3 vNormal;

void main() {
	vNormal = normal;
	vPos = (modelMatrix * vec4(position, 1.0 )).xyz;
	gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0 );

}
				`;
		}

	}

	class ShadersBase {
		constructor() {
			this._name = 'shadersBase';
			this._base = {
				_functions: {},
				_uniforms: {}
			};
			this._definition = '';
		}

		get name() {
			return this._name;
		}

		set name(name) {
			this._name = name;
		}

	}

	/**
	 * Set of methods to unpack values from [r][b][g][a] -> float
	 */

	class Unpack extends ShadersBase {
		/**
		 * Constructor
		 */
		constructor() {
			super();
			this.name = 'unpack'; // default properties names

			this._packedData = 'packedData';
			this._offset = 'offset';
			this._unpackedData = 'unpackedData';
			this._base._uniforms = {
				uNumberOfChannels: {
					value: 1
				},
				uBitsAllocated: {
					value: 16
				},
				uPixelType: {
					value: 0
				}
			};
		}

		api(baseFragment = this._base, packedData = this._packedData, offset = this._offset, unpackedData = this._unpackedData) {
			this._base = baseFragment;
			return this.compute(packedData, offset, unpackedData);
		}

		compute(packedData, offset, unpackedData) {
			this.computeDefinition();
			this._base._functions[this._name] = this._definition;
			return `${this._name}(${packedData}, ${offset}, ${unpackedData});`;
		}

		computeDefinition() {
			// fun stuff
			let content = '';

			if (this._base._uniforms.uNumberOfChannels.value === 1) {
				switch (this._base._uniforms.uBitsAllocated.value) {
					case 1:
					case 8:
						content = this.upack8();
						break;

					case 16:
						content = this.upack16();
						break;

					case 32:
						content = this.upack32();
						break;

					default:
						content = this.upackIdentity();
						break;
				}
			} else {
				content = this.upackIdentity();
			}

			this._definition = `
void ${this._name}(in vec4 packedData, in int offset, out vec4 unpackedData){

${content}

}	
		`;
		}

		upack8() {
			this._base._functions['uInt8'] = this.uInt8();
			return `
float floatedOffset = float(offset);
float floatedOffsetSquared = floatedOffset * floatedOffset;
uInt8(
	step( floatedOffsetSquared , 0.0 ) * packedData.r +
	step( floatedOffsetSquared - 2. * floatedOffset + 1., 0.0 ) * packedData.g +
	step( floatedOffsetSquared - 2. * 2. *	floatedOffset + 4., 0.0 ) * packedData.b +
	step( floatedOffsetSquared - 2. * 3. *	floatedOffset + 9., 0.0 ) * packedData.a
	,
	unpackedData.x);
		`;
		}

		upack16() {
			this._base._functions['uInt16'] = this.uInt16();
			return `
float floatedOffset = float(offset);
uInt16(
	packedData.r * (1. - floatedOffset) + packedData.b * floatedOffset,
	packedData.g * (1. - floatedOffset) + packedData.a * floatedOffset,
	unpackedData.x);
		`;
		}

		upack32() {
			if (this._base._uniforms.uPixelType.value === 0) {
				this._base._functions['uInt32'] = this.uInt32();
				return `
uInt32(
	packedData.r,
	packedData.g,
	packedData.b,
	packedData.a,
	unpackedData.x);
			`;
			} else {
				this._base._functions['uFloat32'] = this.uFloat32();
				return `
uFloat32(
	packedData.r,
	packedData.g,
	packedData.b,
	packedData.a,
	unpackedData.x);
			`;
			}
		}

		upackIdentity() {
			return `
unpackedData = packedData;
			`;
		}

		uInt8() {
			return `
void uInt8(in float r, out float value){
	value = r * 255.;
}
		`;
		}

		uInt16() {
			return `
void uInt16(in float r, in float a, out float value){
	value = r * 255. + a * 255. * 256.;
}
		`;
		}

		uInt32() {
			return `
void uInt32(in float r, in float g, in float b, in float a, out float value){
	value = r * 255. + g * 255. * 256. + b * 255. * 256. * 256. + a * 255. * 256. * 256. * 256.;
	// value = r * 255. + g * 65025. + b * 16581375. + a * 4228250625.;
}
		`;
		}

		uFloat32() {
			return `
void uFloat32(in float r, in float g, in float b, in float a, out float value){

	// create arrays containing bits for rgba values
	// value between 0 and 255
	value = r * 255.;
	int bytemeR[8];
	bytemeR[0] = int(floor(value / 128.));
	value -= float(bytemeR[0] * 128);
	bytemeR[1] = int(floor(value / 64.));
	value -= float(bytemeR[1] * 64);
	bytemeR[2] = int(floor(value / 32.));
	value -= float(bytemeR[2] * 32);
	bytemeR[3] = int(floor(value / 16.));
	value -= float(bytemeR[3] * 16);
	bytemeR[4] = int(floor(value / 8.));
	value -= float(bytemeR[4] * 8);
	bytemeR[5] = int(floor(value / 4.));
	value -= float(bytemeR[5] * 4);
	bytemeR[6] = int(floor(value / 2.));
	value -= float(bytemeR[6] * 2);
	bytemeR[7] = int(floor(value));

	value = g * 255.;
	int bytemeG[8];
	bytemeG[0] = int(floor(value / 128.));
	value -= float(bytemeG[0] * 128);
	bytemeG[1] = int(floor(value / 64.));
	value -= float(bytemeG[1] * 64);
	bytemeG[2] = int(floor(value / 32.));
	value -= float(bytemeG[2] * 32);
	bytemeG[3] = int(floor(value / 16.));
	value -= float(bytemeG[3] * 16);
	bytemeG[4] = int(floor(value / 8.));
	value -= float(bytemeG[4] * 8);
	bytemeG[5] = int(floor(value / 4.));
	value -= float(bytemeG[5] * 4);
	bytemeG[6] = int(floor(value / 2.));
	value -= float(bytemeG[6] * 2);
	bytemeG[7] = int(floor(value));

	value = b * 255.;
	int bytemeB[8];
	bytemeB[0] = int(floor(value / 128.));
	value -= float(bytemeB[0] * 128);
	bytemeB[1] = int(floor(value / 64.));
	value -= float(bytemeB[1] * 64);
	bytemeB[2] = int(floor(value / 32.));
	value -= float(bytemeB[2] * 32);
	bytemeB[3] = int(floor(value / 16.));
	value -= float(bytemeB[3] * 16);
	bytemeB[4] = int(floor(value / 8.));
	value -= float(bytemeB[4] * 8);
	bytemeB[5] = int(floor(value / 4.));
	value -= float(bytemeB[5] * 4);
	bytemeB[6] = int(floor(value / 2.));
	value -= float(bytemeB[6] * 2);
	bytemeB[7] = int(floor(value));

	value = a * 255.;
	int bytemeA[8];
	bytemeA[0] = int(floor(value / 128.));
	value -= float(bytemeA[0] * 128);
	bytemeA[1] = int(floor(value / 64.));
	value -= float(bytemeA[1] * 64);
	bytemeA[2] = int(floor(value / 32.));
	value -= float(bytemeA[2] * 32);
	bytemeA[3] = int(floor(value / 16.));
	value -= float(bytemeA[3] * 16);
	bytemeA[4] = int(floor(value / 8.));
	value -= float(bytemeA[4] * 8);
	bytemeA[5] = int(floor(value / 4.));
	value -= float(bytemeA[5] * 4);
	bytemeA[6] = int(floor(value / 2.));
	value -= float(bytemeA[6] * 2);
	bytemeA[7] = int(floor(value));

	// compute float32 value from bit arrays

	// sign
	int issigned = 1 - 2 * bytemeR[0];
	//	 issigned = int(pow(-1., float(bytemeR[0])));

	// exponent
	int exponent = 0;

	exponent += bytemeR[1] * int(pow(2., 7.));
	exponent += bytemeR[2] * int(pow(2., 6.));
	exponent += bytemeR[3] * int(pow(2., 5.));
	exponent += bytemeR[4] * int(pow(2., 4.));
	exponent += bytemeR[5] * int(pow(2., 3.));
	exponent += bytemeR[6] * int(pow(2., 2.));
	exponent += bytemeR[7] * int(pow(2., 1.));

	exponent += bytemeG[0];


	// fraction
	float fraction = 0.;

	fraction = float(bytemeG[1]) * pow(2., -1.);
	fraction += float(bytemeG[2]) * pow(2., -2.);
	fraction += float(bytemeG[3]) * pow(2., -3.);
	fraction += float(bytemeG[4]) * pow(2., -4.);
	fraction += float(bytemeG[5]) * pow(2., -5.);
	fraction += float(bytemeG[6]) * pow(2., -6.);
	fraction += float(bytemeG[7]) * pow(2., -7.);

	fraction += float(bytemeB[0]) * pow(2., -8.);
	fraction += float(bytemeB[1]) * pow(2., -9.);
	fraction += float(bytemeB[2]) * pow(2., -10.);
	fraction += float(bytemeB[3]) * pow(2., -11.);
	fraction += float(bytemeB[4]) * pow(2., -12.);
	fraction += float(bytemeB[5]) * pow(2., -13.);
	fraction += float(bytemeB[6]) * pow(2., -14.);
	fraction += float(bytemeB[7]) * pow(2., -15.);

	fraction += float(bytemeA[0]) * pow(2., -16.);
	fraction += float(bytemeA[1]) * pow(2., -17.);
	fraction += float(bytemeA[2]) * pow(2., -18.);
	fraction += float(bytemeA[3]) * pow(2., -19.);
	fraction += float(bytemeA[4]) * pow(2., -20.);
	fraction += float(bytemeA[5]) * pow(2., -21.);
	fraction += float(bytemeA[6]) * pow(2., -22.);
	fraction += float(bytemeA[7]) * pow(2., -23.);

	value = float(issigned) * pow( 2., float(exponent - 127)) * (1. + fraction);
}
		`;
		}

	}

	var Unpack$1 = new Unpack();

	class Texture3d extends ShadersBase {
		constructor() {
			super();
			this.name = 'texture3d'; // default properties names

			this._dataCoordinates = 'dataCoordinates';
			this._dataValue = 'dataValue';
			this._offset = 'offset';
		}

		api(baseFragment = this._base, dataCoordinates = this._dataCoordinates, dataValue = this._dataValue, offset = this._offset) {
			this._base = baseFragment;
			return this.compute(dataCoordinates, dataValue, offset);
		}

		compute(dataCoordinates, dataValue, offset) {
			this.computeDefinition();
			this._base._functions[this._name] = this._definition;
			return `${this._name}(${dataCoordinates}, ${dataValue}, ${offset});`;
		}

		computeDefinition() {
			let content = `
			step( abs( textureIndexF - 0.0 ), 0.0 ) * texture2D(uTextureContainer[0], uv) +
			step( abs( textureIndexF - 1.0 ), 0.0 ) * texture2D(uTextureContainer[1], uv) +
			step( abs( textureIndexF - 2.0 ), 0.0 ) * texture2D(uTextureContainer[2], uv) +
			step( abs( textureIndexF - 3.0 ), 0.0 ) * texture2D(uTextureContainer[3], uv) +
			step( abs( textureIndexF - 4.0 ), 0.0 ) * texture2D(uTextureContainer[4], uv) +
			step( abs( textureIndexF - 5.0 ), 0.0 ) * texture2D(uTextureContainer[5], uv) +
			step( abs( textureIndexF - 6.0 ), 0.0 ) * texture2D(uTextureContainer[6], uv)`;

			if (this._base._uniforms.uTextureContainer.length === 14) {
				content += ` +
			step( abs( textureIndexF - 7.0 ), 0.0 ) * texture2D(uTextureContainer[7], uv) +
			step( abs( textureIndexF - 8.0 ), 0.0 ) * texture2D(uTextureContainer[8], uv) +
			step( abs( textureIndexF - 9.0 ), 0.0 ) * texture2D(uTextureContainer[9], uv) +
			step( abs( textureIndexF - 10.0 ), 0.0 ) * texture2D(uTextureContainer[10], uv) +
			step( abs( textureIndexF - 11.0 ), 0.0 ) * texture2D(uTextureContainer[11], uv) +
			step( abs( textureIndexF - 12.0 ), 0.0 ) * texture2D(uTextureContainer[12], uv) +
			step( abs( textureIndexF - 13.0 ), 0.0 ) * texture2D(uTextureContainer[13], uv)`;
			}

			this._definition = `
void ${this._name}(in ivec3 dataCoordinates, out vec4 dataValue, out int offset){
	float textureSizeF = float(uTextureSize);
	int voxelsPerTexture = uTextureSize*uTextureSize;

	int index = dataCoordinates.x
						+ dataCoordinates.y * uDataDimensions.x
						+ dataCoordinates.z * uDataDimensions.y * uDataDimensions.x;
	
	// dividing an integer by an integer will give you an integer result, rounded down
	// can not get float numbers to work :(
	int packedIndex = index/uPackedPerPixel;
	offset = index - uPackedPerPixel*packedIndex;

	// Map data index to right sampler2D texture
	int textureIndex = packedIndex/voxelsPerTexture;
	int inTextureIndex = packedIndex - voxelsPerTexture*textureIndex;

	// Get row and column in the texture
	int rowIndex = inTextureIndex/uTextureSize;
	float rowIndexF = float(rowIndex);
	float colIndex = float(inTextureIndex - uTextureSize * rowIndex);

	// Map row and column to uv
	vec2 uv = vec2(0,0);
	uv.x = (0.5 + colIndex) / textureSizeF;
	uv.y = 1. - (0.5 + rowIndexF) / textureSizeF;

	float textureIndexF = float(textureIndex);
	dataValue = vec4(0.) + ${content};
}
		`;
		}

	}

	var Texture3d$1 = new Texture3d();

	class InterpolationIdentity extends ShadersBase {
		constructor() {
			super();
			this.name = 'interpolationIdentity'; // default properties names

			this._currentVoxel = 'currentVoxel';
			this._dataValue = 'dataValue';
		}

		api(baseFragment = this._base, currentVoxel = this._currentVoxel, dataValue = this._dataValue) {
			this._base = baseFragment;
			return this.compute(currentVoxel, dataValue);
		}

		compute(currentVoxel, dataValue) {
			this.computeDefinition();
			this._base._functions[this._name] = this._definition;
			return `${this._name}(${currentVoxel}, ${dataValue});`;
		}

		computeDefinition() {
			this._definition = `
void ${this._name}(in vec3 currentVoxel, out vec4 dataValue){
	// lower bound
	vec3 rcurrentVoxel = vec3(floor(currentVoxel.x + 0.5 ), floor(currentVoxel.y + 0.5 ), floor(currentVoxel.z + 0.5 ));
	ivec3 voxel = ivec3(int(rcurrentVoxel.x), int(rcurrentVoxel.y), int(rcurrentVoxel.z));

	vec4 tmp = vec4(0., 0., 0., 0.);
	int offset = 0;

	${Texture3d$1.api(this._base, 'voxel', 'tmp', 'offset')}
	${Unpack$1.api(this._base, 'tmp', 'offset', 'dataValue')}
}
		`;
		}

	}

	var InterpolationIdentity$1 = new InterpolationIdentity();

	class InterpolationTrilinear extends ShadersBase {
		constructor() {
			super();
			this.name = 'interpolationTrilinear'; // default properties names

			this._currentVoxel = 'currentVoxel';
			this._dataValue = 'dataValue';
			this._gradient = 'gradient';
		}

		api(baseFragment = this._base, currentVoxel = this._currentVoxel, dataValue = this._dataValue, gradient = this._gradient) {
			this._base = baseFragment;
			return this.compute(currentVoxel, dataValue, gradient);
		}

		compute(currentVoxel, dataValue, gradient) {
			this.computeDefinition();
			this._base._functions[this._name] = this._definition;
			return `${this._name}(${currentVoxel}, ${dataValue}, ${gradient});`;
		}

		computeDefinition() {
			this._definition = `
void trilinearInterpolation(
	in vec3 normalizedPosition,
	out vec4 interpolatedValue,
	in vec4 v000, in vec4 v100,
	in vec4 v001, in vec4 v101,
	in vec4 v010, in vec4 v110,
	in vec4 v011, in vec4 v111) {
	// https://en.wikipedia.org/wiki/Trilinear_interpolation
	vec4 c00 = v000 * ( 1.0 - normalizedPosition.x ) + v100 * normalizedPosition.x;
	vec4 c01 = v001 * ( 1.0 - normalizedPosition.x ) + v101 * normalizedPosition.x;
	vec4 c10 = v010 * ( 1.0 - normalizedPosition.x ) + v110 * normalizedPosition.x;
	vec4 c11 = v011 * ( 1.0 - normalizedPosition.x ) + v111 * normalizedPosition.x;

	// c0 and c1
	vec4 c0 = c00 * ( 1.0 - normalizedPosition.y) + c10 * normalizedPosition.y;
	vec4 c1 = c01 * ( 1.0 - normalizedPosition.y) + c11 * normalizedPosition.y;

	// c
	vec4 c = c0 * ( 1.0 - normalizedPosition.z) + c1 * normalizedPosition.z;
	interpolatedValue = c;
}

void ${this._name}(in vec3 currentVoxel, out vec4 dataValue, out vec3 gradient){

	vec3 lower_bound = floor(currentVoxel);
	lower_bound = max(vec3(0.), lower_bound);
	
	vec3 higher_bound = lower_bound + vec3(1.);

	vec3 normalizedPosition = (currentVoxel - lower_bound);
	normalizedPosition =	max(vec3(0.), normalizedPosition);

	vec4 interpolatedValue = vec4(0.);

	//
	// fetch values required for interpolation
	//
	vec4 v000 = vec4(0.0, 0.0, 0.0, 0.0);
	vec3 c000 = vec3(lower_bound.x, lower_bound.y, lower_bound.z);
	${InterpolationIdentity$1.api(this._base, 'c000', 'v000')}

	//
	vec4 v100 = vec4(0.0, 0.0, 0.0, 0.0);
	vec3 c100 = vec3(higher_bound.x, lower_bound.y, lower_bound.z);
	${InterpolationIdentity$1.api(this._base, 'c100', 'v100')}

	//
	vec4 v001 = vec4(0.0, 0.0, 0.0, 0.0);
	vec3 c001 = vec3(lower_bound.x, lower_bound.y, higher_bound.z);
	${InterpolationIdentity$1.api(this._base, 'c001', 'v001')}

	//
	vec4 v101 = vec4(0.0, 0.0, 0.0, 0.0);
	vec3 c101 = vec3(higher_bound.x, lower_bound.y, higher_bound.z);
	${InterpolationIdentity$1.api(this._base, 'c101', 'v101')}
	
	//
	vec4 v010 = vec4(0.0, 0.0, 0.0, 0.0);
	vec3 c010 = vec3(lower_bound.x, higher_bound.y, lower_bound.z);
	${InterpolationIdentity$1.api(this._base, 'c010', 'v010')}

	vec4 v110 = vec4(0.0, 0.0, 0.0, 0.0);
	vec3 c110 = vec3(higher_bound.x, higher_bound.y, lower_bound.z);
	${InterpolationIdentity$1.api(this._base, 'c110', 'v110')}

	//
	vec4 v011 = vec4(0.0, 0.0, 0.0, 0.0);
	vec3 c011 = vec3(lower_bound.x, higher_bound.y, higher_bound.z);
	${InterpolationIdentity$1.api(this._base, 'c011', 'v011')}

	vec4 v111 = vec4(0.0, 0.0, 0.0, 0.0);
	vec3 c111 = vec3(higher_bound.x, higher_bound.y, higher_bound.z);
	${InterpolationIdentity$1.api(this._base, 'c111', 'v111')}

	// compute interpolation at position
	trilinearInterpolation(normalizedPosition, interpolatedValue ,v000, v100, v001, v101, v010,v110, v011,v111);
	dataValue = interpolatedValue;

	// That breaks shading in volume rendering
	// if (gradient.x == 1.) { // skip gradient calculation for slice helper
	//	return;
	// }

	// compute gradient
	float gradientStep = 0.005;

	// x axis
	vec3 g100 = vec3(1., 0., 0.);
	vec3 ng100 = normalizedPosition + g100 * gradientStep;
	ng100.x = min(1., ng100.x);

	vec4 vg100 = vec4(0.);
	trilinearInterpolation(ng100, vg100 ,v000, v100, v001, v101, v010,v110, v011,v111);

	vec3 go100 = -g100;
	vec3 ngo100 = normalizedPosition + go100 * gradientStep;
	ngo100.x = max(0., ngo100.x);

	vec4 vgo100 = vec4(0.);
	trilinearInterpolation(ngo100, vgo100 ,v000, v100, v001, v101, v010,v110, v011,v111);

	gradient.x = (g100.x * vg100.x + go100.x * vgo100.x);

	// y axis
	vec3 g010 = vec3(0., 1., 0.);
	vec3 ng010 = normalizedPosition + g010 * gradientStep;
	ng010.y = min(1., ng010.y);

	vec4 vg010 = vec4(0.);
	trilinearInterpolation(ng010, vg010 ,v000, v100, v001, v101, v010,v110, v011,v111);

	vec3 go010 = -g010;
	vec3 ngo010 = normalizedPosition + go010 * gradientStep;
	ngo010.y = max(0., ngo010.y);

	vec4 vgo010 = vec4(0.);
	trilinearInterpolation(ngo010, vgo010 ,v000, v100, v001, v101, v010,v110, v011,v111);

	gradient.y = (g010.y * vg010.x + go010.y * vgo010.x);

	// z axis
	vec3 g001 = vec3(0., 0., 1.);
	vec3 ng001 = normalizedPosition + g001 * gradientStep;
	ng001.z = min(1., ng001.z);

	vec4 vg001 = vec4(0.);
	trilinearInterpolation(ng001, vg001 ,v000, v100, v001, v101, v010,v110, v011,v111);

	vec3 go001 = -g001;
	vec3 ngo001 = normalizedPosition + go001 * gradientStep;
	ngo001.z = max(0., ngo001.z);

	vec4 vgo001 = vec4(0.);
	trilinearInterpolation(ngo001, vgo001 ,v000, v100, v001, v101, v010,v110, v011,v111);

	gradient.z = (g001.z * vg001.x + go001.z * vgo001.x);

	// normalize gradient
	// +0.0001	instead of if?
	float gradientMagnitude = length(gradient);
	if (gradientMagnitude > 0.0) {
		gradient = -(1. / gradientMagnitude) * gradient;
	}
}
		`;
		}

	}

	var InterpolationTrilinear$1 = new InterpolationTrilinear();

	function shadersInterpolation(baseFragment, currentVoxel, dataValue, gradient) {
		switch (baseFragment._uniforms.uInterpolation.value) {
			case 0:
				// no interpolation
				return InterpolationIdentity$1.api(baseFragment, currentVoxel, dataValue);

			case 1:
				// trilinear interpolation
				return InterpolationTrilinear$1.api(baseFragment, currentVoxel, dataValue, gradient);

			default:
				return InterpolationIdentity$1.api(baseFragment, currentVoxel, dataValue);
		}
	}

	class ShadersFragment$2 {
		// pass uniforms object
		constructor(uniforms) {
			this._uniforms = uniforms;
			this._functions = {};
			this._main = '';
		}

		functions() {
			if (this._main === '') {
				// if main is empty, functions can not have been computed
				this.main();
			}

			let content = '';

			for (let property in this._functions) {
				content += this._functions[property] + '\n';
			}

			return content;
		}

		uniforms() {
			let content = '';

			for (let property in this._uniforms) {
				let uniform = this._uniforms[property];
				content += `uniform ${uniform.typeGLSL} ${property}`;

				if (uniform && uniform.length) {
					content += `[${uniform.length}]`;
				}

				content += ';\n';
			}

			return content;
		}

		main() {
			// need to pre-call main to fill up the functions list
			this._main = `
void main(void) {

	// draw border if slice is cropped
	// float uBorderDashLength = 10.;

	if( uCanvasWidth > 0. &&
			((gl_FragCoord.x > uBorderMargin && (gl_FragCoord.x - uBorderMargin) < uBorderWidth) ||
			 (gl_FragCoord.x < (uCanvasWidth - uBorderMargin) && (gl_FragCoord.x + uBorderMargin) > (uCanvasWidth - uBorderWidth) ))){
		float valueY = mod(gl_FragCoord.y, 2. * uBorderDashLength);
		if( valueY < uBorderDashLength && gl_FragCoord.y > uBorderMargin && gl_FragCoord.y < (uCanvasHeight - uBorderMargin) ){
			gl_FragColor = vec4(uBorderColor, 1.);
			return;
		}
	}

	if( uCanvasHeight > 0. &&
			((gl_FragCoord.y > uBorderMargin && (gl_FragCoord.y - uBorderMargin) < uBorderWidth) ||
			 (gl_FragCoord.y < (uCanvasHeight - uBorderMargin) && (gl_FragCoord.y + uBorderMargin) > (uCanvasHeight - uBorderWidth) ))){
		float valueX = mod(gl_FragCoord.x, 2. * uBorderDashLength);
		if( valueX < uBorderDashLength && gl_FragCoord.x > uBorderMargin && gl_FragCoord.x < (uCanvasWidth - uBorderMargin) ){
			gl_FragColor = vec4(uBorderColor, 1.);
			return;
		}
	}

	// get texture coordinates of current pixel
	vec4 dataValue = vec4(0.);
	vec3 gradient = vec3(1.); // gradient calculations will be skipped if it is equal to vec3(1.) 
	float steps = floor(uThickness / uSpacing + 0.5);

	if (steps > 1.) {
		vec3 origin = vPos - uThickness * 0.5 * vNormal;
		vec4 dataValueAcc = vec4(0.);
		for (float step = 0.; step < 128.; step++) {
			if (step >= steps) {
				break;
			}

			vec4 dataCoordinates = uWorldToData * vec4(origin + step * uSpacing * vNormal, 1.);
			vec3 currentVoxel = dataCoordinates.xyz;
			${shadersInterpolation(this, 'currentVoxel', 'dataValueAcc', 'gradient')};

			if (step == 0.) {
				dataValue.r = dataValueAcc.r;
				continue;
			}

			if (uThicknessMethod == 0) {
				dataValue.r = max(dataValueAcc.r, dataValue.r);
			}
			if (uThicknessMethod == 1) {
				dataValue.r += dataValueAcc.r;
			}
			if (uThicknessMethod == 2) {
				dataValue.r = min(dataValueAcc.r, dataValue.r);
			}
		}

		if (uThicknessMethod == 1) {
			dataValue.r /= steps;
		}
	} else {
		vec4 dataCoordinates = uWorldToData * vec4(vPos, 1.);
		vec3 currentVoxel = dataCoordinates.xyz;
		${shadersInterpolation(this, 'currentVoxel', 'dataValue', 'gradient')}
	}

	if(uNumberOfChannels == 1){
		// rescale/slope
		float realIntensity = dataValue.r * uRescaleSlopeIntercept[0] + uRescaleSlopeIntercept[1];
	
		// threshold
		if (realIntensity < uLowerUpperThreshold[0] || realIntensity > uLowerUpperThreshold[1]) {
			discard;
		}
	
		// normalize
		float windowMin = uWindowCenterWidth[0] - uWindowCenterWidth[1] * 0.5;
		float normalizedIntensity =
			( realIntensity - windowMin ) / uWindowCenterWidth[1];
		dataValue.r = dataValue.g = dataValue.b = normalizedIntensity;
		dataValue.a = 1.;

		// apply LUT
		if(uLut == 1){
			// should opacity be grabbed there?
			dataValue = texture2D( uTextureLUT, vec2( normalizedIntensity , 1.0) );
		}
	
		// apply segmentation
		if(uLutSegmentation == 1){
			// should opacity be grabbed there?
			//
			float textureWidth = 256.;
			float textureHeight = 128.;
			float min = 0.;
			// start at 0!
			int adjustedIntensity = int(floor(realIntensity + 0.5));
	
			// Get row and column in the texture
			int colIndex = int(mod(float(adjustedIntensity), textureWidth));
			int rowIndex = int(floor(float(adjustedIntensity)/textureWidth));
	
			float texWidth = 1./textureWidth;
			float texHeight = 1./textureHeight;
		
			// Map row and column to uv
			vec2 uv = vec2(0,0);
			uv.x = 0.5 * texWidth + (texWidth * float(colIndex));
			uv.y = 1. - (0.5 * texHeight + float(rowIndex) * texHeight);
	
			dataValue = texture2D( uTextureLUTSegmentation, uv );
		}
	}

	if(uInvert == 1){
		dataValue.xyz = vec3(1.) - dataValue.xyz;
	}

	dataValue.a = dataValue.a*uOpacity;

	gl_FragColor = dataValue;
}
	 `;
		}

		compute() {
			return `
// uniforms
${this.uniforms()}

// varying (should fetch it from vertex directly)
varying vec3 vPos;
varying vec3 vNormal;

// tailored functions
${this.functions()}

// main loop
${this._main}
			`;
		}

	}

	/**
	 * Helpers material mixin.
	 *
	 * @module helpers/material/mixin
	 */

	class helpersMaterialMixin extends three.Object3D {
		_createMaterial(extraOptions) {
			// generate shaders on-demand!
			let fs = new this._shadersFragment(this._uniforms);
			let vs = new this._shadersVertex(); // material

			let globalOptions = {
				uniforms: this._uniforms,
				vertexShader: vs.compute(),
				fragmentShader: fs.compute()
			};
			let options = Object.assign(extraOptions, globalOptions);
			this._material = new three.ShaderMaterial(options);
			this._material.needsUpdate = true;
		}

		_updateMaterial() {
			// generate shaders on-demand!
			let fs = new this._shadersFragment(this._uniforms);
			let vs = new this._shadersVertex();
			this._material.vertexShader = vs.compute();
			this._material.fragmentShader = fs.compute();
			this._material.needsUpdate = true;
		}

		_prepareTexture() {
			this._textures = [];

			for (let m = 0; m < this._stack._rawData.length; m++) {
				let tex = new three.DataTexture(this._stack.rawData[m], this._stack.textureSize, this._stack.textureSize, this._stack.textureType, three.UnsignedByteType, three.UVMapping, three.ClampToEdgeWrapping, three.ClampToEdgeWrapping, three.NearestFilter, three.NearestFilter);
				tex.needsUpdate = true;
				tex.flipY = true;

				this._textures.push(tex);
			}
		}

	}

	/** * Imports ***/
	/**
	 * @module helpers/slice
	 */

	class helpersSlice extends helpersMaterialMixin {
		constructor(stack, index = 0, position = new three.Vector3(0, 0, 0), direction = new three.Vector3(0, 0, 1), aabbSpace = 'IJK') {
			//
			super(); // private vars

			this._stack = stack; // image settings
			// index only used to grab window/level and intercept/slope

			this._invert = this._stack.invert;
			this._lut = 'none';
			this._lutTexture = null; // if auto === true, get from index
			// else from stack which holds the default values

			this._intensityAuto = true;
			this._interpolation = 1; // default to trilinear interpolation
			// starts at 0

			this._index = index;
			this._windowWidth = null;
			this._windowCenter = null;
			this._opacity = 1;
			this._rescaleSlope = null;
			this._rescaleIntercept = null;
			this._spacing = 1;
			this._thickness = 0;
			this._thicknessMethod = 0; // default to MIP (Maximum Intensity Projection); 1 - Mean; 2 - MinIP
			// threshold

			this._lowerThreshold = null;
			this._upperThreshold = null;
			this._canvasWidth = 0;
			this._canvasHeight = 0;
			this._borderColor = null; // Object3D settings
			// shape

			this._planePosition = position;
			this._planeDirection = direction; // change aaBBSpace changes the box dimensions
			// also changes the transform
			// there is also a switch to move back mesh to LPS space automatically

			this._aaBBspace = aabbSpace; // or LPS -> different transforms, esp for the geometry/mesh

			this._material = null;
			this._textures = [];
			this._shadersFragment = ShadersFragment$2;
			this._shadersVertex = ShadersVertex$2;
			this._uniforms = ShadersUniform$2.uniforms();
			this._geometry = null;
			this._mesh = null;
			this._visible = true; // update dimensions, center, etc.
			// depending on aaBBSpace

			this._init(); // update object


			this._create();
		} // getters/setters


		get stack() {
			return this._stack;
		}

		set stack(stack) {
			this._stack = stack;
		}

		get spacing() {
			return this._spacing;
		}

		set spacing(spacing) {
			this._spacing = spacing;
			this._uniforms.uSpacing.value = this._spacing;
		}

		get thickness() {
			return this._thickness;
		}

		set thickness(thickness) {
			this._thickness = thickness;
			this._uniforms.uThickness.value = this._thickness;
		}

		get thicknessMethod() {
			return this._thicknessMethod;
		}

		set thicknessMethod(thicknessMethod) {
			this._thicknessMethod = thicknessMethod;
			this._uniforms.uThicknessMethod.value = this._thicknessMethod;
		}

		get windowWidth() {
			return this._windowWidth;
		}

		set windowWidth(windowWidth) {
			this._windowWidth = windowWidth;
			this.updateIntensitySettingsUniforms();
		}

		get windowCenter() {
			return this._windowCenter;
		}

		set windowCenter(windowCenter) {
			this._windowCenter = windowCenter;
			this.updateIntensitySettingsUniforms();
		}

		get opacity() {
			return this._opacity;
		}

		set opacity(opacity) {
			this._opacity = opacity;
			this.updateIntensitySettingsUniforms();
		} // adding thresholding method


		get upperThreshold() {
			return this._upperThreshold;
		}

		set upperThreshold(upperThreshold) {
			this._upperThreshold = upperThreshold;
			this.updateIntensitySettingsUniforms();
		}

		get lowerThreshold() {
			return this._lowerThreshold;
		}

		set lowerThreshold(lowerThreshold) {
			this._lowerThreshold = lowerThreshold;
			this.updateIntensitySettingsUniforms();
		}

		get rescaleSlope() {
			return this._rescaleSlope;
		}

		set rescaleSlope(rescaleSlope) {
			this._rescaleSlope = rescaleSlope;
			this.updateIntensitySettingsUniforms();
		}

		get rescaleIntercept() {
			return this._rescaleIntercept;
		}

		set rescaleIntercept(rescaleIntercept) {
			this._rescaleIntercept = rescaleIntercept;
			this.updateIntensitySettingsUniforms();
		}

		get invert() {
			return this._invert;
		}

		set invert(invert) {
			this._invert = invert;
			this.updateIntensitySettingsUniforms();
		}

		get lut() {
			return this._lut;
		}

		set lut(lut) {
			this._lut = lut;
		}

		get lutTexture() {
			return this._lutTexture;
		}

		set lutTexture(lutTexture) {
			this._lutTexture = lutTexture;
			this.updateIntensitySettingsUniforms();
		}

		get intensityAuto() {
			return this._intensityAuto;
		}

		set intensityAuto(intensityAuto) {
			this._intensityAuto = intensityAuto;
			this.updateIntensitySettings();
			this.updateIntensitySettingsUniforms();
		}

		get interpolation() {
			return this._interpolation;
		}

		set interpolation(interpolation) {
			this._interpolation = interpolation;
			this.updateIntensitySettingsUniforms();

			this._updateMaterial();
		}

		get index() {
			return this._index;
		}

		set index(index) {
			this._index = index;

			this._update();
		}

		set planePosition(position) {
			this._planePosition = position;

			this._update();
		}

		get planePosition() {
			return this._planePosition;
		}

		set planeDirection(direction) {
			this._planeDirection = direction;

			this._update();
		}

		get planeDirection() {
			return this._planeDirection;
		}

		set halfDimensions(halfDimensions) {
			this._halfDimensions = halfDimensions;
		}

		get halfDimensions() {
			return this._halfDimensions;
		}

		set center(center) {
			this._center = center;
		}

		get center() {
			return this._center;
		}

		set aabbSpace(aabbSpace) {
			this._aaBBspace = aabbSpace;

			this._init();
		}

		get aabbSpace() {
			return this._aaBBspace;
		}

		set mesh(mesh) {
			this._mesh = mesh;
		}

		get mesh() {
			return this._mesh;
		}

		set geometry(geometry) {
			this._geometry = geometry;
		}

		get geometry() {
			return this._geometry;
		}

		set canvasWidth(canvasWidth) {
			this._canvasWidth = canvasWidth;
			this._uniforms.uCanvasWidth.value = this._canvasWidth;
		}

		get canvasWidth() {
			return this._canvasWidth;
		}

		set canvasHeight(canvasHeight) {
			this._canvasHeight = canvasHeight;
			this._uniforms.uCanvasHeight.value = this._canvasHeight;
		}

		get canvasHeight() {
			return this._canvasHeight;
		}

		set borderColor(borderColor) {
			this._borderColor = borderColor;
			this._uniforms.uBorderColor.value = new three.Color(borderColor);
		}

		get borderColor() {
			return this._borderColor;
		}

		_init() {
			if (!this._stack || !this._stack._prepared || !this._stack._packed) {
				return;
			}

			if (this._aaBBspace === 'IJK') {
				this._halfDimensions = this._stack.halfDimensionsIJK;
				this._center = new three.Vector3(this._stack.halfDimensionsIJK.x - 0.5, this._stack.halfDimensionsIJK.y - 0.5, this._stack.halfDimensionsIJK.z - 0.5);
				this._toAABB = new three.Matrix4();
			} else {
				// LPS
				let aaBBox = this._stack.AABBox();

				this._halfDimensions = aaBBox.clone().multiplyScalar(0.5);
				this._center = this._stack.centerAABBox();
				this._toAABB = this._stack.lps2AABB;
			}
		} // private methods


		_create() {
			if (!this._stack || !this._stack.prepared || !this._stack.packed) {
				return;
			} // Convenience vars


			try {
				const SliceGeometryContructor = geometriesSlice();
				this._geometry = new SliceGeometryContructor(this._halfDimensions, this._center, this._planePosition, this._planeDirection, this._toAABB);
			} catch (e) {
				console.log(e);
				console.log('invalid slice geometry - exiting...');
				return;
			}

			if (!this._geometry.vertices) {
				return;
			}

			if (!this._material) {
				//
				this._uniforms.uTextureSize.value = this._stack.textureSize;
				this._uniforms.uDataDimensions.value = [this._stack.dimensionsIJK.x, this._stack.dimensionsIJK.y, this._stack.dimensionsIJK.z];
				this._uniforms.uWorldToData.value = this._stack.lps2IJK;
				this._uniforms.uNumberOfChannels.value = this._stack.numberOfChannels;
				this._uniforms.uPixelType.value = this._stack.pixelType;
				this._uniforms.uBitsAllocated.value = this._stack.bitsAllocated;
				this._uniforms.uPackedPerPixel.value = this._stack.packedPerPixel;
				this._uniforms.uSpacing.value = this._spacing;
				this._uniforms.uThickness.value = this._thickness;
				this._uniforms.uThicknessMethod.value = this._thicknessMethod; // compute texture if material exist

				this._prepareTexture();

				this._uniforms.uTextureContainer.value = this._textures;

				if (this._stack.textureUnits > 8) {
					this._uniforms.uTextureContainer.length = 14;
				}

				this._createMaterial({
					side: three.DoubleSide
				});
			} // update intensity related stuff


			this.updateIntensitySettings();
			this.updateIntensitySettingsUniforms(); // create the mesh!

			this._mesh = new three.Mesh(this._geometry, this._material);

			if (this._aaBBspace === 'IJK') {
				this._mesh.applyMatrix4(this._stack.ijk2LPS);
			}

			this._mesh.visible = this._visible; // and add it!

			this.add(this._mesh);
		}

		updateIntensitySettings() {
			// if auto, get from frame index
			if (this._intensityAuto) {
				this.updateIntensitySetting('windowCenter');
				this.updateIntensitySetting('windowWidth');
				this.updateIntensitySetting('rescaleSlope');
				this.updateIntensitySetting('rescaleIntercept');
			} else {
				if (this._windowCenter === null) {
					this._windowCenter = this._stack.windowCenter;
				}

				if (this._windowWidth === null) {
					this._windowWidth = this._stack.windowWidth;
				}

				if (this._rescaleSlope === null) {
					this._rescaleSlope = this._stack.rescaleSlope;
				}

				if (this._rescaleIntercept === null) {
					this._rescaleIntercept = this._stack.rescaleIntercept;
				}
			} // adding thresholding


			if (this._upperThreshold === null) {
				this._upperThreshold = this._stack._minMax[1];
			}

			if (this._lowerThreshold === null) {
				this._lowerThreshold = this._stack._minMax[0];
			}
		}

		updateIntensitySettingsUniforms() {
			// compensate for the offset to only pass > 0 values to shaders
			// models > models.stack.js : _packTo8Bits
			let offset = 0;

			if (this._stack._minMax[0] < 0) {
				offset -= this._stack._minMax[0];
			} // set slice window center and width


			this._uniforms.uRescaleSlopeIntercept.value = [this._rescaleSlope, this._rescaleIntercept];
			this._uniforms.uWindowCenterWidth.value = [offset + this._windowCenter, this._windowWidth]; // set slice opacity

			this._uniforms.uOpacity.value = this._opacity; // set slice upper/lower threshold

			this._uniforms.uLowerUpperThreshold.value = [offset + this._lowerThreshold, offset + this._upperThreshold]; // invert

			this._uniforms.uInvert.value = this._invert === true ? 1 : 0; // interpolation

			this._uniforms.uInterpolation.value = this._interpolation; // lut

			if (this._lut === 'none') {
				this._uniforms.uLut.value = 0;
			} else {
				this._uniforms.uLut.value = 1;
				this._uniforms.uTextureLUT.value = this._lutTexture;
			}
		}

		updateIntensitySetting(setting) {
			if (this._stack.frame[this._index] && this._stack.frame[this._index][setting]) {
				this['_' + setting] = this._stack.frame[this._index][setting];
			} else {
				this['_' + setting] = this._stack[setting];
			}
		}

		_update() {
			// update slice
			if (this._mesh) {
				this.remove(this._mesh);

				this._mesh.geometry.dispose();

				this._mesh.geometry = null; // we do not want to dispose the texture!
				// this._mesh.material.dispose();
				// this._mesh.material = null;

				this._mesh = null;
			}

			this._create();
		}

		dispose() {
			// Release memory
			for (let j = 0; j < this._textures.length; j++) {
				this._textures[j].dispose();

				this._textures[j] = null;
			}

			this._textures = null;
			this._shadersFragment = null;
			this._shadersVertex = null;
			this._uniforms = null; // material, geometry and mesh

			this.remove(this._mesh);

			this._mesh.geometry.dispose();

			this._mesh.geometry = null;

			this._mesh.material.dispose();

			this._mesh.material = null;
			this._mesh = null;

			this._geometry.dispose();

			this._geometry = null;
			this._material.vertexShader = null;
			this._material.fragmentShader = null;
			this._material.uniforms = null;

			this._material.dispose();

			this._material = null;
			this._stack = null;
		}

		cartesianEquation() {
			// Make sure we have a geometry
			if (!this._geometry || !this._geometry.vertices || this._geometry.vertices.length < 3) {
				return new three.Vector4();
			}

			let vertices = this._geometry.vertices;
			let dataToWorld = this._stack.ijk2LPS;
			let p1 = new three.Vector3(vertices[0].x, vertices[0].y, vertices[0].z).applyMatrix4(dataToWorld);
			let p2 = new three.Vector3(vertices[1].x, vertices[1].y, vertices[1].z).applyMatrix4(dataToWorld);
			let p3 = new three.Vector3(vertices[2].x, vertices[2].y, vertices[2].z).applyMatrix4(dataToWorld);
			let v1 = new three.Vector3();
			let v2 = new three.Vector3();
			let normal = v1.subVectors(p3, p2).cross(v2.subVectors(p1, p2)).normalize();
			return new three.Vector4(normal.x, normal.y, normal.z, -normal.dot(p1));
		}

	}

	/** * Imports ***/
	/**
	 * Helper to easily display and interact with a stack.<br>
	 *<br>
	 * Defaults:<br>
	 *	 - orientation: 0 (acquisition direction)<br>
	 *	 - index: middle slice in acquisition direction<br>
	 *<br>
	 * Features:<br>
	 *	 - slice from the stack (in any direction)<br>
	 *	 - slice border<br>
	 *	 - stack bounding box<br>
	 *<br>
	 * Live demo at: {@link http://jsfiddle.net/gh/get/library/pure/fnndsc/ami/tree/master/lessons/01#run|Lesson 01}
	 *
	 * @example
	 * let stack = new VJS.Models.Stack();
	 * ... // prepare the stack
	 *
	 * let helpersStack = new VJS.Helpers.Stack(stack);
	 * stackHelper.bbox.color = 0xF9F9F9;
	 * stackHelper.border.color = 0xF9F9F9;
	 *
	 * let scene = new THREE.Scene();
	 * scene.add(stackHelper);
	 *
	 * @see module:helpers/border
	 * @see module:helpers/boundingbox
	 * @see module:helpers/slice
	 *
	 * @module helpers/stack
	 */

	class helpersStack extends three.Object3D {
		constructor(stack) {
			//
			super();
			this._stack = stack;
			this._bBox = null;
			this._slice = null;
			this._border = null;
			this._dummy = null;
			this._orientation = 0;
			this._index = 0;
			this._uniforms = null;
			this._autoWindowLevel = false;
			this._outOfBounds = false;
			this._orientationMaxIndex = 0;
			this._orientationSpacing = 0;
			this._canvasWidth = 0;
			this._canvasHeight = 0;
			this._borderColor = null;

			this._create();
		}
		/**
		 * Get stack.
		 *
		 * @type {ModelsStack}
		 */


		get stack() {
			return this._stack;
		}
		/**
		 * Set stack.
		 *
		 * @type {ModelsStack}
		 */


		set stack(stack) {
			this._stack = stack;
		}
		/**
		 * Get bounding box helper.
		 *
		 * @type {HelpersBoundingBox}
		 */


		get bbox() {
			return this._bBox;
		}
		/**
		 * Get slice helper.
		 *
		 * @type {HelpersSlice}
		 */


		get slice() {
			return this._slice;
		}
		/**
		 * Get border helper.
		 *
		 * @type {HelpersSlice}
		 */


		get border() {
			return this._border;
		}
		/**
		 * Set/get current slice index.<br>
		 * Sets outOfBounds flag to know if target index is in/out stack bounding box.<br>
		 * <br>
		 * Internally updates the sliceHelper index and position. Also updates the
		 * borderHelper with the updated sliceHelper.
		 *
		 * @type {number}
		 */


		get index() {
			return this._index;
		}

		set index(index) {
			this._index = index; // update the slice

			this._slice.index = index;
			let halfDimensions = this._stack.halfDimensionsIJK;
			this._slice.planePosition = this._prepareSlicePosition(halfDimensions, this._index); // also update the border

			this._border.helpersSlice = this._slice; // update ourOfBounds flag

			this._isIndexOutOfBounds();
		}
		/**
		 * Set/get current slice orientation.<br>
		 * Values: <br>
		 *	 - 0: acquisition direction (slice normal is z_cosine)<br>
		 *	 - 1: next direction (slice normal is x_cosine)<br>
		 *	 - 2: next direction (slice normal is y_cosine)<br>
		 *	 - n: set orientation to 0<br>
		 * <br>
		 * Internally updates the sliceHelper direction. Also updates the
		 * borderHelper with the updated sliceHelper.
		 *
		 * @type {number}
		 */


		set orientation(orientation) {
			this._orientation = orientation;

			this._computeOrientationMaxIndex();

			this._computeOrientationSpacing();

			this._slice.spacing = Math.abs(this._orientationSpacing);
			this._slice.thickness = this._slice.spacing;
			this._slice.planeDirection = this._prepareDirection(this._orientation); // also update the border

			this._border.helpersSlice = this._slice;
		}

		get orientation() {
			return this._orientation;
		}
		/**
		 * Set/get the outOfBound flag.
		 *
		 * @type {boolean}
		 */


		set outOfBounds(outOfBounds) {
			this._outOfBounds = outOfBounds;
		}

		get outOfBounds() {
			return this._outOfBounds;
		}
		/**
		 * Set/get the orientationMaxIndex.
		 *
		 * @type {number}
		 */


		set orientationMaxIndex(orientationMaxIndex) {
			this._orientationMaxIndex = orientationMaxIndex;
		}

		get orientationMaxIndex() {
			return this._orientationMaxIndex;
		}
		/**
		 * Set/get the orientationSpacing.
		 *
		 * @type {number}
		 */


		set orientationSpacing(orientationSpacing) {
			this._orientationSpacing = orientationSpacing;
		}

		get orientationSpacing() {
			return this._orientationSpacing;
		}

		set canvasWidth(canvasWidth) {
			this._canvasWidth = canvasWidth;
			this._slice.canvasWidth = this._canvasWidth;
		}

		get canvasWidth() {
			return this._canvasWidth;
		}

		set canvasHeight(canvasHeight) {
			this._canvasHeight = canvasHeight;
			this._slice.canvasHeight = this._canvasHeight;
		}

		get canvasHeight() {
			return this._canvasHeight;
		}

		set borderColor(borderColor) {
			this._borderColor = borderColor;
			this._border.color = borderColor;
			this._slice.borderColor = this._borderColor;
		}

		get borderColor() {
			return this._borderColor;
		} //
		// PRIVATE METHODS
		//

		/**
		 * Initial setup, including stack prepare, bbox prepare, slice prepare and
		 * border prepare.
		 *
		 * @private
		 */


		_create() {
			if (this._stack) {
				// prepare sthe stack internals
				this._prepareStack(); // prepare visual objects


				this._prepareBBox();

				this._prepareSlice();

				this._prepareBorder(); // todo: Arrow

			} else {
				console.log('no stack to be prepared...');
			}
		}

		_computeOrientationSpacing() {
			let spacing = this._stack._spacing;

			switch (this._orientation) {
				case 0:
					this._orientationSpacing = spacing.z;
					break;

				case 1:
					this._orientationSpacing = spacing.x;
					break;

				case 2:
					this._orientationSpacing = spacing.y;
					break;

				default:
					this._orientationSpacing = 0;
					break;
			}
		}

		_computeOrientationMaxIndex() {
			let dimensionsIJK = this._stack.dimensionsIJK;
			this._orientationMaxIndex = 0;

			switch (this._orientation) {
				case 0:
					this._orientationMaxIndex = dimensionsIJK.z - 1;
					break;

				case 1:
					this._orientationMaxIndex = dimensionsIJK.x - 1;
					break;

				case 2:
					this._orientationMaxIndex = dimensionsIJK.y - 1;
					break;
			}
		}
		/**
		 * Given orientation, check if index is in/out of bounds.
		 *
		 * @private
		 */


		_isIndexOutOfBounds() {
			this._computeOrientationMaxIndex();

			if (this._index >= this._orientationMaxIndex || this._index < 0) {
				this._outOfBounds = true;
			} else {
				this._outOfBounds = false;
			}
		}
		/**
		 * Prepare a stack for visualization. (image to world transform, frames order,
		 * pack data into 8 bits textures, etc.)
		 *
		 * @private
		 */


		_prepareStack() {
			// make sure there is something, if not throw an error
			// compute image to workd transform, order frames, etc.
			if (!this._stack.prepared) {
				this._stack.prepare();
			} // pack data into 8 bits rgba texture for the shader
			// this one can be slow...


			if (!this._stack.packed) {
				this._stack.pack();
			}
		}
		/**
		 * Setup bounding box helper given prepared stack and add bounding box helper
		 * to stack helper.
		 *
		 * @private
		 */


		_prepareBBox() {
			const HelpersBoundingBoxConstructor = helpersBoundingBox();
			this._bBox = new HelpersBoundingBoxConstructor(this._stack);
			this.add(this._bBox);
		}
		/**
		 * Setup border helper given slice helper and add border helper
		 * to stack helper.
		 *
		 * @private
		 */


		_prepareBorder() {
			const HelpersBorderContructor = helpersBorder();
			this._border = new HelpersBorderContructor(this._slice);
			this.add(this._border);
		}
		/**
		 * Setup slice helper given prepared stack helper and add slice helper
		 * to stack helper.
		 *
		 * @private
		 */


		_prepareSlice() {
			let halfDimensionsIJK = this._stack.halfDimensionsIJK; // compute initial index given orientation

			this._index = this._prepareSliceIndex(halfDimensionsIJK); // compute initial position given orientation and index

			let position = this._prepareSlicePosition(halfDimensionsIJK, this._index); // compute initial direction orientation


			let direction = this._prepareDirection(this._orientation);

			const SliceHelperConstructor = helpersSlice();
			this._slice = new SliceHelperConstructor(this._stack, this._index, position, direction);
			this.add(this._slice);
		}
		/**
		 * Compute slice index depending on orientation.
		 *
		 * @param {Vector3} indices - Indices in each direction.
		 *
		 * @returns {number} Slice index according to current orientation.
		 *
		 * @private
		 */


		_prepareSliceIndex(indices) {
			let index = 0;

			switch (this._orientation) {
				case 0:
					index = Math.floor(indices.z);
					break;

				case 1:
					index = Math.floor(indices.x);
					break;

				case 2:
					index = Math.floor(indices.y);
					break;
			}

			return index;
		}
		/**
		 * Compute slice position depending on orientation.
		 * Sets index in proper location of reference position.
		 *
		 * @param {Vector3} rPosition - Reference position.
		 * @param {number} index - Current index.
		 *
		 * @returns {number} Slice index according to current orientation.
		 *
		 * @private
		 */


		_prepareSlicePosition(rPosition, index) {
			let position = new three.Vector3(0, 0, 0);

			switch (this._orientation) {
				case 0:
					position = new three.Vector3(Math.floor(rPosition.x), Math.floor(rPosition.y), index);
					break;

				case 1:
					position = new three.Vector3(index, Math.floor(rPosition.y), Math.floor(rPosition.z));
					break;

				case 2:
					position = new three.Vector3(Math.floor(rPosition.x), index, Math.floor(rPosition.z));
					break;
			}

			return position;
		}
		/**
		 * Compute slice direction depending on orientation.
		 *
		 * @param {number} orientation - Slice orientation.
		 *
		 * @returns {Vector3} Slice direction
		 *
		 * @private
		 */


		_prepareDirection(orientation) {
			let direction = new three.Vector3(0, 0, 1);

			switch (orientation) {
				case 0:
					direction = new three.Vector3(0, 0, 1);
					break;

				case 1:
					direction = new three.Vector3(1, 0, 0);
					break;

				case 2:
					direction = new three.Vector3(0, 1, 0);
					break;
			}

			return direction;
		}
		/**
		 * Release the stack helper memory including the slice memory.
		 *
		 * @public
		 */


		dispose() {
			this.remove(this._slice);

			this._slice.dispose();

			this._slice = null;

			this._bBox.dispose();

			this._bBox = null;

			this._border.dispose();

			this._border = null;
		}

	}

	/**
	 * @module shaders/data
	 */

	class ShadersUniform$1 {
		static uniforms() {
			return {
				uTextureSize: {
					type: 'i',
					value: 0,
					typeGLSL: 'int'
				},
				uTextureContainer: {
					type: 'tv',
					value: [],
					typeGLSL: 'sampler2D',
					length: 7
				},
				uDataDimensions: {
					type: 'iv',
					value: [0, 0, 0],
					typeGLSL: 'ivec3'
				},
				uWorldToData: {
					type: 'm4',
					value: new three.Matrix4(),
					typeGLSL: 'mat4'
				},
				uWindowCenterWidth: {
					type: 'fv1',
					value: [0.0, 0.0],
					typeGLSL: 'float',
					length: 2
				},
				uRescaleSlopeIntercept: {
					type: 'fv1',
					value: [0.0, 0.0],
					typeGLSL: 'float',
					length: 2
				},
				uNumberOfChannels: {
					type: 'i',
					value: 1,
					typeGLSL: 'int'
				},
				uBitsAllocated: {
					type: 'i',
					value: 8,
					typeGLSL: 'int'
				},
				uInvert: {
					type: 'i',
					value: 0,
					typeGLSL: 'int'
				},
				uLut: {
					type: 'i',
					value: 0,
					typeGLSL: 'int'
				},
				uTextureLUT: {
					type: 't',
					value: [],
					typeGLSL: 'sampler2D'
				},
				uPixelType: {
					type: 'i',
					value: 0,
					typeGLSL: 'int'
				},
				uPackedPerPixel: {
					type: 'i',
					value: 1,
					typeGLSL: 'int'
				},
				uInterpolation: {
					type: 'i',
					value: 1,
					typeGLSL: 'int'
				},
				uWorldBBox: {
					type: 'fv1',
					value: [0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
					typeGLSL: 'float',
					length: 6
				},
				uSteps: {
					type: 'i',
					value: 256,
					typeGLSL: 'int'
				},
				uAlphaCorrection: {
					type: 'f',
					value: 0.5,
					typeGLSL: 'float'
				},
				uFrequence: {
					type: 'f',
					value: 0,
					typeGLSL: 'float'
				},
				uAmplitude: {
					type: 'f',
					value: 0,
					typeGLSL: 'float'
				},
				uShading: {
					type: 'i',
					value: 1,
					typeGLSL: 'int'
				},
				uAmbient: {
					type: 'f',
					value: 0.1,
					typeGLSL: 'float'
				},
				uAmbientColor: {
					type: 'v3',
					value: [1.0, 1.0, 0.0],
					typeGLSL: 'vec3'
				},
				uSampleColorToAmbient: {
					type: 'i',
					value: 1,
					typeGLSL: 'int'
				},
				uSpecular: {
					type: 'f',
					value: 1,
					typeGLSL: 'float'
				},
				uSpecularColor: {
					type: 'v3',
					value: [1.0, 1.0, 1.0],
					typeGLSL: 'vec3'
				},
				uDiffuse: {
					type: 'f',
					value: 0.3,
					typeGLSL: 'float'
				},
				uDiffuseColor: {
					type: 'v3',
					value: [1.0, 1.0, 0.0],
					typeGLSL: 'vec3'
				},
				uSampleColorToDiffuse: {
					type: 'i',
					value: 1,
					typeGLSL: 'int'
				},
				uShininess: {
					type: 'f',
					value: 5,
					typeGLSL: 'float'
				},
				uLightPosition: {
					type: 'v3',
					value: [0.0, 0.0, 0.0],
					typeGLSL: 'vec3'
				},
				uLightPositionInCamera: {
					type: 'i',
					value: 1,
					typeGLSL: 'int'
				},
				uIntensity: {
					type: 'v3',
					value: [0.8, 0.8, 0.8],
					typeGLSL: 'vec3'
				},
				uAlgorithm: {
					type: 'i',
					value: 0,
					typeGLSL: 'int'
				}
			};
		}

	}

	class ShadersVertex$1 {
		compute() {
			return `
varying vec4 vPos;

//
// main
//
void main() {

	vPos = modelMatrix * vec4(position, 1.0 );
	gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0 );

}
				`;
		}

	}

	class IntersectBox extends ShadersBase {
		constructor() {
			super();
			this.name = 'intersectBox'; // default properties names

			this._rayOrigin = 'rayOrigin';
			this._rayDirection = 'rayDirection';
			this._aabbMin = 'aabbMin';
			this._aabbMax = 'aabbMax';
			this._tNear = 'tNear';
			this._tFar = 'tFar';
			this._intersect = 'intersect';
		}

		api(baseFragment = this._base, rayOrigin = this._rayOrigin, rayDirection = this._rayDirection, aabbMin = this._aabbMin, aabbMax = this._aabbMax, tNear = this._tNear, tFar = this._tFar, intersect = this._intersect) {
			this._base = baseFragment;
			return this.compute(rayOrigin, rayDirection, aabbMin, aabbMax, tNear, tFar, intersect);
		}

		compute(rayOrigin, rayDirection, aabbMin, aabbMax, tNear, tFar, intersect) {
			this.computeDefinition();
			this._base._functions[this._name] = this._definition;
			return `${this._name}(${rayOrigin}, ${rayDirection}, ${aabbMin}, ${aabbMax}, ${tNear}, ${tFar}, ${intersect});`;
		}

		computeDefinition() {
			this._definition = `
void ${this._name}(vec3 rayOrigin, vec3 rayDirection, vec3 boxMin, vec3 boxMax, out float tNear, out float tFar, out bool intersect){
	// compute intersection of ray with all six bbox planes
	vec3 invRay = vec3(1.) / rayDirection;
	vec3 tBot = invRay * (boxMin - rayOrigin);
	vec3 tTop = invRay * (boxMax - rayOrigin);
	// re-order intersections to find smallest and largest on each axis
	vec3 tMin = min(tTop, tBot);
	vec3 tMax = max(tTop, tBot);
	// find the largest tMin and the smallest tMax
	float largest_tMin = max(max(tMin.x, tMin.y), max(tMin.x, tMin.z));
	float smallest_tMax = min(min(tMax.x, tMax.y), min(tMax.x, tMax.z));
	tNear = largest_tMin;
	tFar = smallest_tMax;
	intersect = smallest_tMax > largest_tMin;
}

		`;
		}

	}

	var shadersIntersectBox = new IntersectBox();

	class ShadersFragment$1 {
		// pass uniforms object
		constructor(uniforms) {
			this._uniforms = uniforms;
			this._functions = {};
			this._main = '';
		}

		functions() {
			if (this._main === '') {
				// if main is empty, functions can not have been computed
				this.main();
			}

			let content = '';

			for (let property in this._functions) {
				content += this._functions[property] + '\n';
			}

			return content;
		}

		uniforms() {
			let content = '';

			for (let property in this._uniforms) {
				let uniform = this._uniforms[property];
				content += `uniform ${uniform.typeGLSL} ${property}`;

				if (uniform && uniform.length) {
					content += `[${uniform.length}]`;
				}

				content += ';\n';
			}

			return content;
		}

		main() {
			// need to pre-call main to fill up the functions list
			this._main = `
void getIntensity(in vec3 dataCoordinates, out float intensity, out vec3 gradient){

	vec4 dataValue = vec4(0., 0., 0., 0.);
	${shadersInterpolation(this, 'dataCoordinates', 'dataValue', 'gradient')}

	intensity = dataValue.r;

	// rescale/slope
	intensity = intensity*uRescaleSlopeIntercept[0] + uRescaleSlopeIntercept[1];
	// window level
	float windowMin = uWindowCenterWidth[0] - uWindowCenterWidth[1] * 0.5;
	intensity = ( intensity - windowMin ) / uWindowCenterWidth[1];
}

mat4 inverse(mat4 m) {
	float
		a00 = m[0][0], a01 = m[0][1], a02 = m[0][2], a03 = m[0][3],
		a10 = m[1][0], a11 = m[1][1], a12 = m[1][2], a13 = m[1][3],
		a20 = m[2][0], a21 = m[2][1], a22 = m[2][2], a23 = m[2][3],
		a30 = m[3][0], a31 = m[3][1], a32 = m[3][2], a33 = m[3][3],

		b00 = a00 * a11 - a01 * a10,
		b01 = a00 * a12 - a02 * a10,
		b02 = a00 * a13 - a03 * a10,
		b03 = a01 * a12 - a02 * a11,
		b04 = a01 * a13 - a03 * a11,
		b05 = a02 * a13 - a03 * a12,
		b06 = a20 * a31 - a21 * a30,
		b07 = a20 * a32 - a22 * a30,
		b08 = a20 * a33 - a23 * a30,
		b09 = a21 * a32 - a22 * a31,
		b10 = a21 * a33 - a23 * a31,
		b11 = a22 * a33 - a23 * a32,

		det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;

	return mat4(
		a11 * b11 - a12 * b10 + a13 * b09,
		a02 * b10 - a01 * b11 - a03 * b09,
		a31 * b05 - a32 * b04 + a33 * b03,
		a22 * b04 - a21 * b05 - a23 * b03,
		a12 * b08 - a10 * b11 - a13 * b07,
		a00 * b11 - a02 * b08 + a03 * b07,
		a32 * b02 - a30 * b05 - a33 * b01,
		a20 * b05 - a22 * b02 + a23 * b01,
		a10 * b10 - a11 * b08 + a13 * b06,
		a01 * b08 - a00 * b10 - a03 * b06,
		a30 * b04 - a31 * b02 + a33 * b00,
		a21 * b02 - a20 * b04 - a23 * b00,
		a11 * b07 - a10 * b09 - a12 * b06,
		a00 * b09 - a01 * b07 + a02 * b06,
		a31 * b01 - a30 * b03 - a32 * b00,
		a20 * b03 - a21 * b01 + a22 * b00) / det;
}

/**
 * Adapted from original sources
 * 
 * Original code: 
 * http://jamie-wong.com/2016/07/15/ray-marching-signed-distance-functions/
 * https://www.shadertoy.com/view/lt33z7
 * 
 * The vec3 returned is the RGB color of the light's contribution.
 *
 * k_a: Ambient color
 * k_d: Diffuse color
 * k_s: Specular color
 * alpha: Shininess coefficient
 * p: position of point being lit
 * eye: the position of the camera
 * lightPos: the position of the light
 * lightIntensity: color/intensity of the light
 *
 * See https://en.wikipedia.org/wiki/Phong_reflection_model#Description
 */
vec3 phongShading(vec3 k_a, vec3 k_d, vec3 k_s, float shininess, vec3 p, vec3 eye,
	vec3 lightPos, vec3 lightIntensity, vec3 normal) {
	vec3 N = normal;
	vec3 L = lightPos - p;
	if (length(L) > 0.) {
		L = L / length(L);
	}
	vec3 V = eye - p;
	if (length(V) > 0.) {
		V = V / length(V);
	}
	vec3 R = reflect(-L, N);
	if (length(R) > 0.) {
		R = R / length(R);
	}

	// https://en.wikipedia.org/wiki/Blinn%E2%80%93Phong_shading_model
	vec3 h = L + V;
	vec3 H = h;
	if (length(h) > 0.) {
		H = H / length(h);
	}

	float dotLN = dot(L, N);
	float dotRV = dot(R, V);

	if (dotLN < 0.) {
		// Light not visible from this point on the surface
		return k_a;
	} 

	if (dotRV < 0.) {
		// Light reflection in opposite direction as viewer, apply only diffuse
		// component
		return k_a + lightIntensity * (k_d * dotLN);
	}

	float specAngle = max(dot(H, normal), 0.0);
	float specular = pow(dotRV, shininess); //pow(specAngle, shininess); // 
	return k_a + lightIntensity * (k_d * dotLN	+ k_s * specular);
}

float PI = 3.14159265358979323846264 * 00000.1; // PI

// expects values in the range of [0,1]x[0,1], returns values in the [0,1] range.
// do not collapse into a single function per: http://byteblacksmith.com/improvements-to-the-canonical-one-liner-glsl-rand-for-opengl-es-2-0/
highp float rand( const in vec2 uv) {
	const highp float a = 12.9898;
	const highp float b = 78.233;
	const highp float c = 43758.5453;
	highp float dt = dot(uv.xy, vec2(a, b)), sn = mod(dt, PI);
	return fract(sin(sn) * c);
}

void main(void) {
	const int maxSteps = 1024;

	// the ray
	vec3 rayOrigin = cameraPosition;
	vec3 rayDirection = normalize(vPos.xyz - rayOrigin);

	vec3 lightOrigin = uLightPositionInCamera == 1 ? cameraPosition : uLightPosition;

	// the Axe-Aligned B-Box
	vec3 AABBMin = vec3(uWorldBBox[0], uWorldBBox[2], uWorldBBox[4]);
	vec3 AABBMax = vec3(uWorldBBox[1], uWorldBBox[3], uWorldBBox[5]);

	// Intersection ray/bbox
	float tNear, tFar;
	bool intersect = false;
	${shadersIntersectBox.api(this, 'rayOrigin', 'rayDirection', 'AABBMin', 'AABBMax', 'tNear', 'tFar', 'intersect')}
	if (tNear < 0.0) tNear = 0.0;

	// x / y should be within o-1
	// should
	float offset = rand(gl_FragCoord.xy);

	// init the ray marching
	float tStep = (tFar - tNear) / float(uSteps);
	float tCurrent = tNear + offset * tStep;
	vec4 accumulatedColor = vec4(0.0);
	float accumulatedAlpha = 0.0;

	// MIP volume rendering
	float maxIntensity = 0.0;

	mat4 dataToWorld = inverse(uWorldToData);

	// rayOrigin -= rayDirection * 0.1; // gold_noise(vPos.xz, vPos.y) / 100.;	

	for(int rayStep = 0; rayStep < maxSteps; rayStep++){
		vec3 currentPosition = rayOrigin + rayDirection * tCurrent;
		// some non-linear FUN
		// some occlusion issue to be fixed
		vec3 transformedPosition = currentPosition; //transformPoint(currentPosition, uAmplitude, uFrequence);
		// world to data coordinates
		// rounding trick
		// first center of first voxel in data space is CENTERED on (0,0,0)
		vec4 dataCoordinatesRaw = uWorldToData * vec4(transformedPosition, 1.0);
		vec3 currentVoxel = vec3(dataCoordinatesRaw.x, dataCoordinatesRaw.y, dataCoordinatesRaw.z);
		float intensity = 0.0;
		vec3 gradient = vec3(0., 0., 0.);
		getIntensity(currentVoxel, intensity, gradient);
		// map gradient to world space and normalize before using
		// we avoid to call "normalize" as it may be undefined if vector length == 0.
		gradient = (vec3(dataToWorld * vec4(gradient, 0.)));
		if (length(gradient) > 0.0) {
			gradient = normalize(gradient);
		}

		vec4 colorSample;
		float alphaSample;
		if(uLut == 1){
			vec4 colorFromLUT = texture2D( uTextureLUT, vec2( intensity, 1.0) );
			// 256 colors
			colorSample = colorFromLUT;
			alphaSample = colorFromLUT.a;
		}
		else{
			alphaSample = intensity;
			colorSample.r = colorSample.g = colorSample.b = intensity;
		}

		// ray marching algorithm
		// shading on
		// interpolation on
		if (uAlgorithm == 0 && uShading == 1 && uInterpolation != 0) {
			//	&& alphaSample > .3
			vec3 ambientComponent = uSampleColorToAmbient == 1 ? colorSample.xyz : uAmbientColor;
			ambientComponent *= uAmbient;
			vec3 diffuseComponent = uSampleColorToDiffuse == 1 ? colorSample.xyz : uDiffuseColor;
			diffuseComponent *= uDiffuse;
			vec3 specularComponent = uSpecular * uSpecularColor;
			float shininess = uShininess;
			vec3 vIntensity = uIntensity;

			colorSample.xyz += phongShading(
				ambientComponent,
				diffuseComponent,
				specularComponent,
				shininess,
				currentPosition.xyz,
				rayOrigin.xyz,
				lightOrigin.xyz,
				vIntensity,
				gradient);
		}

		alphaSample = 1.0 - pow((1.0- alphaSample),tStep*uAlphaCorrection);
		alphaSample *= (1.0 - accumulatedAlpha);

		accumulatedColor += alphaSample * colorSample;
		accumulatedAlpha += alphaSample;

		tCurrent += tStep;

		if (tCurrent > tFar || (uAlgorithm == 0 && accumulatedAlpha >= 1.0)) break;

		if (uAlgorithm == 1 && (intensity >= maxIntensity)) {
			maxIntensity = intensity;
			accumulatedColor = colorSample;
			accumulatedAlpha = 1.;
		}
	}

	gl_FragColor = vec4(accumulatedColor.xyz, accumulatedAlpha);
}
	 `;
		}

		compute() {
			// shaderInterpolation.functions(args)

			return `
// uniforms
${this.uniforms()}

// varying (should fetch it from vertex directly)
varying vec4			vPos;

// tailored functions
${this.functions()}

// main loop
${this._main}
			`;
		}

	}

	/** * Imports ***/
	/**
	 * @module helpers/volumerendering
	 */

	class helpersVolumeRendering extends helpersMaterialMixin {
		constructor(stack) {
			//
			super();
			this._stack = stack;
			this._textures = [];
			this._shadersFragment = ShadersFragment$1;
			this._shadersVertex = ShadersVertex$1;
			this._uniforms = ShadersUniform$1.uniforms();
			this._material = null;
			this._geometry = null;
			this._mesh = null;
			this._algorithm = 0; // ray marching

			this._alphaCorrection = 0.5; // default

			this._interpolation = 1; // default to trilinear interpolation

			this._shading = 1; // shading is on by default

			this._shininess = 10.0;
			this._steps = 256; // default

			this._offset = 0;
			this._windowCenter = 0.0;
			this._windowWidth = 1.0;

			this._create();
		}

		_create() {
			this._prepareStack();

			this._prepareTexture();

			this._prepareMaterial();

			this._prepareGeometry();

			this._mesh = new three.Mesh(this._geometry, this._material);
			this.add(this._mesh);
		}

		_prepareStack() {
			if (!this._stack.prepared) {
				this._stack.prepare();
			}

			if (!this._stack.packed) {
				this._stack.pack();
			} // compensate for the offset to only pass > 0 values to shaders
			// models > models.stack.js : _packTo8Bits


			this._offset = Math.min(0, this._stack._minMax[0]);
			this._windowCenter = this._stack.windowCenter;
			this._windowWidth = this._stack.windowWidth * 0.8; // multiply for better default visualization
		}

		_prepareMaterial() {
			// uniforms
			this._uniforms = ShadersUniform$1.uniforms();
			this._uniforms.uWorldBBox.value = this._stack.worldBoundingBox();
			this._uniforms.uTextureSize.value = this._stack.textureSize;
			this._uniforms.uTextureContainer.value = this._textures;

			if (this._stack.textureUnits > 8) {
				this._uniforms.uTextureContainer.length = 14;
			}

			this._uniforms.uWorldToData.value = this._stack.lps2IJK;
			this._uniforms.uNumberOfChannels.value = this._stack.numberOfChannels;
			this._uniforms.uPixelType.value = this._stack.pixelType;
			this._uniforms.uBitsAllocated.value = this._stack.bitsAllocated;
			this._uniforms.uPackedPerPixel.value = this._stack.packedPerPixel;
			this._uniforms.uWindowCenterWidth.value = [this._windowCenter - this._offset, this._windowWidth];
			this._uniforms.uRescaleSlopeIntercept.value = [this._stack.rescaleSlope, this._stack.rescaleIntercept];
			this._uniforms.uDataDimensions.value = [this._stack.dimensionsIJK.x, this._stack.dimensionsIJK.y, this._stack.dimensionsIJK.z];
			this._uniforms.uAlphaCorrection.value = this._alphaCorrection;
			this._uniforms.uInterpolation.value = this._interpolation;
			this._uniforms.uShading.value = this._shading;
			this._uniforms.uShininess.value = this._shininess;
			this._uniforms.uSteps.value = this._steps;
			this._uniforms.uAlgorithm.value = this._algorithm;

			this._createMaterial({
				side: three.BackSide,
				transparent: true
			});
		}

		_prepareGeometry() {
			let worldBBox = this._stack.worldBoundingBox();

			let centerLPS = this._stack.worldCenter();

			this._geometry = new three.BoxGeometry(worldBBox[1] - worldBBox[0], worldBBox[3] - worldBBox[2], worldBBox[5] - worldBBox[4]);

			this._geometry.applyMatrix4(new three.Matrix4().makeTranslation(centerLPS.x, centerLPS.y, centerLPS.z));
		}

		get uniforms() {
			return this._uniforms;
		}

		set uniforms(uniforms) {
			this._uniforms = uniforms;
		}

		set mesh(mesh) {
			this._mesh = mesh;
		}

		get mesh() {
			return this._mesh;
		}

		get stack() {
			return this._stack;
		}

		set stack(stack) {
			this._stack = stack;
		}

		get windowCenter() {
			return this._windowCenter;
		}

		set windowCenter(windowCenter) {
			this._windowCenter = windowCenter;
			this._uniforms.uWindowCenterWidth.value[0] = this._windowCenter - this._offset;
		}

		get windowWidth() {
			return this._windowWidth;
		}

		set windowWidth(windowWidth) {
			this._windowWidth = Math.max(1, windowWidth);
			this._uniforms.uWindowCenterWidth.value[1] = this._windowWidth;
		}

		get steps() {
			return this._steps;
		}

		set steps(steps) {
			this._steps = steps;
			this._uniforms.uSteps.value = this._steps;
		}

		get alphaCorrection() {
			return this._alphaCorrection;
		}

		set alphaCorrection(alphaCorrection) {
			this._alphaCorrection = alphaCorrection;
			this._uniforms.uAlphaCorrection.value = this._alphaCorrection;
		}

		get interpolation() {
			return this._interpolation;
		}

		set interpolation(interpolation) {
			this._interpolation = interpolation;
			this._uniforms.uInterpolation.value = this._interpolation;

			this._updateMaterial();
		}

		get shading() {
			return this._shading;
		}

		set shading(shading) {
			this._shading = shading;
			this._uniforms.uShading.value = this._shading;
		}

		get shininess() {
			return this._shininess;
		}

		set shininess(shininess) {
			this._shininess = shininess;
			this._uniforms.uShininess.value = this._shininess;
		}

		get algorithm() {
			return this._algorithm;
		}

		set algorithm(algorithm) {
			this._algorithm = algorithm;
			this._uniforms.uAlgorithm.value = this._algorithm;
		}

		dispose() {
			// Release memory
			for (let j = 0; j < this._textures.length; j++) {
				this._textures[j].dispose();

				this._textures[j] = null;
			}

			this._textures = null;
			this._shadersFragment = null;
			this._shadersVertex = null;
			this._uniforms.uTextureContainer = null;
			this._uniforms.uTextureLUT = null;
			this._uniforms = null; // material, geometry and mesh

			this.remove(this._mesh);

			this._mesh.geometry.dispose();

			this._mesh.geometry = null;

			this._mesh.material.dispose();

			this._mesh.material = null;
			this._mesh = null;

			this._geometry.dispose();

			this._geometry = null;
			this._material.vertexShader = null;
			this._material.fragmentShader = null;
			this._material.uniforms = null;

			this._material.dispose();

			this._material = null;
			this._stack = null;
		}

	}

	/** Imports **/
	/**
	 *
	 * It is typically used to load a DICOM image. Use loading manager for
	 * advanced usage, such as multiple files handling.
	 *
	 * Demo: {@link https://fnndsc.github.io/vjs#loader_dicom}
	 *
	 * @module loaders/base
	 * @extends EventEmitter
	 * @example
	 * var files = ['/data/dcm/fruit'];
	 *
	 * // Instantiate a dicom loader
	 * var lDicomoader = new dicom();
	 *
	 * // load a resource
	 * loader.load(
	 *	 // resource URL
	 *	 files[0],
	 *	 // Function when resource is loaded
	 *	 function(object) {
	 *		 //scene.add( object );
	 *		 console.log(object);
	 *	 }
	 * );
	 */

	class LoadersBase extends EventEmitter__default["default"] {
		/**
		 * Create a Loader.
		 * @param {dom} container - The dom container of loader.
		 * @param {object} ProgressBar - The progressbar of loader.
		 */
		constructor(container = null, ProgressBar = HelpersProgressBar) {
			super();
			this._loaded = -1;
			this._totalLoaded = -1;
			this._parsed = -1;
			this._totalParsed = -1;
			this._data = [];
			this._container = container;
			this._progressBar = null;

			if (this._container && ProgressBar) {
				this._progressBar = new ProgressBar(this._container);
			}
		}
		/**
		 * free the reference.
		 */


		free() {
			this._data = [];
			this._container = null; // this._helpersProgressBar = null;

			if (this._progressBar) {
				this._progressBar.free();

				this._progressBar = null;
			}
		}
		/**
		 * load the resource by url.
		 * @param {string} url - resource url.
		 * @param {Map} requests - used for cancellation.
		 * @return {promise} promise.
		 */


		fetch(url, requests) {
			return new Promise((resolve, reject) => {
				const request = new XMLHttpRequest();
				request.open('GET', url);
				request.crossOrigin = true;
				request.responseType = 'arraybuffer';

				request.onloadstart = event => {
					// emit 'fetch-start' event
					this.emit('fetch-start', {
						file: url,
						time: new Date()
					});
				};

				request.onload = event => {
					if (request.status === 200 || request.status === 0) {
						this._loaded = event.loaded;
						this._totalLoaded = event.total; // will be removed after eventer set up

						if (this._progressBar) {
							this._progressBar.update(this._loaded, this._totalLoaded, 'load', url);
						}

						let buffer = request.response;
						let response = {
							url,
							buffer
						}; // emit 'fetch-success' event

						this.emit('fetch-success', {
							file: url,
							time: new Date(),
							totalLoaded: event.total
						});
						resolve(response);
					} else {
						reject(request.statusText);
					}
				};

				request.onerror = () => {
					// emit 'fetch-error' event
					this.emit('fetch-error', {
						file: url,
						time: new Date()
					});
					reject(request.statusText);
				};

				request.onabort = event => {
					// emit 'fetch-abort' event
					this.emit('fetch-abort', {
						file: url,
						time: new Date()
					});
					reject(request.statusText || 'Aborted');
				};

				request.ontimeout = () => {
					// emit 'fetch-timeout' event
					this.emit('fetch-timeout', {
						file: url,
						time: new Date()
					});
					reject(request.statusText);
				};

				request.onprogress = event => {
					this._loaded = event.loaded;
					this._totalLoaded = event.total; // emit 'fetch-progress' event

					this.emit('fetch-progress', {
						file: url,
						total: event.total,
						loaded: event.loaded,
						time: new Date()
					}); // will be removed after eventer set up

					if (this._progressBar) {
						this._progressBar.update(this._loaded, this._totalLoaded, 'load', url);
					}
				};

				request.onloadend = event => {
					// emit 'fetch-end' event
					this.emit('fetch-end', {
						file: url,
						time: new Date()
					}); // just use onload when success and onerror when failure, etc onabort
					// reject(request.statusText);
				};

				if (requests instanceof Map) {
					requests.set(url, request);
				}

				request.send();
			});
		}
		/**
		 * parse the data loaded
		 * SHOULD BE implementd by detail loader.
		 * @param {object} response - loaded data.
		 * @return {promise} promise.
		 */


		parse(response) {
			return new Promise((resolve, reject) => {
				resolve(response);
			});
		}
		/**
		 * default load sequence group promise.
		 * @param {array} url - resource url.
		 * @param {Map} requests - used for cancellation.
		 * @return {promise} promise.
		 */


		loadSequenceGroup(url, requests) {
			const fetchSequence = [];
			url.forEach(file => {
				fetchSequence.push(this.fetch(file, requests));
			});
			return Promise.all(fetchSequence).then(rawdata => {
				return this.parse(rawdata);
			}).then(data => {
				this._data.push(data);

				return data;
			}).catch(function (error) {
				if (error === 'Aborted') {
					return;
				}

				console.log('oops... something went wrong...');
				console.log(error);
			});
		}
		/**
		 * default load sequence promise.
		 * @param {string} url - resource url.
		 * @param {Map} requests - used for cancellation.
		 * @return {promise} promise.
		 */


		loadSequence(url, requests) {
			return this.fetch(url, requests).then(rawdata => {
				return this.parse(rawdata);
			}).then(data => {
				this._data.push(data);

				return data;
			}).catch(function (error) {
				if (error === 'Aborted') {
					return;
				}

				console.log('oops... something went wrong...');
				console.log(error);
			});
		}
		/**
		 * load the data by url(urls)
		 * @param {string|array} url - resource url.
		 * @param {Map} requests - used for cancellation.
		 * @return {promise} promise
		 */


		load(url, requests) {
			// if we load a single file, convert it to an array
			if (!Array.isArray(url)) {
				url = [url];
			}

			if (this._progressBar) {
				this._progressBar.totalFiles = url.length;
				this._progressBar.requests = requests;
			} // emit 'load-start' event


			this.emit('load-start', {
				files: url,
				time: new Date()
			});
			const loadSequences = [];
			url.forEach(file => {
				if (!Array.isArray(file)) {
					loadSequences.push(this.loadSequence(file, requests));
				} else {
					loadSequences.push(this.loadSequenceGroup(file, requests));
				}
			});
			return Promise.all(loadSequences);
		}
		/**
		 * Set data
		 * @param {array} data
		 */


		set data(data) {
			this._data = data;
		}
		/**
		 * Get data
		 * @return {array} data loaded
		 */


		get data() {
			return this._data;
		}

	}

	/**
	 * Base object.
	 *
	 * @module models/base
	 */
	class ModelsBase {
		constructor() {
			this._id = -1;
		}
		/**
		 * Merge 2 arrays of models.
		 * Merge the target array into the reference array.
		 *
		 * @param {Array.<Models>} referenceArray - Array to be merge against
		 * @param {Array.<Models>} targetArray - Array to be merged against reference.
		 *
		 * @return {boolean} True if merge was sucessful. False if something went wrong.
		 */


		mergeModels(referenceArray, targetArray) {
			if (!(this._validateModelArray(referenceArray) && this._validateModelArray(targetArray))) {
				console.log('invalid inputs provided.');
				return false;
			}

			for (let i = 0, targetLength = targetArray.length; i < targetLength; i++) {
				// test targetArray against existing targetArray
				for (let j = 0, refLength = referenceArray.length; j < refLength; j++) {
					if (referenceArray[j].merge(targetArray[i])) {
						// merged successfully
						break;
					} else if (j === referenceArray.length - 1) {
						// last merge was not successful
						// this is a new targetArray
						referenceArray.push(targetArray[i]);
					}
				}
			}

			return true;
		}
		/**
		 * Merge model against current model.
		 */


		merge(model) {
			// make sure model is valid
			if (!this.validate(model)) {
				return false;
			} // they can be merged if they match


			if (this._id === model._id) {
				return true;
			}

			return false;
		}
		/**
		 * Validate a model.
		 *
		 * @return {boolean} True if model is valid. False if not.
		 */


		validate(model) {
			if (!(model && model !== null && typeof model.merge === 'function')) {
				return false;
			}

			return true;
		}
		/**
		 * Validate array of models.
		 *
		 * @param {Array.<Models>} modelArray - Array containing models.
		 *
		 * @return {boolean} True if array is valid. False if not.
		 */


		_validateModelArray(modelArray) {
			if (!(modelArray !== null && Array === modelArray.constructor)) {
				console.log('invalid model array provided.');
				return false;
			}

			for (let i = 0; i < modelArray.length; i++) {
				if (!(modelArray[i] && modelArray[i] !== null && typeof modelArray[i].validate === 'function' && modelArray[i].validate(modelArray[i]))) {
					return false;
				}
			}

			return true;
		}

	}

	/** * Imports ***/
	/**
	 * Series object.
	 *
	 * @module models/series
	 */

	class ModelsSeries extends ModelsBase {
		/**
		 * Models series constructor
		 */
		constructor() {
			super();
			this._concatenationUID = -1;
			this._seriesInstanceUID = -1;
			this._transferSyntaxUID = '';
			this._seriesNumber = -1;
			this._seriesDescription = '';
			this._seriesDate = '';
			this._studyDescription = '';
			this._studyDate = '';
			this._accessionNumber = -1;
			this._modality = 'Modality not set';
			this._dimensionIndexSequence = []; // it is used in the loader in case a dicom/nifti contains multiple frames
			// should be updated after merge or renamed

			this._numberOfFrames = 0;
			this._numberOfChannels = 1; // patient information

			this._rawHeader = null;
			this._patientID = '';
			this._patientName = '';
			this._patientAge = '';
			this._patientBirthdate = '';
			this._patientSex = ''; // SEGMENTATION STUFF

			this._segmentationType = null;
			this._segmentationSegments = []; // STACK

			this._stack = [];
		}
		/**
		 * Validate a series.
		 *
		 * Requirements:
		 *	 - mergeSeries method
		 *	 - _seriesInstanceUID
		 *	 - _numberOfFrames
		 *	 - _numberOfChannels
		 *	 _ _stack
		 *
		 * @param {ModelsSeries} model - Model to be validated as series.
		 *
		 * @return {boolean} True if series is valid. False if not.
		 *
		 * @override
		 */


		validate(model) {
			if (!(super.validate(model) && typeof model.mergeSeries === 'function' && model.hasOwnProperty('_seriesInstanceUID') && model.hasOwnProperty('_numberOfFrames') && model.hasOwnProperty('_numberOfChannels') && model.hasOwnProperty('_stack') && typeof model._stack !== 'undefined' && Array === model._stack.constructor)) {
				return false;
			}

			return true;
		}
		/**
		 * Merge current series with provided series.
		 * 2 series can ONLY be merge if they have the same SeriesInstanceUID.
		 *
		 * Also merges the stacks inside a series.
		 *
		 * @param {ModelsSeries} series - Series to be merged against current series.
		 *
		 * @return {boolean} True if series could be merge. False if not.
		 *
		 * @override
		 */


		merge(series) {
			if (!this.validate(series)) {
				return false;
			}

			if (this._seriesInstanceUID === series.seriesInstanceUID) {
				// may merge incorrectly if loader will return more than one stacks per series
				if (series.stack[0]) {
					if (this._stack[0]._numberOfFrames === 0) {
						this._stack[0].computeNumberOfFrames();
					}

					this._stack[0].computeCosines();

					if (series.stack[0]._numberOfFrames === 0) {
						series.stack[0].computeNumberOfFrames();
					}

					series.stack[0].computeCosines();
				}

				return this.mergeModels(this._stack, series.stack);
			} else {
				return false;
			}
		}
		/**
		 * Merge current series with provided array of series.
		 * 2 series can ONLY be merge if they have the same SeriesInstanceUID.
		 *
		 * Also merges the stacks inside a series.
		 *
		 * @param {Array.<ModelsSeries>} target - Series to be merged against current series.
		 *
		 * @return {Array.<ModelsSeries>} Array of series properly merged.
		 */


		mergeSeries(target) {
			let seriesContainer = [this];
			this.mergeModels(seriesContainer, target);
			return seriesContainer;
		}
		/**
		 * Series instance UID setter
		 *
		 * @param {*} seriesInstanceUID
		 */


		set seriesInstanceUID(seriesInstanceUID) {
			this._seriesInstanceUID = seriesInstanceUID;
		}
		/**
		 * Series instace UID getter
		 *
		 * @return {*}
		 */


		get seriesInstanceUID() {
			return this._seriesInstanceUID;
		}
		/**
		 * Transfer syntax UID setter
		 *
		 * @param {*} transferSyntaxUID
		 */


		set transferSyntaxUID(transferSyntaxUID) {
			this._transferSyntaxUID = transferSyntaxUID;
		}
		/**
		 * Transfer syntax UID getter
		 *
		 * @return {*}
		 */


		get transferSyntaxUID() {
			return this._transferSyntaxUID;
		}
		/**
		 * Transfer syntax UID getter
		 *
		 * @return {*}
		 */


		get transferSyntaxUIDLabel() {
			switch (this._transferSyntaxUID) {
				case '1.2.840.10008.1.2.4.90':
					return 'JPEG 2000 Lossless';

				case '1.2.840.10008.1.2.4.91':
					return 'JPEG 2000 Lossy';

				case '1.2.840.10008.1.2.4.57':
					return 'JPEG Lossless, Nonhierarchical (Processes 14)';

				case '1.2.840.10008.1.2.4.70':
					return 'JPEG Lossless, Nonhierarchical (Processes 14 [Selection 1])';

				case '1.2.840.10008.1.2.4.50':
					return 'JPEG Baseline lossy process 1 (8 bit)';

				case '1.2.840.10008.1.2.4.51':
					return 'JPEG Baseline lossy process 2 & 4 (12 bit)';

				case '1.2.840.10008.1.2':
					return 'Implicit VR Little Endian';

				case '1.2.840.10008.1.2.1':
					return 'Explicit VR Little Endian';

				case '1.2.840.10008.1.2.2':
					return 'Explicit VR Big Endian';

				default:
					return `Unknown transfersyntax: ${this._transferSyntaxUID}`;
			}
		}
		/**
		 * Study date setter
		 *
		 * @param {*} studyDate
		 */


		set studyDate(studyDate) {
			this._studyDate = studyDate;
		}
		/**
		 * Study date getter
		 *
		 * @return {*}
		 */


		get studyDate() {
			return this._studyDate;
		}
		/**
		 * Study descripition setter
		 *
		 * @param {*} studyDescription
		 */


		set studyDescription(studyDescription) {
			this._studyDescription = studyDescription;
		}
		/**
		 * Study description getter
		 *
		 * @return {*}
		 */


		get studyDescription() {
			return this._studyDescription;
		}
		/**
		 * Series date setter
		 *
		 * @param {*} seriesDate
		 */


		set seriesDate(seriesDate) {
			this._seriesDate = seriesDate;
		}
		/**
		 * Series date getter
		 *
		 * @return {*}
		 */


		get seriesDate() {
			return this._seriesDate;
		}
		/**
		 * Series descripition setter
		 *
		 * @param {*} seriesDescription
		 */


		set seriesDescription(seriesDescription) {
			this._seriesDescription = seriesDescription;
		}
		/**
		 * Series description getter
		 *
		 * @return {*}
		 */


		get seriesDescription() {
			return this._seriesDescription;
		}
		/**
		* Raw Header setter
		*
		* @param {*} rawHeader
		*/


		set rawHeader(rawHeader) {
			this._rawHeader = rawHeader;
		}
		/**
		 * Raw Header getter
		 *
		 * @return {*}
		 */


		get rawHeader() {
			return this._rawHeader;
		}
		/**
		 * Patient ID setter
		 *
		 * @param {*} patientID
		 */


		set patientID(patientID) {
			this._patientID = patientID;
		}
		/**
		 * Patient ID getter
		 *
		 * @return {*}
		 */


		get patientID() {
			return this._patientID;
		}
		/**
		 * Patient name setter
		 *
		 * @param {*} patientName
		 */


		set patientName(patientName) {
			this._patientName = patientName;
		}
		/**
		 * Patient name getter
		 *
		 * @return {*}
		 */


		get patientName() {
			return this._patientName;
		}
		/**
		 * Patient age setter
		 *
		 * @param {*} patientAge
		 */


		set patientAge(patientAge) {
			this._patientAge = patientAge;
		}
		/**
		 * Patient age getter
		 *
		 * @return {*}
		 */


		get patientAge() {
			return this._patientAge;
		}
		/**
		 * Patient birthdate setter
		 *
		 * @param {*} patientBirthdate
		 */


		set patientBirthdate(patientBirthdate) {
			this._patientBirthdate = patientBirthdate;
		}
		/**
		 * Patient birthdate getter
		 *
		 * @return {*}
		 */


		get patientBirthdate() {
			return this._patientBirthdate;
		}
		/**
		 * Patient sex setter
		 *
		 * @param {*} patientSex
		 */


		set patientSex(patientSex) {
			this._patientSex = patientSex;
		}
		/**
		 * Patient sex getter
		 *
		 * @return {*}
		 */


		get patientSex() {
			return this._patientSex;
		}
		/**
		 * Number of frames setter
		 *
		 * @param {*} numberOfFrames
		 */


		set numberOfFrames(numberOfFrames) {
			this._numberOfFrames = numberOfFrames;
		}
		/**
		 * Number of frames getter
		 *
		 * @return {*}
		 */


		get numberOfFrames() {
			return this._numberOfFrames;
		}
		/**
		 * Number of channels setter
		 *
		 * @param {*} numberOfChannels
		 */


		set numberOfChannels(numberOfChannels) {
			this._numberOfChannels = numberOfChannels;
		}
		/**
		 * Number of channels getter
		 *
		 * @return {*}
		 */


		get numberOfChannels() {
			return this._numberOfChannels;
		}
		/**
		 * Stack setter
		 *
		 * @param {*} stack
		 */


		set stack(stack) {
			this._stack = stack;
		}
		/**
		 * Stack getter
		 *
		 * @return {*}
		 */


		get stack() {
			return this._stack;
		}
		/**
		 * Modality setter
		 *
		 * @param {*} modality
		 */


		set modality(modality) {
			this._modality = modality;
		}
		/**
		 * Modality getter
		 *
		 * @return {*}
		 */


		get modality() {
			return this._modality;
		}
		/**
		 * Segmentation type setter
		 *
		 * @param {*} segmentationType
		 */


		set segmentationType(segmentationType) {
			this._segmentationType = segmentationType;
		}
		/**
		 * Segmentation type getter
		 *
		 * @return {*}
		 */


		get segmentationType() {
			return this._segmentationType;
		}
		/**
		 * Segmentation segments setter
		 *
		 * @param {*} segmentationSegments
		 */


		set segmentationSegments(segmentationSegments) {
			this._segmentationSegments = segmentationSegments;
		}
		/**
		 * Segmentation segments getter
		 *
		 * @return {*}
		 */


		get segmentationSegments() {
			return this._segmentationSegments;
		}

	}

	/** * Imports ***/

	const binaryString = require('math-float32-to-binary-string');
	/**
	 * Stack object.
	 *
	 * @module models/stack
	 */


	class ModelsStack extends ModelsBase {
		/**
		 * Models Stack constructor
		 */
		constructor() {
			super();
			this._uid = null;
			this._stackID = -1;
			this._frame = [];
			this._numberOfFrames = 0;
			this._rows = 0;
			this._columns = 0;
			this._numberOfChannels = 1;
			this._bitsAllocated = 8;
			this._pixelType = 0;
			this._pixelRepresentation = 0;
			this._textureSize = 4096;
			this._textureUnits = 7;
			this._rawData = [];
			this._windowCenter = 0;
			this._windowWidth = 0;
			this._rescaleSlope = 1;
			this._rescaleIntercept = 0;
			this._minMax = [Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY]; // TRANSFORMATION MATRICES

			this._regMatrix = new three.Matrix4();
			this._ijk2LPS = null;
			this._lps2IJK = null;
			this._aabb2LPS = null;
			this._lps2AABB = null; //
			// IJK dimensions

			this._dimensionsIJK = null;
			this._halfDimensionsIJK = null;
			this._spacing = new three.Vector3(1, 1, 1);
			this._spacingBetweenSlices = 0;
			this._sliceThickness = 0;
			this._origin = null;
			this._rightHanded = true;
			this._xCosine = new three.Vector3(1, 0, 0);
			this._yCosine = new three.Vector3(0, 1, 0);
			this._zCosine = new three.Vector3(0, 0, 1); // convenience vars

			this._prepared = false;
			this._packed = false;
			this._packedPerPixel = 1; //

			this._modality = 'Modality not set'; // SEGMENTATION STUFF

			this._segmentationType = null;
			this._segmentationSegments = [];
			this._segmentationDefaultColor = [63, 174, 128];
			this._frameSegment = [];
			this._segmentationLUT = [];
			this._segmentationLUTO = []; // photometricInterpretation Monochrome1 VS Monochrome2

			this._invert = false;
		}
		/**
		 * Prepare segmentation stack.
		 * A segmentation stack can hold x frames that are at the same location
		 * but segmentation specific information:
		 * - Frame X contains voxels for segmentation A.
		 * - Frame Y contains voxels for segmenttation B.
		 * - Frame X and Y are at the same location.
		 *
		 * We currently merge overlaping frames into 1.
		 */


		prepareSegmentation() {
			// store frame and do special pre-processing
			this._frameSegment = this._frame;
			let mergedFrames = []; // order frames

			this.computeCosines();

			this._frame.map(this._computeDistanceArrayMap.bind(null, this._zCosine));

			this._frame.sort(this._sortDistanceArraySort); // merge frames


			let prevIndex = -1;

			for (let i = 0; i < this._frame.length; i++) {
				if (!mergedFrames[prevIndex] || mergedFrames[prevIndex]._dist != this._frame[i]._dist) {
					mergedFrames.push(this._frame[i]);
					prevIndex++; // Scale frame
					// by default each frame contains binary data about a segmentation.
					// we scale it by the referenceSegmentNumber in order to have a
					// segmentation specific voxel value rather than 0 or 1.
					// That allows us to merge frames later on.
					// If we merge frames without scaling, then we can not differenciate
					// voxels from segmentation A or B as the value is 0 or 1 in both cases.

					for (let k = 0; k < mergedFrames[prevIndex]._rows * mergedFrames[prevIndex]._columns; k++) {
						mergedFrames[prevIndex]._pixelData[k] *= this._frame[i]._referencedSegmentNumber;
					}
				} else {
					// frame already exsits at this location.
					// merge data from this segmentation into existing frame
					for (let k = 0; k < mergedFrames[prevIndex]._rows * mergedFrames[prevIndex]._columns; k++) {
						mergedFrames[prevIndex]._pixelData[k] += this._frame[i].pixelData[k] * this._frame[i]._referencedSegmentNumber;
					}
				}

				mergedFrames[prevIndex].minMax = CoreUtils.minMax(mergedFrames[prevIndex]._pixelData);
			} // get information about segments


			let dict = {};
			let max = 0;

			for (let i = 0; i < this._segmentationSegments.length; i++) {
				max = Math.max(max, parseInt(this._segmentationSegments[i].segmentNumber, 10));
				let color = this._segmentationSegments[i].recommendedDisplayCIELab;

				if (color === null) {
					dict[this._segmentationSegments[i].segmentNumber] = this._segmentationDefaultColor;
				} else {
					dict[this._segmentationSegments[i].segmentNumber] = Colors.cielab2RGB(...color);
				}
			} // generate LUTs


			for (let i = 0; i <= max; i++) {
				let index = i / max;
				let opacity = i ? 1 : 0;
				let rgb = [0, 0, 0];

				if (dict.hasOwnProperty(i.toString())) {
					rgb = dict[i.toString()];
				}

				rgb[0] /= 255;
				rgb[1] /= 255;
				rgb[2] /= 255;

				this._segmentationLUT.push([index, ...rgb]);

				this._segmentationLUTO.push([index, opacity]);
			}

			this._frame = mergedFrames;
		}
		/**
		 * Compute cosines
		 * Order frames
		 * computeSpacing
		 * sanityCheck
		 * init some vars
		 * compute min/max
		 * compute transformation matrices
		 *
		 * @return {*}
		 */


		prepare() {
			// if segmentation, merge some frames...
			if (this._modality === 'SEG') {
				this.prepareSegmentation();
			}

			this.computeNumberOfFrames(); // pass parameters from frame to stack

			this._rows = this._frame[0].rows;
			this._columns = this._frame[0].columns;
			this._dimensionsIJK = new three.Vector3(this._columns, this._rows, this._numberOfFrames);
			this._halfDimensionsIJK = new three.Vector3(this._dimensionsIJK.x / 2, this._dimensionsIJK.y / 2, this._dimensionsIJK.z / 2);
			this._spacingBetweenSlices = this._frame[0].spacingBetweenSlices;
			this._sliceThickness = this._frame[0].sliceThickness; // compute direction cosines

			this.computeCosines(); // order the frames

			if (this._numberOfFrames > 1) {
				this.orderFrames();
			} // compute/guess spacing


			this.computeSpacing(); // set extra vars if nulls
			// do it now because before we would think image position/orientation
			// are defined and we would use it to compute spacing.

			if (!this._frame[0].imagePosition) {
				this._frame[0].imagePosition = [0, 0, 0];
			}

			if (!this._frame[0].imageOrientation) {
				this._frame[0].imageOrientation = [1, 0, 0, 0, 1, 0];
			}

			this._origin = this._arrayToVector3(this._frame[0].imagePosition, 0); // compute transforms

			this.computeIJK2LPS();
			this.computeLPS2AABB(); // this.packEchos();

			const middleFrameIndex = Math.floor(this._frame.length / 2);
			const middleFrame = this._frame[middleFrameIndex];
			this._rescaleSlope = middleFrame.rescaleSlope || 1;
			this._rescaleIntercept = middleFrame.rescaleIntercept || 0; // rescale/slope min max

			this.computeMinMaxIntensities();
			this._minMax[0] = CoreUtils.rescaleSlopeIntercept(this._minMax[0], this._rescaleSlope, this._rescaleIntercept);
			this._minMax[1] = CoreUtils.rescaleSlopeIntercept(this._minMax[1], this._rescaleSlope, this._rescaleIntercept);
			this._windowWidth = middleFrame.windowWidth || this._minMax[1] - this._minMax[0];
			this._windowCenter = middleFrame.windowCenter || this._minMax[0] + this._windowWidth / 2;
			this._bitsAllocated = middleFrame.bitsAllocated;
			this._prepared = true;
		}

		packEchos() {
			// 4 echo times...
			let echos = 4;
			let packedEcho = [];

			for (let i = 0; i < this._frame.length; i += echos) {
				let frame = this._frame[i];

				for (let k = 0; k < this._rows * this._columns; k++) {
					for (let j = 1; j < echos; j++) {
						frame.pixelData[k] += this._frame[i + j].pixelData[k];
					}

					frame.pixelData[k] /= echos;
				}

				packedEcho.push(frame);
			}

			this._frame = packedEcho;
			this._numberOfFrames = this._frame.length;
			this._dimensionsIJK = new three.Vector3(this._columns, this._rows, this._numberOfFrames);
			this._halfDimensionsIJK = new three.Vector3(this._dimensionsIJK.x / 2, this._dimensionsIJK.y / 2, this._dimensionsIJK.z / 2);
		}

		computeNumberOfFrames() {
			// we need at least 1 frame
			if (this._frame && this._frame.length > 0) {
				this._numberOfFrames = this._frame.length;
			} else {
				console.warn("_frame doesn't contain anything....");
				console.warn(this._frame);
				return false;
			}
		} // frame.cosines - returns array [x, y, z]


		computeCosines() {
			if (this._frame && this._frame[0]) {
				let cosines = this._frame[0].cosines();

				this._xCosine = cosines[0];
				this._yCosine = cosines[1];
				this._zCosine = cosines[2];
			}
		}

		orderFrames() {
			// order the frames based on theirs dimension indices
			// first index is the most important.
			// 1,1,1,1 will be first
			// 1,1,2,1 will be next
			// 1,1,2,3 will be next
			// 1,1,3,1 will be next
			if (this._frame[0].dimensionIndexValues) {
				this._frame.sort(this._orderFrameOnDimensionIndicesArraySort); // else order with image position and orientation

			} else if (this._frame[0].imagePosition && this._frame[0].imageOrientation && this._frame[1] && this._frame[1].imagePosition && this._frame[1].imageOrientation && this._frame[0].imagePosition.join() !== this._frame[1].imagePosition.join()) {
				// compute and sort by dist in this series
				this._frame.map(this._computeDistanceArrayMap.bind(null, this._zCosine));

				this._frame.sort(this._sortDistanceArraySort);
			} else if (this._frame[0].instanceNumber !== null && this._frame[1] && this._frame[1].instanceNumber !== null && this._frame[0].instanceNumber !== this._frame[1].instanceNumber) {
				this._frame.sort(this._sortInstanceNumberArraySort);
			} else if (this._frame[0].sopInstanceUID && this._frame[1] && this._frame[1].sopInstanceUID && this._frame[0].sopInstanceUID !== this._frame[1].sopInstanceUID) {
				this._frame.sort(this._sortSopInstanceUIDArraySort);
			} else if (!this._frame[0].imagePosition) ; else {
				console.warn('do not know how to order the frames...');
			}
		}

		computeSpacing() {
			this.xySpacing();
			this.zSpacing();
		}
		/**
		 * Compute stack z spacing
		 */


		zSpacing() {
			if (this._numberOfFrames > 1) {
				if (this._frame[0].pixelSpacing && this._frame[0].pixelSpacing[2]) {
					this._spacing.z = this._frame[0].pixelSpacing[2];
				} else {
					// compute and sort by dist in this series
					this._frame.map(this._computeDistanceArrayMap.bind(null, this._zCosine)); // if distances are different, re-sort array


					if (this._frame[1].dist !== this._frame[0].dist) {
						this._frame.sort(this._sortDistanceArraySort);

						this._spacing.z = this._frame[1].dist - this._frame[0].dist;
					} else if (this._spacingBetweenSlices) {
						this._spacing.z = this._spacingBetweenSlices;
					} else if (this._frame[0].sliceThickness) {
						this._spacing.z = this._frame[0].sliceThickness;
					}
				}
			} // Spacing
			// can not be 0 if not matrix can not be inverted.


			if (this._spacing.z === 0) {
				this._spacing.z = 1;
			}
		}
		/**
		 *	FRAME CAN DO IT
		 */


		xySpacing() {
			if (this._frame && this._frame[0]) {
				let spacingXY = this._frame[0].spacingXY();

				this._spacing.x = spacingXY[0];
				this._spacing.y = spacingXY[1];
			}
		}
		/**
		 * Find min and max intensities among all frames.
		 */


		computeMinMaxIntensities() {
			// what about colors!!!!?
			// we ignore values if NaNs
			// https://github.com/FNNDSC/ami/issues/185
			for (let i = 0; i < this._frame.length; i++) {
				// get min/max
				let min = this._frame[i].minMax[0];

				if (!Number.isNaN(min)) {
					this._minMax[0] = Math.min(this._minMax[0], min);
				}

				let max = this._frame[i].minMax[1];

				if (!Number.isNaN(max)) {
					this._minMax[1] = Math.max(this._minMax[1], max);
				}
			}
		}
		/**
		 * Compute IJK to LPS and invert transforms
		 */


		computeIJK2LPS() {
			// ijk to lps
			this._ijk2LPS = CoreUtils.ijk2LPS(this._xCosine, this._yCosine, this._zCosine, this._spacing, this._origin, this._regMatrix); // lps 2 ijk

			this._lps2IJK = new three.Matrix4();

			this._lps2IJK.getInverse(this._ijk2LPS);
		}
		/**
		 * Compute LPS to AABB and invert transforms
		 */


		computeLPS2AABB() {
			this._aabb2LPS = CoreUtils.aabb2LPS(this._xCosine, this._yCosine, this._zCosine, this._origin);
			this._lps2AABB = new three.Matrix4();

			this._lps2AABB.getInverse(this._aabb2LPS);
		}
		/**
		 * Merge stacks
		 *
		 * @param {*} stack
		 *
		 * @return {*}
		 */


		merge(stack) {
			// also make sure x/y/z cosines are a match!
			if (this._stackID === stack.stackID && this._numberOfFrames === 1 && stack._numberOfFrames === 1 && this._frame[0].columns === stack.frame[0].columns && this._frame[0].rows === stack.frame[0].rows && this._xCosine.equals(stack.xCosine) && this._yCosine.equals(stack.yCosine) && this._zCosine.equals(stack.zCosine)) {
				return this.mergeModels(this._frame, stack.frame);
			} else {
				return false;
			}
		}
		/**
		 * Pack current stack pixel data into 8 bits array buffers
		 */


		pack() {
			// Get total number of voxels
			const nbVoxels = this._dimensionsIJK.x * this._dimensionsIJK.y * this._dimensionsIJK.z; // Packing style

			if (this._bitsAllocated === 8 && this._numberOfChannels === 1 || this._bitsAllocated === 1) {
				this._packedPerPixel = 4;
			}

			if (this._bitsAllocated === 16 && this._numberOfChannels === 1) {
				this._packedPerPixel = 2;
			} // Loop through all the textures we need


			const textureDimension = this._textureSize * this._textureSize;
			let requiredTextures = Math.ceil(nbVoxels / (textureDimension * this._packedPerPixel));
			let voxelIndexStart = 0;
			let voxelIndexStop = this._packedPerPixel * textureDimension;

			if (voxelIndexStop > nbVoxels) {
				voxelIndexStop = nbVoxels;
			}

			if (this._textureUnits < requiredTextures) {
				console.warn('Insufficient number of supported textures. Some frames will not be packed.');
				requiredTextures = this._textureUnits;
			}

			for (let ii = 0; ii < requiredTextures; ii++) {
				const packed = this._packTo8Bits(this._numberOfChannels, this._frame, this._textureSize, voxelIndexStart, voxelIndexStop);

				this._textureType = packed.textureType;

				this._rawData.push(packed.data);

				voxelIndexStart += this._packedPerPixel * textureDimension;
				voxelIndexStop += this._packedPerPixel * textureDimension;

				if (voxelIndexStop > nbVoxels) {
					voxelIndexStop = nbVoxels;
				}
			}

			this._packed = true;
		}
		/**
		 * Pack frame data to 32 bits texture
		 * @param {*} channels
		 * @param {*} frame
		 * @param {*} textureSize
		 * @param {*} startVoxel
		 * @param {*} stopVoxel
		 */


		_packTo8Bits(channels, frame, textureSize, startVoxel, stopVoxel) {
			const packed = {
				textureType: null,
				data: null
			};
			const bitsAllocated = frame[0].bitsAllocated;
			const pixelType = frame[0].pixelType; // transform signed to unsigned for convenience

			let offset = 0;

			if (this._minMax[0] < 0) {
				offset -= this._minMax[0];
			}

			let packIndex = 0;
			let frameIndex = 0;
			let inFrameIndex = 0; // frame should return it!

			const frameDimension = frame[0].rows * frame[0].columns;

			if (bitsAllocated === 8 && channels === 1 || bitsAllocated === 1) {
				let data = new Uint8Array(textureSize * textureSize * 4);
				let coordinate = 0;
				let channelOffset = 0;

				for (let i = startVoxel; i < stopVoxel; i++) {
					frameIndex = ~~(i / frameDimension);
					inFrameIndex = i % frameDimension;
					let raw = frame[frameIndex].pixelData[inFrameIndex] + offset;

					if (!Number.isNaN(raw)) {
						data[4 * coordinate + channelOffset] = raw;
					}

					packIndex++;
					coordinate = Math.floor(packIndex / 4);
					channelOffset = packIndex % 4;
				}

				packed.textureType = three.RGBAFormat;
				packed.data = data;
			} else if (bitsAllocated === 16 && channels === 1) {
				let data = new Uint8Array(textureSize * textureSize * 4);
				let coordinate = 0;
				let channelOffset = 0;

				for (let i = startVoxel; i < stopVoxel; i++) {
					frameIndex = ~~(i / frameDimension);
					inFrameIndex = i % frameDimension;
					let raw = frame[frameIndex].pixelData[inFrameIndex] + offset;

					if (!Number.isNaN(raw)) {
						data[4 * coordinate + 2 * channelOffset] = raw & 0x00ff;
						data[4 * coordinate + 2 * channelOffset + 1] = raw >>> 8 & 0x00ff;
					}

					packIndex++;
					coordinate = Math.floor(packIndex / 2);
					channelOffset = packIndex % 2;
				}

				packed.textureType = three.RGBAFormat;
				packed.data = data;
			} else if (bitsAllocated === 32 && channels === 1 && pixelType === 0) {
				let data = new Uint8Array(textureSize * textureSize * 4);

				for (let i = startVoxel; i < stopVoxel; i++) {
					frameIndex = ~~(i / frameDimension);
					inFrameIndex = i % frameDimension;
					let raw = frame[frameIndex].pixelData[inFrameIndex] + offset;

					if (!Number.isNaN(raw)) {
						data[4 * packIndex] = raw & 0x000000ff;
						data[4 * packIndex + 1] = raw >>> 8 & 0x000000ff;
						data[4 * packIndex + 2] = raw >>> 16 & 0x000000ff;
						data[4 * packIndex + 3] = raw >>> 24 & 0x000000ff;
					}

					packIndex++;
				}

				packed.textureType = three.RGBAFormat;
				packed.data = data;
			} else if (bitsAllocated === 32 && channels === 1 && pixelType === 1) {
				let data = new Uint8Array(textureSize * textureSize * 4);

				for (let i = startVoxel; i < stopVoxel; i++) {
					frameIndex = ~~(i / frameDimension);
					inFrameIndex = i % frameDimension;
					let raw = frame[frameIndex].pixelData[inFrameIndex] + offset;

					if (!Number.isNaN(raw)) {
						let bitString = binaryString(raw);
						let bitStringArray = bitString.match(/.{1,8}/g);
						data[4 * packIndex] = parseInt(bitStringArray[0], 2);
						data[4 * packIndex + 1] = parseInt(bitStringArray[1], 2);
						data[4 * packIndex + 2] = parseInt(bitStringArray[2], 2);
						data[4 * packIndex + 3] = parseInt(bitStringArray[3], 2);
					}

					packIndex++;
				}

				packed.textureType = three.RGBAFormat;
				packed.data = data;
			} else if (bitsAllocated === 8 && channels === 3) {
				let data = new Uint8Array(textureSize * textureSize * 3);

				for (let i = startVoxel; i < stopVoxel; i++) {
					frameIndex = ~~(i / frameDimension);
					inFrameIndex = i % frameDimension;
					data[3 * packIndex] = frame[frameIndex].pixelData[3 * inFrameIndex];
					data[3 * packIndex + 1] = frame[frameIndex].pixelData[3 * inFrameIndex + 1];
					data[3 * packIndex + 2] = frame[frameIndex].pixelData[3 * inFrameIndex + 2];
					packIndex++;
				}

				packed.textureType = three.RGBFormat;
				packed.data = data;
			}

			return packed;
		}
		/**
		 * Get the stack world center
		 *
		 *@return {*}
		 */


		worldCenter() {
			let center = this._halfDimensionsIJK.clone().addScalar(-0.5).applyMatrix4(this._ijk2LPS);

			return center;
		}
		/**
		 * Get the stack world bounding box
		 * @return {*}
		 */


		worldBoundingBox() {
			let bbox = [Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY];
			const dims = this._dimensionsIJK;

			for (let i = 0; i <= dims.x; i += dims.x) {
				for (let j = 0; j <= dims.y; j += dims.y) {
					for (let k = 0; k <= dims.z; k += dims.z) {
						let world = new three.Vector3(i, j, k).applyMatrix4(this._ijk2LPS);
						bbox = [Math.min(bbox[0], world.x), Math.max(bbox[1], world.x), // x min/max
						Math.min(bbox[2], world.y), Math.max(bbox[3], world.y), Math.min(bbox[4], world.z), Math.max(bbox[5], world.z)];
					}
				}
			}

			return bbox;
		}
		/**
		 * Get AABB size in LPS space.
		 *
		 * @return {*}
		 */


		AABBox() {
			let world0 = new three.Vector3().addScalar(-0.5).applyMatrix4(this._ijk2LPS).applyMatrix4(this._lps2AABB);

			let world7 = this._dimensionsIJK.clone().addScalar(-0.5).applyMatrix4(this._ijk2LPS).applyMatrix4(this._lps2AABB);

			let minBBox = new three.Vector3(Math.abs(world0.x - world7.x), Math.abs(world0.y - world7.y), Math.abs(world0.z - world7.z));
			return minBBox;
		}
		/**
		 * Get AABB center in LPS space
		 */


		centerAABBox() {
			let centerBBox = this.worldCenter();
			centerBBox.applyMatrix4(this._lps2AABB);
			return centerBBox;
		}

		static indexInDimensions(index, dimensions) {
			if (index.x >= 0 && index.y >= 0 && index.z >= 0 && index.x < dimensions.x && index.y < dimensions.y && index.z < dimensions.z) {
				return true;
			}

			return false;
		}

		_arrayToVector3(array, index) {
			return new three.Vector3(array[index], array[index + 1], array[index + 2]);
		}

		_orderFrameOnDimensionIndicesArraySort(a, b) {
			if ('dimensionIndexValues' in a && Object.prototype.toString.call(a.dimensionIndexValues) === '[object Array]' && 'dimensionIndexValues' in b && Object.prototype.toString.call(b.dimensionIndexValues) === '[object Array]') {
				for (let i = 0; i < a.dimensionIndexValues.length; i++) {
					if (parseInt(a.dimensionIndexValues[i], 10) > parseInt(b.dimensionIndexValues[i], 10)) {
						return 1;
					}

					if (parseInt(a.dimensionIndexValues[i], 10) < parseInt(b.dimensionIndexValues[i], 10)) {
						return -1;
					}
				}
			} else {
				console.warn("One of the frames doesn't have a dimensionIndexValues array.");
				console.warn(a);
				console.warn(b);
			}

			return 0;
		}

		_computeDistanceArrayMap(normal, frame) {
			if (frame.imagePosition) {
				frame.dist = frame.imagePosition[0] * normal.x + frame.imagePosition[1] * normal.y + frame.imagePosition[2] * normal.z;
			}

			return frame;
		}

		_sortDistanceArraySort(a, b) {
			return a.dist - b.dist;
		}

		_sortInstanceNumberArraySort(a, b) {
			return a.instanceNumber - b.instanceNumber;
		}

		_sortSopInstanceUIDArraySort(a, b) {
			return a.sopInstanceUID - b.sopInstanceUID;
		}

		set numberOfChannels(numberOfChannels) {
			this._numberOfChannels = numberOfChannels;
		}

		get numberOfChannels() {
			return this._numberOfChannels;
		}

		set frame(frame) {
			this._frame = frame;
		}

		get frame() {
			return this._frame;
		}

		set prepared(prepared) {
			this._prepared = prepared;
		}

		get prepared() {
			return this._prepared;
		}

		set packed(packed) {
			this._packed = packed;
		}

		get packed() {
			return this._packed;
		}

		set packedPerPixel(packedPerPixel) {
			this._packedPerPixel = packedPerPixel;
		}

		get packedPerPixel() {
			return this._packedPerPixel;
		}

		set dimensionsIJK(dimensionsIJK) {
			this._dimensionsIJK = dimensionsIJK;
		}

		get dimensionsIJK() {
			return this._dimensionsIJK;
		}

		set halfDimensionsIJK(halfDimensionsIJK) {
			this._halfDimensionsIJK = halfDimensionsIJK;
		}

		get halfDimensionsIJK() {
			return this._halfDimensionsIJK;
		}

		set regMatrix(regMatrix) {
			this._regMatrix = regMatrix;
		}

		get regMatrix() {
			return this._regMatrix;
		}

		set ijk2LPS(ijk2LPS) {
			this._ijk2LPS = ijk2LPS;
		}

		get ijk2LPS() {
			return this._ijk2LPS;
		}

		set lps2IJK(lps2IJK) {
			this._lps2IJK = lps2IJK;
		}

		get lps2IJK() {
			return this._lps2IJK;
		}

		set lps2AABB(lps2AABB) {
			this._lps2AABB = lps2AABB;
		}

		get lps2AABB() {
			return this._lps2AABB;
		}

		set textureSize(textureSize) {
			this._textureSize = textureSize;
		}

		get textureSize() {
			return this._textureSize;
		}

		set textureUnits(textureUnits) {
			this._textureUnits = textureUnits;
		}

		get textureUnits() {
			return this._textureUnits;
		}

		set textureType(textureType) {
			this._textureType = textureType;
		}

		get textureType() {
			return this._textureType;
		}

		set bitsAllocated(bitsAllocated) {
			this._bitsAllocated = bitsAllocated;
		}

		get bitsAllocated() {
			return this._bitsAllocated;
		}

		set rawData(rawData) {
			this._rawData = rawData;
		}

		get rawData() {
			return this._rawData;
		}

		get windowWidth() {
			return this._windowWidth;
		}

		set windowWidth(windowWidth) {
			this._windowWidth = windowWidth;
		}

		get windowCenter() {
			return this._windowCenter;
		}

		set windowCenter(windowCenter) {
			this._windowCenter = windowCenter;
		}

		get rescaleSlope() {
			return this._rescaleSlope;
		}

		set rescaleSlope(rescaleSlope) {
			this._rescaleSlope = rescaleSlope;
		}

		get rescaleIntercept() {
			return this._rescaleIntercept;
		}

		set rescaleIntercept(rescaleIntercept) {
			this._rescaleIntercept = rescaleIntercept;
		}

		get xCosine() {
			return this._xCosine;
		}

		set xCosine(xCosine) {
			this._xCosine = xCosine;
		}

		get yCosine() {
			return this._yCosine;
		}

		set yCosine(yCosine) {
			this._yCosine = yCosine;
		}

		get zCosine() {
			return this._zCosine;
		}

		set zCosine(zCosine) {
			this._zCosine = zCosine;
		}

		get minMax() {
			return this._minMax;
		}

		set minMax(minMax) {
			this._minMax = minMax;
		}

		get stackID() {
			return this._stackID;
		}

		set stackID(stackID) {
			this._stackID = stackID;
		}

		get pixelType() {
			return this._pixelType;
		}

		set pixelType(pixelType) {
			this._pixelType = pixelType;
		}

		get pixelRepresentation() {
			return this._pixelRepresentation;
		}

		set pixelRepresentation(pixelRepresentation) {
			this._pixelRepresentation = pixelRepresentation;
		}

		set invert(invert) {
			this._invert = invert;
		}

		get invert() {
			return this._invert;
		}

		set modality(modality) {
			this._modality = modality;
		}

		get modality() {
			return this._modality;
		}

		get rightHanded() {
			return this._rightHanded;
		}

		set rightHanded(rightHanded) {
			this._rightHanded = rightHanded;
		}

		get spacingBetweenSlices() {
			return this._spacingBetweenSlices;
		}

		set spacingBetweenSlices(spacingBetweenSlices) {
			this._spacingBetweenSlices = spacingBetweenSlices;
		}

		set segmentationSegments(segmentationSegments) {
			this._segmentationSegments = segmentationSegments;
		}

		get segmentationSegments() {
			return this._segmentationSegments;
		}

		set segmentationType(segmentationType) {
			this._segmentationType = segmentationType;
		}

		get segmentationType() {
			return this._segmentationType;
		}

		set segmentationLUT(segmentationLUT) {
			this._segmentationLUT = segmentationLUT;
		}

		get segmentationLUT() {
			return this._segmentationLUT;
		}

		set segmentationLUTO(segmentationLUTO) {
			this._segmentationLUTO = segmentationLUTO;
		}

		get segmentationLUTO() {
			return this._segmentationLUTO;
		} // DEPRECATED FUNCTION

		/**
		 * @deprecated for core.utils.value
		 *
		 * Get voxel value.
		 *
		 * @param {*} stack
		 * @param {*} coordinate
		 *
		 * @return {*}
		 */


		static value(stack, coordinate) {
			console.warn(`models.stack.value is deprecated.
			 Please use core.utils.value instead.`);
			return CoreUtils.value(stack, coordinate);
		}
		/**
		 * @deprecated for core.utils.rescaleSlopeIntercept
		 *
		 * Apply slope/intercept to a value.
		 *
		 * @param {*} value
		 * @param {*} slope
		 * @param {*} intercept
		 *
		 * @return {*}
		 */


		static valueRescaleSlopeIntercept(value, slope, intercept) {
			console.warn(`models.stack.valueRescaleSlopeIntercept is deprecated.
			 Please use core.utils.rescaleSlopeIntercept instead.`);
			return CoreUtils.rescaleSlopeIntercept(value, slope, intercept);
		}
		/**
		 * @deprecated for core.utils.worldToData
		 *
		 * Transform coordinates from world coordinate to data
		 *
		 * @param {*} stack
		 * @param {*} worldCoordinates
		 *
		 * @return {*}
		 */


		static worldToData(stack, worldCoordinates) {
			console.warn(`models.stack.worldToData is deprecated.
			 Please use core.utils.worldToData instead.`);
			return CoreUtils.worldToData(stack._lps2IJK, worldCoordinates);
		}

	}

	/** * Imports ***/
	/**
	 * Frame object.
	 *
	 * @module models/frame
	 */

	class ModelsFrame extends ModelsBase {
		/**
		 * Constructor
		 */
		constructor() {
			super();
			this._sopInstanceUID = null;
			this._url = null;
			this._stackID = -1;
			this._invert = false;
			this._frameTime = null;
			this._ultrasoundRegions = [];
			this._rows = 0;
			this._columns = 0;
			this._dimensionIndexValues = [];
			this._imagePosition = null;
			this._imageOrientation = null;
			this._rightHanded = true;
			this._sliceThickness = 1;
			this._spacingBetweenSlices = null;
			this._pixelPaddingValue = null;
			this._pixelRepresentation = 0;
			this._pixelType = 0;
			this._pixelSpacing = null;
			this._pixelAspectRatio = null;
			this._pixelData = null;
			this._instanceNumber = null;
			this._windowCenter = null;
			this._windowWidth = null;
			this._rescaleSlope = null;
			this._rescaleIntercept = null;
			this._bitsAllocated = 8;
			this._numberOfChannels = 1;
			this._minMax = null;
			this._dist = null;
			this._index = -1;
			this._referencedSegmentNumber = -1;
		}
		/**
		 * Validate the frame.
		 *
		 * @param {*} model
		 *
		 * @return {*}
		 */


		validate(model) {
			if (!(super.validate(model) && typeof model.cosines === 'function' && typeof model.spacingXY === 'function' && model.hasOwnProperty('_sopInstanceUID') && model.hasOwnProperty('_dimensionIndexValues') && model.hasOwnProperty('_imageOrientation') && model.hasOwnProperty('_imagePosition'))) {
				return false;
			}

			return true;
		}
		/**
		 * Merge current frame with provided frame.
		 *
		 * Frames can be merged (i.e. are identical) if following are equals:
		 *	- dimensionIndexValues
		 *	- imageOrientation
		 *	- imagePosition
		 *	- instanceNumber
		 *	- sopInstanceUID
		 *
		 * @param {*} frame
		 *
		 * @return {boolean} True if frames could be merge. False if not.
		 */


		merge(frame) {
			if (!this.validate(frame)) {
				return false;
			}

			if (this._compareArrays(this._dimensionIndexValues, frame.dimensionIndexValues) && this._compareArrays(this._imageOrientation, frame.imageOrientation) && this._compareArrays(this._imagePosition, frame.imagePosition) && this._instanceNumber === frame.instanceNumber && this._sopInstanceUID === frame.sopInstanceUID) {
				return true;
			} else {
				return false;
			}
		}
		/**
		 * Generate X, y and Z cosines from image orientation
		 * Returns default orientation if _imageOrientation was invalid.
		 *
		 * @returns {array} Array[3] containing cosinesX, Y and Z.
		 */


		cosines() {
			let cosines = [new three.Vector3(1, 0, 0), new three.Vector3(0, 1, 0), new three.Vector3(0, 0, 1)];

			if (this._imageOrientation && this._imageOrientation.length === 6) {
				let xCos = new three.Vector3(this._imageOrientation[0], this._imageOrientation[1], this._imageOrientation[2]);
				let yCos = new three.Vector3(this._imageOrientation[3], this._imageOrientation[4], this._imageOrientation[5]);

				if (xCos.length() > 0 && yCos.length() > 0) {
					cosines[0] = xCos;
					cosines[1] = yCos;
					cosines[2] = new three.Vector3(0, 0, 0).crossVectors(cosines[0], cosines[1]).normalize();
				}
			} else {
				console.log('No valid image orientation for frame');
				console.log(this);
				console.log('Returning default orientation.');
			}

			if (!this._rightHanded) {
				cosines[2].negate();
			}

			return cosines;
		}
		/**
		 * Get x/y spacing of a frame.
		 *
		 * @return {*}
		 */


		spacingXY() {
			let spacingXY = [1.0, 1.0];

			if (this.pixelSpacing) {
				spacingXY[0] = this.pixelSpacing[0];
				spacingXY[1] = this.pixelSpacing[1];
			} else if (this.pixelAspectRatio) {
				spacingXY[0] = 1.0;
				spacingXY[1] = 1.0 * this.pixelAspectRatio[1] / this.pixelAspectRatio[0];
			}

			return spacingXY;
		}
		/**
		 * Get data value
		 *
		 * @param {*} column
		 * @param {*} row
		 * @return {*}
		 */


		getPixelData(column, row) {
			if (column >= 0 && column < this._columns && row >= 0 && row < this._rows) {
				return this.pixelData[column + this._columns * row];
			} else {
				return null;
			}
		}
		/**
		 * Set data value
		 *
		 * @param {*} column
		 * @param {*} row
		 * @param {*} value
		 * @return {*}
		 */


		setPixelData(column, row, value) {
			this.pixelData[column + this._columns * row] = value;
		}
		/**
		 * Get frame preview as data:URL
		 *
		 * @return {String}
		 */


		getImageDataUrl() {
			const canvas = document.createElement('canvas');
			canvas.width = this._columns;
			canvas.height = this._rows;
			const context = canvas.getContext('2d');
			const imageData = context.createImageData(canvas.width, canvas.height);
			imageData.data.set(this._frameToCanvas());
			context.putImageData(imageData, 0, 0);
			return canvas.toDataURL();
		}
		/**
		 * Convert frame.pixelData to canvas.context.imageData.data
		 *
		 * @return {Uint8Array}
		 */


		_frameToCanvas() {
			const dimension = this._columns * this._rows;
			const params = {
				invert: this._invert,
				min: this._minMax[0],
				padding: this._pixelPaddingValue
			};
			let data = new Uint8Array(dimension * 4);

			if (params.padding !== null) {
				// recalculation of min ignoring pixelPaddingValue
				params.min = this._minMax[1];

				for (let index = 0, numPixels = this._pixelData.length; index < numPixels; index++) {
					if (this._pixelData[index] !== params.padding) {
						params.min = Math.min(params.min, this._pixelData[index]);
					}
				}
			}

			if (this._windowWidth && this._windowCenter !== null) {
				// applying windowCenter and windowWidth
				const intercept = this._rescaleIntercept || 0;
				const slope = this._rescaleSlope || 1;
				params.min = Math.max((this._windowCenter - this._windowWidth / 2 - intercept) / slope, params.min);
				params.max = Math.min((this._windowCenter + this._windowWidth / 2 - intercept) / slope, this._minMax[1]);
			} else {
				params.max = this._minMax[1];
			}

			params.range = params.max - params.min || 255; // if max is 0 convert it to: 255 - black, 1 - white

			if (this._numberOfChannels === 1) {
				for (let i = 0; i < dimension; i++) {
					const normalized = this._pixelTo8Bit(this._pixelData[i], params);

					data[4 * i] = normalized;
					data[4 * i + 1] = normalized;
					data[4 * i + 2] = normalized;
					data[4 * i + 3] = 255; // alpha channel (fully opaque)
				}
			} else if (this._numberOfChannels === 3) {
				for (let i = 0; i < dimension; i++) {
					data[4 * i] = this._pixelTo8Bit(this._pixelData[3 * i], params);
					data[4 * i + 1] = this._pixelTo8Bit(this._pixelData[3 * i + 1], params);
					data[4 * i + 2] = this._pixelTo8Bit(this._pixelData[3 * i + 2], params);
					data[4 * i + 3] = 255; // alpha channel (fully opaque)
				}
			}

			return data;
		}
		/**
		 * Convert pixel value to 8 bit (canvas.context.imageData.data: maximum 8 bit per each of RGBA value)
		 *
		 * @param {Number} value	Pixel value
		 * @param {Object} params {invert, min, mix, padding, range}
		 *
		 * @return {Number}
		 */


		_pixelTo8Bit(value, params) {
			// values equal to pixelPaddingValue are outside of the image and should be ignored
			let packedValue = value <= params.min || value === params.padding ? 0 : 255;

			if (value > params.min && value < params.max) {
				packedValue = Math.round((value - params.min) * 255 / params.range);
			}

			return Number.isNaN(packedValue) ? 0 : params.invert ? 255 - packedValue : packedValue;
		}
		/**
		 * Compare 2 arrays.
		 *
		 * 2 null arrays return true.
		 * Do no perform strict type checking.
		 *
		 * @param {*} reference
		 * @param {*} target
		 *
		 * @return {boolean} True if arrays are identicals. False if not.
		 */


		_compareArrays(reference, target) {
			// could both be null
			if (reference === target) {
				return true;
			} // if not null....


			if (reference && target && reference.join() === target.join()) {
				return true;
			}

			return false;
		}

		get frameTime() {
			return this._frameTime;
		}

		set frameTime(frameTime) {
			this._frameTime = frameTime;
		}

		get ultrasoundRegions() {
			return this._ultrasoundRegions;
		}

		set ultrasoundRegions(ultrasoundRegions) {
			this._ultrasoundRegions = ultrasoundRegions;
		}

		get rows() {
			return this._rows;
		}

		set rows(rows) {
			this._rows = rows;
		}

		get columns() {
			return this._columns;
		}

		set columns(columns) {
			this._columns = columns;
		}

		get spacingBetweenSlices() {
			return this._spacingBetweenSlices;
		}

		set spacingBetweenSlices(spacingBetweenSlices) {
			this._spacingBetweenSlices = spacingBetweenSlices;
		}

		get sliceThickness() {
			return this._sliceThickness;
		}

		set sliceThickness(sliceThickness) {
			this._sliceThickness = sliceThickness;
		}

		get imagePosition() {
			return this._imagePosition;
		}

		set imagePosition(imagePosition) {
			this._imagePosition = imagePosition;
		}

		get imageOrientation() {
			return this._imageOrientation;
		}

		set imageOrientation(imageOrientation) {
			this._imageOrientation = imageOrientation;
		}

		get windowWidth() {
			return this._windowWidth;
		}

		set windowWidth(windowWidth) {
			this._windowWidth = windowWidth;
		}

		get windowCenter() {
			return this._windowCenter;
		}

		set windowCenter(windowCenter) {
			this._windowCenter = windowCenter;
		}

		get rescaleSlope() {
			return this._rescaleSlope;
		}

		set rescaleSlope(rescaleSlope) {
			this._rescaleSlope = rescaleSlope;
		}

		get rescaleIntercept() {
			return this._rescaleIntercept;
		}

		set rescaleIntercept(rescaleIntercept) {
			this._rescaleIntercept = rescaleIntercept;
		}

		get bitsAllocated() {
			return this._bitsAllocated;
		}

		set bitsAllocated(bitsAllocated) {
			this._bitsAllocated = bitsAllocated;
		}

		get dist() {
			return this._dist;
		}

		set dist(dist) {
			this._dist = dist;
		}

		get pixelSpacing() {
			return this._pixelSpacing;
		}

		set pixelSpacing(pixelSpacing) {
			this._pixelSpacing = pixelSpacing;
		}

		get pixelAspectRatio() {
			return this._pixelAspectRatio;
		}

		set pixelAspectRatio(pixelAspectRatio) {
			this._pixelAspectRatio = pixelAspectRatio;
		}

		get minMax() {
			return this._minMax;
		}

		set minMax(minMax) {
			this._minMax = minMax;
		}

		get dimensionIndexValues() {
			return this._dimensionIndexValues;
		}

		set dimensionIndexValues(dimensionIndexValues) {
			this._dimensionIndexValues = dimensionIndexValues;
		}

		get instanceNumber() {
			return this._instanceNumber;
		}

		set instanceNumber(instanceNumber) {
			this._instanceNumber = instanceNumber;
		}

		get pixelData() {
			return this._pixelData;
		}

		set pixelData(pixelData) {
			this._pixelData = pixelData;
		}

		set sopInstanceUID(sopInstanceUID) {
			this._sopInstanceUID = sopInstanceUID;
		}

		get sopInstanceUID() {
			return this._sopInstanceUID;
		}

		get pixelPaddingValue() {
			return this._pixelPaddingValue;
		}

		set pixelPaddingValue(pixelPaddingValue) {
			this._pixelPaddingValue = pixelPaddingValue;
		}

		get pixelRepresentation() {
			return this._pixelRepresentation;
		}

		set pixelRepresentation(pixelRepresentation) {
			this._pixelRepresentation = pixelRepresentation;
		}

		get pixelType() {
			return this._pixelType;
		}

		set pixelType(pixelType) {
			this._pixelType = pixelType;
		}

		get url() {
			return this._url;
		}

		set url(url) {
			this._url = url;
		}

		get referencedSegmentNumber() {
			return this._referencedSegmentNumber;
		}

		set referencedSegmentNumber(referencedSegmentNumber) {
			this._referencedSegmentNumber = referencedSegmentNumber;
		}

		get rightHanded() {
			return this._rightHanded;
		}

		set rightHanded(rightHanded) {
			this._rightHanded = rightHanded;
		}

		get index() {
			return this._index;
		}

		set index(index) {
			this._index = index;
		}

		get invert() {
			return this._invert;
		}

		set invert(invert) {
			this._invert = invert;
		}

		get numberOfChannels() {
			return this._numberOfChannels;
		}

		set numberOfChannels(numberOfChannels) {
			this._numberOfChannels = numberOfChannels;
		}

	}

	/**
	 * @module parsers/volume
	 */
	class ParsersVolume {
		constructor() {
			this._rightHanded = true;
		}

		pixelRepresentation() {
			return 0;
		}

		pixelPaddingValue(frameIndex = 0) {
			return null;
		}

		modality() {
			return 'unknown';
		}

		segmentationType() {
			return 'unknown';
		}

		segmentationSegments() {
			return [];
		}

		referencedSegmentNumber(frameIndex) {
			return -1;
		}

		rightHanded() {
			return this._rightHanded;
		}

		spacingBetweenSlices() {
			return null;
		}

		numberOfChannels() {
			return 1;
		}

		sliceThickness() {
			return null;
		}

		dimensionIndexValues(frameIndex = 0) {
			return null;
		}

		instanceNumber(frameIndex = 0) {
			return frameIndex;
		}

		windowCenter(frameIndex = 0) {
			return null;
		}

		windowWidth(frameIndex = 0) {
			return null;
		}

		rescaleSlope(frameIndex = 0) {
			return 1;
		}

		rescaleIntercept(frameIndex = 0) {
			return 0;
		}

		ultrasoundRegions(frameIndex = 0) {
			return [];
		}

		frameTime(frameIndex = 0) {
			return null;
		}

		_decompressUncompressed() {} // http://stackoverflow.com/questions/5320439/how-do-i-swap-endian-ness-byte-order-of-a-variable-in-javascript


		_swap16(val) {
			return (val & 0xff) << 8 | val >> 8 & 0xff;
		}

		_swap32(val) {
			return (val & 0xff) << 24 | (val & 0xff00) << 8 | val >> 8 & 0xff00 | val >> 24 & 0xff;
		}

		invert() {
			return false;
		}
		/**
		 * Get the transfer syntax UID.
		 * @return {*}
		 */


		transferSyntaxUID() {
			return 'no value provided';
		}
		/**
		 * Get the study date.
		 * @return {*}
		 */


		studyDate() {
			return 'no value provided';
		}
		/**
		 * Get the study desciption.
		 * @return {*}
		 */


		studyDescription() {
			return 'no value provided';
		}
		/**
		 * Get the series date.
		 * @return {*}
		 */


		seriesDate() {
			return 'no value provided';
		}
		/**
		 * Get the series desciption.
		 * @return {*}
		 */


		seriesDescription() {
			return 'no value provided';
		}
		/**
		 * Get the raw Header.
		 * @return {*}
		 */


		rawHeader() {
			return 'no value provided';
		}
		/**
		 * Get the patient ID.
		 * @return {*}
		 */


		patientID() {
			return 'no value provided';
		}
		/**
		 * Get the patient name.
		 * @return {*}
		 */


		patientName() {
			return 'no value provided';
		}
		/**
		 * Get the patient age.
		 * @return {*}
		 */


		patientAge() {
			return 'no value provided';
		}
		/**
		 * Get the patient birthdate.
		 * @return {*}
		 */


		patientBirthdate() {
			return 'no value provided';
		}
		/**
		 * Get the patient sex.
		 * @return {*}
		 */


		patientSex() {
			return 'no value provided';
		}
		/**
		 * Get min/max values in array
		 *
		 * @param {*} pixelData
		 *
		 * @return {*}
		 */


		minMaxPixelData(pixelData = []) {
			let minMax = [Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY];
			let numPixels = pixelData.length;

			for (let index = 0; index < numPixels; index++) {
				let spv = pixelData[index];
				minMax[0] = Math.min(minMax[0], spv);
				minMax[1] = Math.max(minMax[1], spv);
			}

			return minMax;
		}

	}

	// from dicom wadoo loader
	// https://github.com/cornerstonejs/cornerstoneWADOImageLoader/blob/master/src/shared/decoders/decodeRLE.js
	function decodeRLE(imageFrame, pixelData) {
		if (imageFrame.bitsAllocated === 8) {
			if (imageFrame.planarConfiguration) {
				return decode8Planar(imageFrame, pixelData);
			}

			return decode8(imageFrame, pixelData);
		} else if (imageFrame.bitsAllocated === 16) {
			return decode16(imageFrame, pixelData);
		}

		throw new Error('unsupported pixel format for RLE');
	}

	function decode8(imageFrame, pixelData) {
		const frameData = pixelData;
		const frameSize = imageFrame.rows * imageFrame.columns;
		const outFrame = new ArrayBuffer(frameSize * imageFrame.samplesPerPixel);
		const header = new DataView(frameData.buffer, frameData.byteOffset);
		const data = new Int8Array(frameData.buffer, frameData.byteOffset);
		const out = new Int8Array(outFrame);
		let outIndex = 0;
		const numSegments = header.getInt32(0, true);

		for (let s = 0; s < numSegments; ++s) {
			outIndex = s;
			let inIndex = header.getInt32((s + 1) * 4, true);
			let maxIndex = header.getInt32((s + 2) * 4, true);

			if (maxIndex === 0) {
				maxIndex = frameData.length;
			}

			const endOfSegment = frameSize * numSegments;

			while (inIndex < maxIndex) {
				const n = data[inIndex++];

				if (n >= 0 && n <= 127) {
					// copy n bytes
					for (let i = 0; i < n + 1 && outIndex < endOfSegment; ++i) {
						out[outIndex] = data[inIndex++];
						outIndex += imageFrame.samplesPerPixel;
					}
				} else if (n <= -1 && n >= -127) {
					const value = data[inIndex++]; // run of n bytes

					for (let j = 0; j < -n + 1 && outIndex < endOfSegment; ++j) {
						out[outIndex] = value;
						outIndex += imageFrame.samplesPerPixel;
					}
				}
				/* else if (n === -128) {
				} // do nothing */

			}
		}

		imageFrame.pixelData = new Uint8Array(outFrame);
		return imageFrame;
	}

	function decode8Planar(imageFrame, pixelData) {
		const frameData = pixelData;
		const frameSize = imageFrame.rows * imageFrame.columns;
		const outFrame = new ArrayBuffer(frameSize * imageFrame.samplesPerPixel);
		const header = new DataView(frameData.buffer, frameData.byteOffset);
		const data = new Int8Array(frameData.buffer, frameData.byteOffset);
		const out = new Int8Array(outFrame);
		let outIndex = 0;
		const numSegments = header.getInt32(0, true);

		for (let s = 0; s < numSegments; ++s) {
			outIndex = s * frameSize;
			let inIndex = header.getInt32((s + 1) * 4, true);
			let maxIndex = header.getInt32((s + 2) * 4, true);

			if (maxIndex === 0) {
				maxIndex = frameData.length;
			}

			const endOfSegment = frameSize * numSegments;

			while (inIndex < maxIndex) {
				const n = data[inIndex++];

				if (n >= 0 && n <= 127) {
					// copy n bytes
					for (let i = 0; i < n + 1 && outIndex < endOfSegment; ++i) {
						out[outIndex] = data[inIndex++];
						outIndex++;
					}
				} else if (n <= -1 && n >= -127) {
					const value = data[inIndex++]; // run of n bytes

					for (let j = 0; j < -n + 1 && outIndex < endOfSegment; ++j) {
						out[outIndex] = value;
						outIndex++;
					}
				}
				/* else if (n === -128) {
				} // do nothing */

			}
		}

		imageFrame.pixelData = new Uint8Array(outFrame);
		return imageFrame;
	}

	function decode16(imageFrame, pixelData) {
		const frameData = pixelData;
		const frameSize = imageFrame.rows * imageFrame.columns;
		const outFrame = new ArrayBuffer(frameSize * imageFrame.samplesPerPixel * 2);
		const header = new DataView(frameData.buffer, frameData.byteOffset);
		const data = new Int8Array(frameData.buffer, frameData.byteOffset);
		const out = new Int8Array(outFrame);
		const numSegments = header.getInt32(0, true);

		for (let s = 0; s < numSegments; ++s) {
			let outIndex = 0;
			const highByte = s === 0 ? 1 : 0;
			let inIndex = header.getInt32((s + 1) * 4, true);
			let maxIndex = header.getInt32((s + 2) * 4, true);

			if (maxIndex === 0) {
				maxIndex = frameData.length;
			}

			while (inIndex < maxIndex) {
				const n = data[inIndex++];

				if (n >= 0 && n <= 127) {
					for (let i = 0; i < n + 1 && outIndex < frameSize; ++i) {
						out[outIndex * 2 + highByte] = data[inIndex++];
						outIndex++;
					}
				} else if (n <= -1 && n >= -127) {
					const value = data[inIndex++];

					for (let j = 0; j < -n + 1 && outIndex < frameSize; ++j) {
						out[outIndex * 2 + highByte] = value;
						outIndex++;
					}
				}
				/* else if (n === -128) {
				} // do nothing */

			}
		}

		if (imageFrame.pixelRepresentation === 0) {
			imageFrame.pixelData = new Uint16Array(outFrame);
		} else {
			imageFrame.pixelData = new Int16Array(outFrame);
		}

		return imageFrame;
	}

	const RLEDecoder = decodeRLE;

	// jshint ignore: start

	/* -*- Mode: Java; tab-width: 2; indent-tabs-mode: nil; c-basic-offset: 2 -*- /
	 /* vim: set shiftwidth=2 tabstop=2 autoindent cindent expandtab: */

	/*
	 Copyright 2011 notmasteryet

	 Licensed under the Apache License, Version 2.0 (the "License");
	 you may not use this file except in compliance with the License.
	 You may obtain a copy of the License at

	 http://www.apache.org/licenses/LICENSE-2.0

	 Unless required by applicable law or agreed to in writing, software
	 distributed under the License is distributed on an "AS IS" BASIS,
	 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 See the License for the specific language governing permissions and
	 limitations under the License.
	 */
	// - The JPEG specification can be found in the ITU CCITT Recommendation T.81
	//	 (www.w3.org/Graphics/JPEG/itu-t81.pdf)
	// - The JFIF specification can be found in the JPEG File Interchange Format
	//	 (www.w3.org/Graphics/JPEG/jfif3.pdf)
	// - The Adobe Application-Specific JPEG markers in the Supporting the DCT Filters
	//	 in PostScript Level 2, Technical Note #5116
	//	 (partners.adobe.com/public/developer/en/ps/sdk/5116.DCT_Filter.pdf)
	var ColorSpace = {
		Unkown: 0,
		Grayscale: 1,
		AdobeRGB: 2,
		RGB: 3,
		CYMK: 4
	};

	var JpegImage = function jpegImage() {

		var dctZigZag = new Int32Array([0, 1, 8, 16, 9, 2, 3, 10, 17, 24, 32, 25, 18, 11, 4, 5, 12, 19, 26, 33, 40, 48, 41, 34, 27, 20, 13, 6, 7, 14, 21, 28, 35, 42, 49, 56, 57, 50, 43, 36, 29, 22, 15, 23, 30, 37, 44, 51, 58, 59, 52, 45, 38, 31, 39, 46, 53, 60, 61, 54, 47, 55, 62, 63]);
		var dctCos1 = 4017; // cos(pi/16)

		var dctSin1 = 799; // sin(pi/16)

		var dctCos3 = 3406; // cos(3*pi/16)

		var dctSin3 = 2276; // sin(3*pi/16)

		var dctCos6 = 1567; // cos(6*pi/16)

		var dctSin6 = 3784; // sin(6*pi/16)

		var dctSqrt2 = 5793; // sqrt(2)

		var dctSqrt1d2 = 2896; // sqrt(2) / 2

		function constructor() {}

		function buildHuffmanTable(codeLengths, values) {
			var k = 0,
					code = [],
					i,
					j,
					length = 16;

			while (length > 0 && !codeLengths[length - 1]) length--;

			code.push({
				children: [],
				index: 0
			});
			var p = code[0],
					q;

			for (i = 0; i < length; i++) {
				for (j = 0; j < codeLengths[i]; j++) {
					p = code.pop();
					p.children[p.index] = values[k];

					while (p.index > 0) {
						p = code.pop();
					}

					p.index++;
					code.push(p);

					while (code.length <= i) {
						code.push(q = {
							children: [],
							index: 0
						});
						p.children[p.index] = q.children;
						p = q;
					}

					k++;
				}

				if (i + 1 < length) {
					// p here points to last code
					code.push(q = {
						children: [],
						index: 0
					});
					p.children[p.index] = q.children;
					p = q;
				}
			}

			return code[0].children;
		}

		function getBlockBufferOffset(component, row, col) {
			return 64 * ((component.blocksPerLine + 1) * row + col);
		}

		function decodeScan(data, offset, frame, components, resetInterval, spectralStart, spectralEnd, successivePrev, successive) {
			frame.precision;
			frame.samplesPerLine;
			frame.scanLines;
			var mcusPerLine = frame.mcusPerLine;
			var progressive = frame.progressive;
			frame.maxH;
					frame.maxV;
			var startOffset = offset,
					bitsData = 0,
					bitsCount = 0;

			function readBit() {
				if (bitsCount > 0) {
					bitsCount--;
					return bitsData >> bitsCount & 1;
				}

				bitsData = data[offset++];

				if (bitsData == 0xFF) {
					var nextByte = data[offset++];

					if (nextByte) {
						throw "unexpected marker: " + (bitsData << 8 | nextByte).toString(16);
					} // unstuff 0

				}

				bitsCount = 7;
				return bitsData >>> 7;
			}

			function decodeHuffman(tree) {
				var node = tree;
				var bit;

				while ((bit = readBit()) !== null) {
					node = node[bit];
					if (typeof node === 'number') return node;
					if (typeof node !== 'object') throw "invalid huffman sequence";
				}

				return null;
			}

			function receive(length) {
				var n = 0;

				while (length > 0) {
					var bit = readBit();
					if (bit === null) return;
					n = n << 1 | bit;
					length--;
				}

				return n;
			}

			function receiveAndExtend(length) {
				var n = receive(length);
				if (n >= 1 << length - 1) return n;
				return n + (-1 << length) + 1;
			}

			function decodeBaseline(component, offset) {
				var t = decodeHuffman(component.huffmanTableDC);
				var diff = t === 0 ? 0 : receiveAndExtend(t);
				component.blockData[offset] = component.pred += diff;
				var k = 1;

				while (k < 64) {
					var rs = decodeHuffman(component.huffmanTableAC);
					var s = rs & 15,
							r = rs >> 4;

					if (s === 0) {
						if (r < 15) break;
						k += 16;
						continue;
					}

					k += r;
					var z = dctZigZag[k];
					component.blockData[offset + z] = receiveAndExtend(s);
					k++;
				}
			}

			function decodeDCFirst(component, offset) {
				var t = decodeHuffman(component.huffmanTableDC);
				var diff = t === 0 ? 0 : receiveAndExtend(t) << successive;
				component.blockData[offset] = component.pred += diff;
			}

			function decodeDCSuccessive(component, offset) {
				component.blockData[offset] |= readBit() << successive;
			}

			var eobrun = 0;

			function decodeACFirst(component, offset) {
				if (eobrun > 0) {
					eobrun--;
					return;
				}

				var k = spectralStart,
						e = spectralEnd;

				while (k <= e) {
					var rs = decodeHuffman(component.huffmanTableAC);
					var s = rs & 15,
							r = rs >> 4;

					if (s === 0) {
						if (r < 15) {
							eobrun = receive(r) + (1 << r) - 1;
							break;
						}

						k += 16;
						continue;
					}

					k += r;
					var z = dctZigZag[k];
					component.blockData[offset + z] = receiveAndExtend(s) * (1 << successive);
					k++;
				}
			}

			var successiveACState = 0,
					successiveACNextValue;

			function decodeACSuccessive(component, offset) {
				var k = spectralStart,
						e = spectralEnd,
						r = 0;

				while (k <= e) {
					var z = dctZigZag[k];

					switch (successiveACState) {
						case 0:
							// initial state
							var rs = decodeHuffman(component.huffmanTableAC);
							var s = rs & 15;
							r = rs >> 4;

							if (s === 0) {
								if (r < 15) {
									eobrun = receive(r) + (1 << r);
									successiveACState = 4;
								} else {
									r = 16;
									successiveACState = 1;
								}
							} else {
								if (s !== 1) throw "invalid ACn encoding";
								successiveACNextValue = receiveAndExtend(s);
								successiveACState = r ? 2 : 3;
							}

							continue;

						case 1: // skipping r zero items

						case 2:
							if (component.blockData[offset + z]) {
								component.blockData[offset + z] += readBit() << successive;
							} else {
								r--;
								if (r === 0) successiveACState = successiveACState == 2 ? 3 : 0;
							}

							break;

						case 3:
							// set value for a zero item
							if (component.blockData[offset + z]) {
								component.blockData[offset + z] += readBit() << successive;
							} else {
								component.blockData[offset + z] = successiveACNextValue << successive;
								successiveACState = 0;
							}

							break;

						case 4:
							// eob
							if (component.blockData[offset + z]) {
								component.blockData[offset + z] += readBit() << successive;
							}

							break;
					}

					k++;
				}

				if (successiveACState === 4) {
					eobrun--;
					if (eobrun === 0) successiveACState = 0;
				}
			}

			function decodeMcu(component, decode, mcu, row, col) {
				var mcuRow = mcu / mcusPerLine | 0;
				var mcuCol = mcu % mcusPerLine;
				var blockRow = mcuRow * component.v + row;
				var blockCol = mcuCol * component.h + col;
				var offset = getBlockBufferOffset(component, blockRow, blockCol);
				decode(component, offset);
			}

			function decodeBlock(component, decode, mcu) {
				var blockRow = mcu / component.blocksPerLine | 0;
				var blockCol = mcu % component.blocksPerLine;
				var offset = getBlockBufferOffset(component, blockRow, blockCol);
				decode(component, offset);
			}

			var componentsLength = components.length;
			var component, i, j, k, n;
			var decodeFn;

			if (progressive) {
				if (spectralStart === 0) decodeFn = successivePrev === 0 ? decodeDCFirst : decodeDCSuccessive;else decodeFn = successivePrev === 0 ? decodeACFirst : decodeACSuccessive;
			} else {
				decodeFn = decodeBaseline;
			}

			var mcu = 0,
					marker;
			var mcuExpected;

			if (componentsLength == 1) {
				mcuExpected = components[0].blocksPerLine * components[0].blocksPerColumn;
			} else {
				mcuExpected = mcusPerLine * frame.mcusPerColumn;
			}

			if (!resetInterval) {
				resetInterval = mcuExpected;
			}

			var h, v;

			while (mcu < mcuExpected) {
				// reset interval stuff
				for (i = 0; i < componentsLength; i++) {
					components[i].pred = 0;
				}

				eobrun = 0;

				if (componentsLength == 1) {
					component = components[0];

					for (n = 0; n < resetInterval; n++) {
						decodeBlock(component, decodeFn, mcu);
						mcu++;
					}
				} else {
					for (n = 0; n < resetInterval; n++) {
						for (i = 0; i < componentsLength; i++) {
							component = components[i];
							h = component.h;
							v = component.v;

							for (j = 0; j < v; j++) {
								for (k = 0; k < h; k++) {
									decodeMcu(component, decodeFn, mcu, j, k);
								}
							}
						}

						mcu++;
					}
				} // find marker


				bitsCount = 0;
				marker = data[offset] << 8 | data[offset + 1];

				if (marker <= 0xFF00) {
					throw "marker was not found";
				}

				if (marker >= 0xFFD0 && marker <= 0xFFD7) {
					// RSTx
					offset += 2;
				} else {
					break;
				}
			}

			return offset - startOffset;
		} // A port of poppler's IDCT method which in turn is taken from:
		//	 Christoph Loeffler, Adriaan Ligtenberg, George S. Moschytz,
		//	 "Practical Fast 1-D DCT Algorithms with 11 Multiplications",
		//	 IEEE Intl. Conf. on Acoustics, Speech & Signal Processing, 1989,
		//	 988-991.


		function quantizeAndInverse(component, blockBufferOffset, p) {
			var qt = component.quantizationTable;
			var v0, v1, v2, v3, v4, v5, v6, v7, t;
			var i; // dequant

			for (i = 0; i < 64; i++) {
				p[i] = component.blockData[blockBufferOffset + i] * qt[i];
			} // inverse DCT on rows


			for (i = 0; i < 8; ++i) {
				var row = 8 * i; // check for all-zero AC coefficients

				if (p[1 + row] === 0 && p[2 + row] === 0 && p[3 + row] === 0 && p[4 + row] === 0 && p[5 + row] === 0 && p[6 + row] === 0 && p[7 + row] === 0) {
					t = dctSqrt2 * p[0 + row] + 512 >> 10;
					p[0 + row] = t;
					p[1 + row] = t;
					p[2 + row] = t;
					p[3 + row] = t;
					p[4 + row] = t;
					p[5 + row] = t;
					p[6 + row] = t;
					p[7 + row] = t;
					continue;
				} // stage 4


				v0 = dctSqrt2 * p[0 + row] + 128 >> 8;
				v1 = dctSqrt2 * p[4 + row] + 128 >> 8;
				v2 = p[2 + row];
				v3 = p[6 + row];
				v4 = dctSqrt1d2 * (p[1 + row] - p[7 + row]) + 128 >> 8;
				v7 = dctSqrt1d2 * (p[1 + row] + p[7 + row]) + 128 >> 8;
				v5 = p[3 + row] << 4;
				v6 = p[5 + row] << 4; // stage 3

				t = v0 - v1 + 1 >> 1;
				v0 = v0 + v1 + 1 >> 1;
				v1 = t;
				t = v2 * dctSin6 + v3 * dctCos6 + 128 >> 8;
				v2 = v2 * dctCos6 - v3 * dctSin6 + 128 >> 8;
				v3 = t;
				t = v4 - v6 + 1 >> 1;
				v4 = v4 + v6 + 1 >> 1;
				v6 = t;
				t = v7 + v5 + 1 >> 1;
				v5 = v7 - v5 + 1 >> 1;
				v7 = t; // stage 2

				t = v0 - v3 + 1 >> 1;
				v0 = v0 + v3 + 1 >> 1;
				v3 = t;
				t = v1 - v2 + 1 >> 1;
				v1 = v1 + v2 + 1 >> 1;
				v2 = t;
				t = v4 * dctSin3 + v7 * dctCos3 + 2048 >> 12;
				v4 = v4 * dctCos3 - v7 * dctSin3 + 2048 >> 12;
				v7 = t;
				t = v5 * dctSin1 + v6 * dctCos1 + 2048 >> 12;
				v5 = v5 * dctCos1 - v6 * dctSin1 + 2048 >> 12;
				v6 = t; // stage 1

				p[0 + row] = v0 + v7;
				p[7 + row] = v0 - v7;
				p[1 + row] = v1 + v6;
				p[6 + row] = v1 - v6;
				p[2 + row] = v2 + v5;
				p[5 + row] = v2 - v5;
				p[3 + row] = v3 + v4;
				p[4 + row] = v3 - v4;
			} // inverse DCT on columns


			for (i = 0; i < 8; ++i) {
				var col = i; // check for all-zero AC coefficients

				if (p[1 * 8 + col] === 0 && p[2 * 8 + col] === 0 && p[3 * 8 + col] === 0 && p[4 * 8 + col] === 0 && p[5 * 8 + col] === 0 && p[6 * 8 + col] === 0 && p[7 * 8 + col] === 0) {
					t = dctSqrt2 * p[i + 0] + 8192 >> 14;
					p[0 * 8 + col] = t;
					p[1 * 8 + col] = t;
					p[2 * 8 + col] = t;
					p[3 * 8 + col] = t;
					p[4 * 8 + col] = t;
					p[5 * 8 + col] = t;
					p[6 * 8 + col] = t;
					p[7 * 8 + col] = t;
					continue;
				} // stage 4


				v0 = dctSqrt2 * p[0 * 8 + col] + 2048 >> 12;
				v1 = dctSqrt2 * p[4 * 8 + col] + 2048 >> 12;
				v2 = p[2 * 8 + col];
				v3 = p[6 * 8 + col];
				v4 = dctSqrt1d2 * (p[1 * 8 + col] - p[7 * 8 + col]) + 2048 >> 12;
				v7 = dctSqrt1d2 * (p[1 * 8 + col] + p[7 * 8 + col]) + 2048 >> 12;
				v5 = p[3 * 8 + col];
				v6 = p[5 * 8 + col]; // stage 3

				t = v0 - v1 + 1 >> 1;
				v0 = v0 + v1 + 1 >> 1;
				v1 = t;
				t = v2 * dctSin6 + v3 * dctCos6 + 2048 >> 12;
				v2 = v2 * dctCos6 - v3 * dctSin6 + 2048 >> 12;
				v3 = t;
				t = v4 - v6 + 1 >> 1;
				v4 = v4 + v6 + 1 >> 1;
				v6 = t;
				t = v7 + v5 + 1 >> 1;
				v5 = v7 - v5 + 1 >> 1;
				v7 = t; // stage 2

				t = v0 - v3 + 1 >> 1;
				v0 = v0 + v3 + 1 >> 1;
				v3 = t;
				t = v1 - v2 + 1 >> 1;
				v1 = v1 + v2 + 1 >> 1;
				v2 = t;
				t = v4 * dctSin3 + v7 * dctCos3 + 2048 >> 12;
				v4 = v4 * dctCos3 - v7 * dctSin3 + 2048 >> 12;
				v7 = t;
				t = v5 * dctSin1 + v6 * dctCos1 + 2048 >> 12;
				v5 = v5 * dctCos1 - v6 * dctSin1 + 2048 >> 12;
				v6 = t; // stage 1

				p[0 * 8 + col] = v0 + v7;
				p[7 * 8 + col] = v0 - v7;
				p[1 * 8 + col] = v1 + v6;
				p[6 * 8 + col] = v1 - v6;
				p[2 * 8 + col] = v2 + v5;
				p[5 * 8 + col] = v2 - v5;
				p[3 * 8 + col] = v3 + v4;
				p[4 * 8 + col] = v3 - v4;
			} // convert to 8-bit integers


			for (i = 0; i < 64; ++i) {
				var index = blockBufferOffset + i;
				var q = p[i];
				q = q <= -2056 / component.bitConversion ? 0 : q >= 2024 / component.bitConversion ? 255 / component.bitConversion : q + 2056 / component.bitConversion >> 4;
				component.blockData[index] = q;
			}
		}

		function buildComponentData(frame, component) {
			var blocksPerLine = component.blocksPerLine;
			var blocksPerColumn = component.blocksPerColumn;
			var computationBuffer = new Int32Array(64);

			for (var blockRow = 0; blockRow < blocksPerColumn; blockRow++) {
				for (var blockCol = 0; blockCol < blocksPerLine; blockCol++) {
					var offset = getBlockBufferOffset(component, blockRow, blockCol);
					quantizeAndInverse(component, offset, computationBuffer);
				}
			}

			return component.blockData;
		}

		function clampToUint8(a) {
			return a <= 0 ? 0 : a >= 255 ? 255 : a | 0;
		}

		constructor.prototype = {
			load: function load(path) {
				var handleData = function (data) {
					this.parse(data);
					if (this.onload) this.onload();
				}.bind(this);

				if (path.indexOf("data:") > -1) {
					var offset = path.indexOf("base64,") + 7;
					var data = atob(path.substring(offset));
					var arr = new Uint8Array(data.length);

					for (var i = data.length - 1; i >= 0; i--) {
						arr[i] = data.charCodeAt(i);
					}

					handleData(data);
				} else {
					var xhr = new XMLHttpRequest();
					xhr.open("GET", path, true);
					xhr.responseType = "arraybuffer";

					xhr.onload = function () {
						// TODO catch parse error
						var data = new Uint8Array(xhr.response);
						handleData(data);
					}.bind(this);

					xhr.send(null);
				}
			},
			parse: function parse(data) {
				function readUint16() {
					var value = data[offset] << 8 | data[offset + 1];
					offset += 2;
					return value;
				}

				function readDataBlock() {
					var length = readUint16();
					var array = data.subarray(offset, offset + length - 2);
					offset += array.length;
					return array;
				}

				function prepareComponents(frame) {
					var mcusPerLine = Math.ceil(frame.samplesPerLine / 8 / frame.maxH);
					var mcusPerColumn = Math.ceil(frame.scanLines / 8 / frame.maxV);

					for (var i = 0; i < frame.components.length; i++) {
						component = frame.components[i];
						var blocksPerLine = Math.ceil(Math.ceil(frame.samplesPerLine / 8) * component.h / frame.maxH);
						var blocksPerColumn = Math.ceil(Math.ceil(frame.scanLines / 8) * component.v / frame.maxV);
						var blocksPerLineForMcu = mcusPerLine * component.h;
						var blocksPerColumnForMcu = mcusPerColumn * component.v;
						var blocksBufferSize = 64 * blocksPerColumnForMcu * (blocksPerLineForMcu + 1);
						component.blockData = new Int16Array(blocksBufferSize);
						component.blocksPerLine = blocksPerLine;
						component.blocksPerColumn = blocksPerColumn;
					}

					frame.mcusPerLine = mcusPerLine;
					frame.mcusPerColumn = mcusPerColumn;
				}

				var offset = 0;
						data.length;
				var jfif = null;
				var adobe = null;
				var frame, resetInterval;
				var quantizationTables = [];
				var huffmanTablesAC = [],
						huffmanTablesDC = [];
				var fileMarker = readUint16();

				if (fileMarker != 0xFFD8) {
					// SOI (Start of Image)
					throw "SOI not found";
				}

				fileMarker = readUint16();

				while (fileMarker != 0xFFD9) {
					// EOI (End of image)
					var i, j, l;

					switch (fileMarker) {
						case 0xFFE0: // APP0 (Application Specific)

						case 0xFFE1: // APP1

						case 0xFFE2: // APP2

						case 0xFFE3: // APP3

						case 0xFFE4: // APP4

						case 0xFFE5: // APP5

						case 0xFFE6: // APP6

						case 0xFFE7: // APP7

						case 0xFFE8: // APP8

						case 0xFFE9: // APP9

						case 0xFFEA: // APP10

						case 0xFFEB: // APP11

						case 0xFFEC: // APP12

						case 0xFFED: // APP13

						case 0xFFEE: // APP14

						case 0xFFEF: // APP15

						case 0xFFFE:
							// COM (Comment)
							var appData = readDataBlock();

							if (fileMarker === 0xFFE0) {
								if (appData[0] === 0x4A && appData[1] === 0x46 && appData[2] === 0x49 && appData[3] === 0x46 && appData[4] === 0) {
									// 'JFIF\x00'
									jfif = {
										version: {
											major: appData[5],
											minor: appData[6]
										},
										densityUnits: appData[7],
										xDensity: appData[8] << 8 | appData[9],
										yDensity: appData[10] << 8 | appData[11],
										thumbWidth: appData[12],
										thumbHeight: appData[13],
										thumbData: appData.subarray(14, 14 + 3 * appData[12] * appData[13])
									};
								}
							} // TODO APP1 - Exif


							if (fileMarker === 0xFFEE) {
								if (appData[0] === 0x41 && appData[1] === 0x64 && appData[2] === 0x6F && appData[3] === 0x62 && appData[4] === 0x65 && appData[5] === 0) {
									// 'Adobe\x00'
									adobe = {
										version: appData[6],
										flags0: appData[7] << 8 | appData[8],
										flags1: appData[9] << 8 | appData[10],
										transformCode: appData[11]
									};
								}
							}

							break;

						case 0xFFDB:
							// DQT (Define Quantization Tables)
							var quantizationTablesLength = readUint16();
							var quantizationTablesEnd = quantizationTablesLength + offset - 2;

							while (offset < quantizationTablesEnd) {
								var quantizationTableSpec = data[offset++];
								var tableData = new Int32Array(64);

								if (quantizationTableSpec >> 4 === 0) {
									// 8 bit values
									for (j = 0; j < 64; j++) {
										var z = dctZigZag[j];
										tableData[z] = data[offset++];
									}
								} else if (quantizationTableSpec >> 4 === 1) {
									//16 bit
									for (j = 0; j < 64; j++) {
										var zz = dctZigZag[j];
										tableData[zz] = readUint16();
									}
								} else throw "DQT: invalid table spec";

								quantizationTables[quantizationTableSpec & 15] = tableData;
							}

							break;

						case 0xFFC0: // SOF0 (Start of Frame, Baseline DCT)

						case 0xFFC1: // SOF1 (Start of Frame, Extended DCT)

						case 0xFFC2:
							// SOF2 (Start of Frame, Progressive DCT)
							if (frame) {
								throw "Only single frame JPEGs supported";
							}

							readUint16(); // skip data length

							frame = {};
							frame.extended = fileMarker === 0xFFC1;
							frame.progressive = fileMarker === 0xFFC2;
							frame.precision = data[offset++];
							frame.scanLines = readUint16();
							frame.samplesPerLine = readUint16();
							frame.components = [];
							frame.componentIds = {};
							var componentsCount = data[offset++],
									componentId;
							var maxH = 0,
									maxV = 0;

							for (i = 0; i < componentsCount; i++) {
								componentId = data[offset];
								var h = data[offset + 1] >> 4;
								var v = data[offset + 1] & 15;
								if (maxH < h) maxH = h;
								if (maxV < v) maxV = v;
								var qId = data[offset + 2];
								l = frame.components.push({
									h: h,
									v: v,
									quantizationTable: quantizationTables[qId],
									quantizationTableId: qId,
									bitConversion: 255 / ((1 << frame.precision) - 1)
								});
								frame.componentIds[componentId] = l - 1;
								offset += 3;
							}

							frame.maxH = maxH;
							frame.maxV = maxV;
							prepareComponents(frame);
							break;

						case 0xFFC4:
							// DHT (Define Huffman Tables)
							var huffmanLength = readUint16();

							for (i = 2; i < huffmanLength;) {
								var huffmanTableSpec = data[offset++];
								var codeLengths = new Uint8Array(16);
								var codeLengthSum = 0;

								for (j = 0; j < 16; j++, offset++) codeLengthSum += codeLengths[j] = data[offset];

								var huffmanValues = new Uint8Array(codeLengthSum);

								for (j = 0; j < codeLengthSum; j++, offset++) huffmanValues[j] = data[offset];

								i += 17 + codeLengthSum;
								(huffmanTableSpec >> 4 === 0 ? huffmanTablesDC : huffmanTablesAC)[huffmanTableSpec & 15] = buildHuffmanTable(codeLengths, huffmanValues);
							}

							break;

						case 0xFFDD:
							// DRI (Define Restart Interval)
							readUint16(); // skip data length

							resetInterval = readUint16();
							break;

						case 0xFFDA:
							// SOS (Start of Scan)
							readUint16();
							var selectorsCount = data[offset++];
							var components = [],
									component;

							for (i = 0; i < selectorsCount; i++) {
								var componentIndex = frame.componentIds[data[offset++]];
								component = frame.components[componentIndex];
								var tableSpec = data[offset++];
								component.huffmanTableDC = huffmanTablesDC[tableSpec >> 4];
								component.huffmanTableAC = huffmanTablesAC[tableSpec & 15];
								components.push(component);
							}

							var spectralStart = data[offset++];
							var spectralEnd = data[offset++];
							var successiveApproximation = data[offset++];
							var processed = decodeScan(data, offset, frame, components, resetInterval, spectralStart, spectralEnd, successiveApproximation >> 4, successiveApproximation & 15);
							offset += processed;
							break;

						default:
							if (data[offset - 3] == 0xFF && data[offset - 2] >= 0xC0 && data[offset - 2] <= 0xFE) {
								// could be incorrect encoding -- last 0xFF byte of the previous
								// block was eaten by the encoder
								offset -= 3;
								break;
							}

							throw "unknown JPEG marker " + fileMarker.toString(16);
					}

					fileMarker = readUint16();
				}

				this.width = frame.samplesPerLine;
				this.height = frame.scanLines;
				this.jfif = jfif;
				this.adobe = adobe;
				this.components = [];

				switch (frame.components.length) {
					case 1:
						this.colorspace = ColorSpace.Grayscale;
						break;

					case 3:
						if (this.adobe) this.colorspace = ColorSpace.AdobeRGB;else this.colorspace = ColorSpace.RGB;
						break;

					case 4:
						this.colorspace = ColorSpace.CYMK;
						break;

					default:
						this.colorspace = ColorSpace.Unknown;
				}

				for (var i = 0; i < frame.components.length; i++) {
					var component = frame.components[i];
					if (!component.quantizationTable && component.quantizationTableId !== null) component.quantizationTable = quantizationTables[component.quantizationTableId];
					this.components.push({
						output: buildComponentData(frame, component),
						scaleX: component.h / frame.maxH,
						scaleY: component.v / frame.maxV,
						blocksPerLine: component.blocksPerLine,
						blocksPerColumn: component.blocksPerColumn,
						bitConversion: component.bitConversion
					});
				}
			},
			getData16: function getData16(width, height) {
				if (this.components.length !== 1) throw 'Unsupported color mode';
				var scaleX = this.width / width,
						scaleY = this.height / height;
				var component, componentScaleX, componentScaleY;
				var x, y, i;
				var offset = 0;
				var numComponents = this.components.length;
				var dataLength = width * height * numComponents;
				var data = new Uint16Array(dataLength);
				// the biggest

				var lineData = new Uint16Array((this.components[0].blocksPerLine << 3) * this.components[0].blocksPerColumn * 8); // First construct image data ...

				for (i = 0; i < numComponents; i++) {
					component = this.components[i];
					var blocksPerLine = component.blocksPerLine;
					var blocksPerColumn = component.blocksPerColumn;
					var samplesPerLine = blocksPerLine << 3;
					var j,
							k;
					var lineOffset = 0;

					for (var blockRow = 0; blockRow < blocksPerColumn; blockRow++) {
						var scanLine = blockRow << 3;

						for (var blockCol = 0; blockCol < blocksPerLine; blockCol++) {
							var bufferOffset = getBlockBufferOffset(component, blockRow, blockCol);
							var offset = 0,
									sample = blockCol << 3;

							for (j = 0; j < 8; j++) {
								var lineOffset = (scanLine + j) * samplesPerLine;

								for (k = 0; k < 8; k++) {
									lineData[lineOffset + sample + k] = component.output[bufferOffset + offset++];
								}
							}
						}
					}

					componentScaleX = component.scaleX * scaleX;
					componentScaleY = component.scaleY * scaleY;
					offset = i;
					var cx, cy;
					var index;

					for (y = 0; y < height; y++) {
						for (x = 0; x < width; x++) {
							cy = 0 | y * componentScaleY;
							cx = 0 | x * componentScaleX;
							index = cy * samplesPerLine + cx;
							data[offset] = lineData[index];
							offset += numComponents;
						}
					}
				}

				return data;
			},
			getData: function getData(width, height) {
				var scaleX = this.width / width,
						scaleY = this.height / height;
				var component, componentScaleX, componentScaleY;
				var x, y, i;
				var offset = 0;
				var Y, Cb, Cr, C, M, R, G, B;
				var colorTransform;
				var numComponents = this.components.length;
				var dataLength = width * height * numComponents;
				var data = new Uint8Array(dataLength);
				// the biggest

				var lineData = new Uint8Array((this.components[0].blocksPerLine << 3) * this.components[0].blocksPerColumn * 8); // First construct image data ...

				for (i = 0; i < numComponents; i++) {
					component = this.components[i];
					var blocksPerLine = component.blocksPerLine;
					var blocksPerColumn = component.blocksPerColumn;
					var samplesPerLine = blocksPerLine << 3;
					var j,
							k;
					var lineOffset = 0;

					for (var blockRow = 0; blockRow < blocksPerColumn; blockRow++) {
						var scanLine = blockRow << 3;

						for (var blockCol = 0; blockCol < blocksPerLine; blockCol++) {
							var bufferOffset = getBlockBufferOffset(component, blockRow, blockCol);
							var offset = 0,
									sample = blockCol << 3;

							for (j = 0; j < 8; j++) {
								var lineOffset = (scanLine + j) * samplesPerLine;

								for (k = 0; k < 8; k++) {
									lineData[lineOffset + sample + k] = component.output[bufferOffset + offset++] * component.bitConversion;
								}
							}
						}
					}

					componentScaleX = component.scaleX * scaleX;
					componentScaleY = component.scaleY * scaleY;
					offset = i;
					var cx, cy;
					var index;

					for (y = 0; y < height; y++) {
						for (x = 0; x < width; x++) {
							cy = 0 | y * componentScaleY;
							cx = 0 | x * componentScaleX;
							index = cy * samplesPerLine + cx;
							data[offset] = lineData[index];
							offset += numComponents;
						}
					}
				} // ... then transform colors, if necessary


				switch (numComponents) {
					case 1:
					case 2:
						break;
					// no color conversion for one or two compoenents

					case 3:
						// The default transform for three components is true
						colorTransform = true; // The adobe transform marker overrides any previous setting

						if (this.adobe && this.adobe.transformCode) colorTransform = true;else if (typeof this.colorTransform !== 'undefined') colorTransform = !!this.colorTransform;

						if (colorTransform) {
							for (i = 0; i < dataLength; i += numComponents) {
								Y = data[i];
								Cb = data[i + 1];
								Cr = data[i + 2];
								R = clampToUint8(Y - 179.456 + 1.402 * Cr);
								G = clampToUint8(Y + 135.459 - 0.344 * Cb - 0.714 * Cr);
								B = clampToUint8(Y - 226.816 + 1.772 * Cb);
								data[i] = R;
								data[i + 1] = G;
								data[i + 2] = B;
							}
						}

						break;

					case 4:
						if (!this.adobe) throw 'Unsupported color mode (4 components)'; // The default transform for four components is false

						colorTransform = false; // The adobe transform marker overrides any previous setting

						if (this.adobe && this.adobe.transformCode) colorTransform = true;else if (typeof this.colorTransform !== 'undefined') colorTransform = !!this.colorTransform;

						if (colorTransform) {
							for (i = 0; i < dataLength; i += numComponents) {
								Y = data[i];
								Cb = data[i + 1];
								Cr = data[i + 2];
								C = clampToUint8(434.456 - Y - 1.402 * Cr);
								M = clampToUint8(119.541 - Y + 0.344 * Cb + 0.714 * Cr);
								Y = clampToUint8(481.816 - Y - 1.772 * Cb);
								data[i] = C;
								data[i + 1] = M;
								data[i + 2] = Y; // K is unchanged
							}
						}

						break;

					default:
						throw 'Unsupported color mode';
				}

				return data;
			}
		};
		return constructor;
	}();

	var moduleType$1 = typeof module;

	if (moduleType$1 !== 'undefined' && module.exports) {
		module.exports = JpegImage;
	}

	var JpegBaseline = /*#__PURE__*/Object.freeze({
		__proto__: null
	});

	/*! image-JPEG2000 - v0.3.1 - 2015-08-26 | https://github.com/OHIF/image-JPEG2000 */

	var JpxImage = function JpxImageClosure() {
		// Table E.1
		var SubbandsGainLog2 = {
			'LL': 0,
			'LH': 1,
			'HL': 1,
			'HH': 2
		};

		function JpxImage() {
			this.failOnCorruptedImage = false;
		}

		JpxImage.prototype = {
			parse: function JpxImage_parse(data) {
				var head = readUint16(data, 0); // No box header, immediate start of codestream (SOC)

				if (head === 0xFF4F) {
					this.parseCodestream(data, 0, data.length);
					return;
				}

				var position = 0,
						length = data.length;

				while (position < length) {
					var headerSize = 8;
					var lbox = readUint32(data, position);
					var tbox = readUint32(data, position + 4);
					position += headerSize;

					if (lbox === 1) {
						// XLBox: read UInt64 according to spec.
						// JavaScript's int precision of 53 bit should be sufficient here.
						lbox = readUint32(data, position) * 4294967296 + readUint32(data, position + 4);
						position += 8;
						headerSize += 8;
					}

					if (lbox === 0) {
						lbox = length - position + headerSize;
					}

					if (lbox < headerSize) {
						throw new Error('JPX Error: Invalid box field size');
					}

					var dataLength = lbox - headerSize;
					var jumpDataLength = true;

					switch (tbox) {
						case 0x6A703268:
							// 'jp2h'
							jumpDataLength = false; // parsing child boxes

							break;

						case 0x636F6C72:
							// 'colr'
							// Colorspaces are not used, the CS from the PDF is used.
							var method = data[position];
							data[position + 1];
							data[position + 2];

							if (method === 1) {
								// enumerated colorspace
								var colorspace = readUint32(data, position + 3);

								switch (colorspace) {
									case 16: // this indicates a sRGB colorspace

									case 17: // this indicates a grayscale colorspace

									case 18:
										// this indicates a YUV colorspace
										break;

									default:
										warn('Unknown colorspace ' + colorspace);
										break;
								}
							} else if (method === 2) {
								info('ICC profile not supported');
							}

							break;

						case 0x6A703263:
							// 'jp2c'
							this.parseCodestream(data, position, position + dataLength);
							break;

						case 0x6A502020:
							// 'jP\024\024'
							if (0x0d0a870a !== readUint32(data, position)) {
								warn('Invalid JP2 signature');
							}

							break;
						// The following header types are valid but currently not used:

						case 0x6A501A1A: // 'jP\032\032'

						case 0x66747970: // 'ftyp'

						case 0x72726571: // 'rreq'

						case 0x72657320: // 'res '

						case 0x69686472:
							// 'ihdr'
							break;

						default:
							var headerType = String.fromCharCode(tbox >> 24 & 0xFF, tbox >> 16 & 0xFF, tbox >> 8 & 0xFF, tbox & 0xFF);
							warn('Unsupported header type ' + tbox + ' (' + headerType + ')');
							break;
					}

					if (jumpDataLength) {
						position += dataLength;
					}
				}
			},
			parseImageProperties: function JpxImage_parseImageProperties(stream) {
				var newByte = stream.getByte();

				while (newByte >= 0) {
					var oldByte = newByte;
					newByte = stream.getByte();
					var code = oldByte << 8 | newByte; // Image and tile size (SIZ)

					if (code === 0xFF51) {
						stream.skip(4);
						var Xsiz = stream.getInt32() >>> 0; // Byte 4

						var Ysiz = stream.getInt32() >>> 0; // Byte 8

						var XOsiz = stream.getInt32() >>> 0; // Byte 12

						var YOsiz = stream.getInt32() >>> 0; // Byte 16

						stream.skip(16);
						var Csiz = stream.getUint16(); // Byte 36

						this.width = Xsiz - XOsiz;
						this.height = Ysiz - YOsiz;
						this.componentsCount = Csiz; // Results are always returned as Uint8Arrays

						this.bitsPerComponent = 8;
						return;
					}
				}

				throw new Error('JPX Error: No size marker found in JPX stream');
			},
			parseCodestream: function JpxImage_parseCodestream(data, start, end) {
				var context = {};

				try {
					var doNotRecover = false;
					var position = start;

					while (position + 1 < end) {
						var code = readUint16(data, position);
						position += 2;
						var length = 0,
								j,
								sqcd,
								spqcds,
								spqcdSize,
								scalarExpounded,
								tile;

						switch (code) {
							case 0xFF4F:
								// Start of codestream (SOC)
								context.mainHeader = true;
								break;

							case 0xFFD9:
								// End of codestream (EOC)
								break;

							case 0xFF51:
								// Image and tile size (SIZ)
								length = readUint16(data, position);
								var siz = {};
								siz.Xsiz = readUint32(data, position + 4);
								siz.Ysiz = readUint32(data, position + 8);
								siz.XOsiz = readUint32(data, position + 12);
								siz.YOsiz = readUint32(data, position + 16);
								siz.XTsiz = readUint32(data, position + 20);
								siz.YTsiz = readUint32(data, position + 24);
								siz.XTOsiz = readUint32(data, position + 28);
								siz.YTOsiz = readUint32(data, position + 32);
								var componentsCount = readUint16(data, position + 36);
								siz.Csiz = componentsCount;
								var components = [];
								j = position + 38;

								for (var i = 0; i < componentsCount; i++) {
									var component = {
										precision: (data[j] & 0x7F) + 1,
										isSigned: !!(data[j] & 0x80),
										XRsiz: data[j + 1],
										YRsiz: data[j + 1]
									};
									calculateComponentDimensions(component, siz);
									components.push(component);
								}

								context.SIZ = siz;
								context.components = components;
								calculateTileGrids(context, components);
								context.QCC = [];
								context.COC = [];
								break;

							case 0xFF5C:
								// Quantization default (QCD)
								length = readUint16(data, position);
								var qcd = {};
								j = position + 2;
								sqcd = data[j++];

								switch (sqcd & 0x1F) {
									case 0:
										spqcdSize = 8;
										scalarExpounded = true;
										break;

									case 1:
										spqcdSize = 16;
										scalarExpounded = false;
										break;

									case 2:
										spqcdSize = 16;
										scalarExpounded = true;
										break;

									default:
										throw new Error('JPX Error: Invalid SQcd value ' + sqcd);
								}

								qcd.noQuantization = spqcdSize === 8;
								qcd.scalarExpounded = scalarExpounded;
								qcd.guardBits = sqcd >> 5;
								spqcds = [];

								while (j < length + position) {
									var spqcd = {};

									if (spqcdSize === 8) {
										spqcd.epsilon = data[j++] >> 3;
										spqcd.mu = 0;
									} else {
										spqcd.epsilon = data[j] >> 3;
										spqcd.mu = (data[j] & 0x7) << 8 | data[j + 1];
										j += 2;
									}

									spqcds.push(spqcd);
								}

								qcd.SPqcds = spqcds;

								if (context.mainHeader) {
									context.QCD = qcd;
								} else {
									context.currentTile.QCD = qcd;
									context.currentTile.QCC = [];
								}

								break;

							case 0xFF5D:
								// Quantization component (QCC)
								length = readUint16(data, position);
								var qcc = {};
								j = position + 2;
								var cqcc;

								if (context.SIZ.Csiz < 257) {
									cqcc = data[j++];
								} else {
									cqcc = readUint16(data, j);
									j += 2;
								}

								sqcd = data[j++];

								switch (sqcd & 0x1F) {
									case 0:
										spqcdSize = 8;
										scalarExpounded = true;
										break;

									case 1:
										spqcdSize = 16;
										scalarExpounded = false;
										break;

									case 2:
										spqcdSize = 16;
										scalarExpounded = true;
										break;

									default:
										throw new Error('JPX Error: Invalid SQcd value ' + sqcd);
								}

								qcc.noQuantization = spqcdSize === 8;
								qcc.scalarExpounded = scalarExpounded;
								qcc.guardBits = sqcd >> 5;
								spqcds = [];

								while (j < length + position) {
									spqcd = {};

									if (spqcdSize === 8) {
										spqcd.epsilon = data[j++] >> 3;
										spqcd.mu = 0;
									} else {
										spqcd.epsilon = data[j] >> 3;
										spqcd.mu = (data[j] & 0x7) << 8 | data[j + 1];
										j += 2;
									}

									spqcds.push(spqcd);
								}

								qcc.SPqcds = spqcds;

								if (context.mainHeader) {
									context.QCC[cqcc] = qcc;
								} else {
									context.currentTile.QCC[cqcc] = qcc;
								}

								break;

							case 0xFF52:
								// Coding style default (COD)
								length = readUint16(data, position);
								var cod = {};
								j = position + 2;
								var scod = data[j++];
								cod.entropyCoderWithCustomPrecincts = !!(scod & 1);
								cod.sopMarkerUsed = !!(scod & 2);
								cod.ephMarkerUsed = !!(scod & 4);
								cod.progressionOrder = data[j++];
								cod.layersCount = readUint16(data, j);
								j += 2;
								cod.multipleComponentTransform = data[j++];
								cod.decompositionLevelsCount = data[j++];
								cod.xcb = (data[j++] & 0xF) + 2;
								cod.ycb = (data[j++] & 0xF) + 2;
								var blockStyle = data[j++];
								cod.selectiveArithmeticCodingBypass = !!(blockStyle & 1);
								cod.resetContextProbabilities = !!(blockStyle & 2);
								cod.terminationOnEachCodingPass = !!(blockStyle & 4);
								cod.verticalyStripe = !!(blockStyle & 8);
								cod.predictableTermination = !!(blockStyle & 16);
								cod.segmentationSymbolUsed = !!(blockStyle & 32);
								cod.reversibleTransformation = data[j++];

								if (cod.entropyCoderWithCustomPrecincts) {
									var precinctsSizes = [];

									while (j < length + position) {
										var precinctsSize = data[j++];
										precinctsSizes.push({
											PPx: precinctsSize & 0xF,
											PPy: precinctsSize >> 4
										});
									}

									cod.precinctsSizes = precinctsSizes;
								}

								var unsupported = [];

								if (cod.selectiveArithmeticCodingBypass) {
									unsupported.push('selectiveArithmeticCodingBypass');
								}

								if (cod.resetContextProbabilities) {
									unsupported.push('resetContextProbabilities');
								}

								if (cod.terminationOnEachCodingPass) {
									unsupported.push('terminationOnEachCodingPass');
								}

								if (cod.verticalyStripe) {
									unsupported.push('verticalyStripe');
								}

								if (cod.predictableTermination) {
									unsupported.push('predictableTermination');
								}

								if (unsupported.length > 0) {
									doNotRecover = true;
									throw new Error('JPX Error: Unsupported COD options (' + unsupported.join(', ') + ')');
								}

								if (context.mainHeader) {
									context.COD = cod;
								} else {
									context.currentTile.COD = cod;
									context.currentTile.COC = [];
								}

								break;

							case 0xFF90:
								// Start of tile-part (SOT)
								length = readUint16(data, position);
								tile = {};
								tile.index = readUint16(data, position + 2);
								tile.length = readUint32(data, position + 4);
								tile.dataEnd = tile.length + position - 2;
								tile.partIndex = data[position + 8];
								tile.partsCount = data[position + 9];
								context.mainHeader = false;

								if (tile.partIndex === 0) {
									// reset component specific settings
									tile.COD = context.COD;
									tile.COC = context.COC.slice(0); // clone of the global COC

									tile.QCD = context.QCD;
									tile.QCC = context.QCC.slice(0); // clone of the global COC
								}

								context.currentTile = tile;
								break;

							case 0xFF93:
								// Start of data (SOD)
								tile = context.currentTile;

								if (tile.partIndex === 0) {
									initializeTile(context, tile.index);
									buildPackets(context);
								} // moving to the end of the data


								length = tile.dataEnd - position;
								parseTilePackets(context, data, position, length);
								break;

							case 0xFF55: // Tile-part lengths, main header (TLM)

							case 0xFF57: // Packet length, main header (PLM)

							case 0xFF58: // Packet length, tile-part header (PLT)

							case 0xFF64:
								// Comment (COM)
								length = readUint16(data, position); // skipping content

								break;

							case 0xFF53:
								// Coding style component (COC)
								throw new Error('JPX Error: Codestream code 0xFF53 (COC) is ' + 'not implemented');

							default:
								throw new Error('JPX Error: Unknown codestream code: ' + code.toString(16));
						}

						position += length;
					}
				} catch (e) {
					if (doNotRecover || this.failOnCorruptedImage) {
						throw e;
					} else {
						warn('Trying to recover from ' + e.message);
					}
				}

				this.tiles = transformComponents(context);
				this.width = context.SIZ.Xsiz - context.SIZ.XOsiz;
				this.height = context.SIZ.Ysiz - context.SIZ.YOsiz;
				this.componentsCount = context.SIZ.Csiz;
			}
		};

		function calculateComponentDimensions(component, siz) {
			// Section B.2 Component mapping
			component.x0 = Math.ceil(siz.XOsiz / component.XRsiz);
			component.x1 = Math.ceil(siz.Xsiz / component.XRsiz);
			component.y0 = Math.ceil(siz.YOsiz / component.YRsiz);
			component.y1 = Math.ceil(siz.Ysiz / component.YRsiz);
			component.width = component.x1 - component.x0;
			component.height = component.y1 - component.y0;
		}

		function calculateTileGrids(context, components) {
			var siz = context.SIZ; // Section B.3 Division into tile and tile-components

			var tile,
					tiles = [];
			var numXtiles = Math.ceil((siz.Xsiz - siz.XTOsiz) / siz.XTsiz);
			var numYtiles = Math.ceil((siz.Ysiz - siz.YTOsiz) / siz.YTsiz);

			for (var q = 0; q < numYtiles; q++) {
				for (var p = 0; p < numXtiles; p++) {
					tile = {};
					tile.tx0 = Math.max(siz.XTOsiz + p * siz.XTsiz, siz.XOsiz);
					tile.ty0 = Math.max(siz.YTOsiz + q * siz.YTsiz, siz.YOsiz);
					tile.tx1 = Math.min(siz.XTOsiz + (p + 1) * siz.XTsiz, siz.Xsiz);
					tile.ty1 = Math.min(siz.YTOsiz + (q + 1) * siz.YTsiz, siz.Ysiz);
					tile.width = tile.tx1 - tile.tx0;
					tile.height = tile.ty1 - tile.ty0;
					tile.components = [];
					tiles.push(tile);
				}
			}

			context.tiles = tiles;
			var componentsCount = siz.Csiz;

			for (var i = 0, ii = componentsCount; i < ii; i++) {
				var component = components[i];

				for (var j = 0, jj = tiles.length; j < jj; j++) {
					var tileComponent = {};
					tile = tiles[j];
					tileComponent.tcx0 = Math.ceil(tile.tx0 / component.XRsiz);
					tileComponent.tcy0 = Math.ceil(tile.ty0 / component.YRsiz);
					tileComponent.tcx1 = Math.ceil(tile.tx1 / component.XRsiz);
					tileComponent.tcy1 = Math.ceil(tile.ty1 / component.YRsiz);
					tileComponent.width = tileComponent.tcx1 - tileComponent.tcx0;
					tileComponent.height = tileComponent.tcy1 - tileComponent.tcy0;
					tile.components[i] = tileComponent;
				}
			}
		}

		function getBlocksDimensions(context, component, r) {
			var codOrCoc = component.codingStyleParameters;
			var result = {};

			if (!codOrCoc.entropyCoderWithCustomPrecincts) {
				result.PPx = 15;
				result.PPy = 15;
			} else {
				result.PPx = codOrCoc.precinctsSizes[r].PPx;
				result.PPy = codOrCoc.precinctsSizes[r].PPy;
			} // calculate codeblock size as described in section B.7


			result.xcb_ = r > 0 ? Math.min(codOrCoc.xcb, result.PPx - 1) : Math.min(codOrCoc.xcb, result.PPx);
			result.ycb_ = r > 0 ? Math.min(codOrCoc.ycb, result.PPy - 1) : Math.min(codOrCoc.ycb, result.PPy);
			return result;
		}

		function buildPrecincts(context, resolution, dimensions) {
			// Section B.6 Division resolution to precincts
			var precinctWidth = 1 << dimensions.PPx;
			var precinctHeight = 1 << dimensions.PPy; // Jasper introduces codeblock groups for mapping each subband codeblocks
			// to precincts. Precinct partition divides a resolution according to width
			// and height parameters. The subband that belongs to the resolution level
			// has a different size than the level, unless it is the zero resolution.
			// From Jasper documentation: jpeg2000.pdf, section K: Tier-2 coding:
			// The precinct partitioning for a particular subband is derived from a
			// partitioning of its parent LL band (i.e., the LL band at the next higher
			// resolution level)... The LL band associated with each resolution level is
			// divided into precincts... Each of the resulting precinct regions is then
			// mapped into its child subbands (if any) at the next lower resolution
			// level. This is accomplished by using the coordinate transformation
			// (u, v) = (ceil(x/2), ceil(y/2)) where (x, y) and (u, v) are the
			// coordinates of a point in the LL band and child subband, respectively.

			var isZeroRes = resolution.resLevel === 0;
			var precinctWidthInSubband = 1 << dimensions.PPx + (isZeroRes ? 0 : -1);
			var precinctHeightInSubband = 1 << dimensions.PPy + (isZeroRes ? 0 : -1);
			var numprecinctswide = resolution.trx1 > resolution.trx0 ? Math.ceil(resolution.trx1 / precinctWidth) - Math.floor(resolution.trx0 / precinctWidth) : 0;
			var numprecinctshigh = resolution.try1 > resolution.try0 ? Math.ceil(resolution.try1 / precinctHeight) - Math.floor(resolution.try0 / precinctHeight) : 0;
			var numprecincts = numprecinctswide * numprecinctshigh;
			resolution.precinctParameters = {
				precinctWidth: precinctWidth,
				precinctHeight: precinctHeight,
				numprecinctswide: numprecinctswide,
				numprecinctshigh: numprecinctshigh,
				numprecincts: numprecincts,
				precinctWidthInSubband: precinctWidthInSubband,
				precinctHeightInSubband: precinctHeightInSubband
			};
		}

		function buildCodeblocks(context, subband, dimensions) {
			// Section B.7 Division sub-band into code-blocks
			var xcb_ = dimensions.xcb_;
			var ycb_ = dimensions.ycb_;
			var codeblockWidth = 1 << xcb_;
			var codeblockHeight = 1 << ycb_;
			var cbx0 = subband.tbx0 >> xcb_;
			var cby0 = subband.tby0 >> ycb_;
			var cbx1 = subband.tbx1 + codeblockWidth - 1 >> xcb_;
			var cby1 = subband.tby1 + codeblockHeight - 1 >> ycb_;
			var precinctParameters = subband.resolution.precinctParameters;
			var codeblocks = [];
			var precincts = [];
			var i, j, codeblock, precinctNumber;

			for (j = cby0; j < cby1; j++) {
				for (i = cbx0; i < cbx1; i++) {
					codeblock = {
						cbx: i,
						cby: j,
						tbx0: codeblockWidth * i,
						tby0: codeblockHeight * j,
						tbx1: codeblockWidth * (i + 1),
						tby1: codeblockHeight * (j + 1)
					};
					codeblock.tbx0_ = Math.max(subband.tbx0, codeblock.tbx0);
					codeblock.tby0_ = Math.max(subband.tby0, codeblock.tby0);
					codeblock.tbx1_ = Math.min(subband.tbx1, codeblock.tbx1);
					codeblock.tby1_ = Math.min(subband.tby1, codeblock.tby1); // Calculate precinct number for this codeblock, codeblock position
					// should be relative to its subband, use actual dimension and position
					// See comment about codeblock group width and height

					var pi = Math.floor((codeblock.tbx0_ - subband.tbx0) / precinctParameters.precinctWidthInSubband);
					var pj = Math.floor((codeblock.tby0_ - subband.tby0) / precinctParameters.precinctHeightInSubband);
					precinctNumber = pi + pj * precinctParameters.numprecinctswide;
					codeblock.precinctNumber = precinctNumber;
					codeblock.subbandType = subband.type;
					codeblock.Lblock = 3;

					if (codeblock.tbx1_ <= codeblock.tbx0_ || codeblock.tby1_ <= codeblock.tby0_) {
						continue;
					}

					codeblocks.push(codeblock); // building precinct for the sub-band

					var precinct = precincts[precinctNumber];

					if (precinct !== undefined) {
						if (i < precinct.cbxMin) {
							precinct.cbxMin = i;
						} else if (i > precinct.cbxMax) {
							precinct.cbxMax = i;
						}

						if (j < precinct.cbyMin) {
							precinct.cbxMin = j;
						} else if (j > precinct.cbyMax) {
							precinct.cbyMax = j;
						}
					} else {
						precincts[precinctNumber] = precinct = {
							cbxMin: i,
							cbyMin: j,
							cbxMax: i,
							cbyMax: j
						};
					}

					codeblock.precinct = precinct;
				}
			}

			subband.codeblockParameters = {
				codeblockWidth: xcb_,
				codeblockHeight: ycb_,
				numcodeblockwide: cbx1 - cbx0 + 1,
				numcodeblockhigh: cby1 - cby0 + 1
			};
			subband.codeblocks = codeblocks;
			subband.precincts = precincts;
		}

		function createPacket(resolution, precinctNumber, layerNumber) {
			var precinctCodeblocks = []; // Section B.10.8 Order of info in packet

			var subbands = resolution.subbands; // sub-bands already ordered in 'LL', 'HL', 'LH', and 'HH' sequence

			for (var i = 0, ii = subbands.length; i < ii; i++) {
				var subband = subbands[i];
				var codeblocks = subband.codeblocks;

				for (var j = 0, jj = codeblocks.length; j < jj; j++) {
					var codeblock = codeblocks[j];

					if (codeblock.precinctNumber !== precinctNumber) {
						continue;
					}

					precinctCodeblocks.push(codeblock);
				}
			}

			return {
				layerNumber: layerNumber,
				codeblocks: precinctCodeblocks
			};
		}

		function LayerResolutionComponentPositionIterator(context) {
			var siz = context.SIZ;
			var tileIndex = context.currentTile.index;
			var tile = context.tiles[tileIndex];
			var layersCount = tile.codingStyleDefaultParameters.layersCount;
			var componentsCount = siz.Csiz;
			var maxDecompositionLevelsCount = 0;

			for (var q = 0; q < componentsCount; q++) {
				maxDecompositionLevelsCount = Math.max(maxDecompositionLevelsCount, tile.components[q].codingStyleParameters.decompositionLevelsCount);
			}

			var l = 0,
					r = 0,
					i = 0,
					k = 0;

			this.nextPacket = function JpxImage_nextPacket() {
				// Section B.12.1.1 Layer-resolution-component-position
				for (; l < layersCount; l++) {
					for (; r <= maxDecompositionLevelsCount; r++) {
						for (; i < componentsCount; i++) {
							var component = tile.components[i];

							if (r > component.codingStyleParameters.decompositionLevelsCount) {
								continue;
							}

							var resolution = component.resolutions[r];
							var numprecincts = resolution.precinctParameters.numprecincts;

							for (; k < numprecincts;) {
								var packet = createPacket(resolution, k, l);
								k++;
								return packet;
							}

							k = 0;
						}

						i = 0;
					}

					r = 0;
				}
			};
		}

		function ResolutionLayerComponentPositionIterator(context) {
			var siz = context.SIZ;
			var tileIndex = context.currentTile.index;
			var tile = context.tiles[tileIndex];
			var layersCount = tile.codingStyleDefaultParameters.layersCount;
			var componentsCount = siz.Csiz;
			var maxDecompositionLevelsCount = 0;

			for (var q = 0; q < componentsCount; q++) {
				maxDecompositionLevelsCount = Math.max(maxDecompositionLevelsCount, tile.components[q].codingStyleParameters.decompositionLevelsCount);
			}

			var r = 0,
					l = 0,
					i = 0,
					k = 0;

			this.nextPacket = function JpxImage_nextPacket() {
				// Section B.12.1.2 Resolution-layer-component-position
				for (; r <= maxDecompositionLevelsCount; r++) {
					for (; l < layersCount; l++) {
						for (; i < componentsCount; i++) {
							var component = tile.components[i];

							if (r > component.codingStyleParameters.decompositionLevelsCount) {
								continue;
							}

							var resolution = component.resolutions[r];
							var numprecincts = resolution.precinctParameters.numprecincts;

							for (; k < numprecincts;) {
								var packet = createPacket(resolution, k, l);
								k++;
								return packet;
							}

							k = 0;
						}

						i = 0;
					}

					l = 0;
				}
			};
		}

		function ResolutionPositionComponentLayerIterator(context) {
			var siz = context.SIZ;
			var tileIndex = context.currentTile.index;
			var tile = context.tiles[tileIndex];
			var layersCount = tile.codingStyleDefaultParameters.layersCount;
			var componentsCount = siz.Csiz;
			var l, r, c, p;
			var maxDecompositionLevelsCount = 0;

			for (c = 0; c < componentsCount; c++) {
				var component = tile.components[c];
				maxDecompositionLevelsCount = Math.max(maxDecompositionLevelsCount, component.codingStyleParameters.decompositionLevelsCount);
			}

			var maxNumPrecinctsInLevel = new Int32Array(maxDecompositionLevelsCount + 1);

			for (r = 0; r <= maxDecompositionLevelsCount; ++r) {
				var maxNumPrecincts = 0;

				for (c = 0; c < componentsCount; ++c) {
					var resolutions = tile.components[c].resolutions;

					if (r < resolutions.length) {
						maxNumPrecincts = Math.max(maxNumPrecincts, resolutions[r].precinctParameters.numprecincts);
					}
				}

				maxNumPrecinctsInLevel[r] = maxNumPrecincts;
			}

			l = 0;
			r = 0;
			c = 0;
			p = 0;

			this.nextPacket = function JpxImage_nextPacket() {
				// Section B.12.1.3 Resolution-position-component-layer
				for (; r <= maxDecompositionLevelsCount; r++) {
					for (; p < maxNumPrecinctsInLevel[r]; p++) {
						for (; c < componentsCount; c++) {
							var component = tile.components[c];

							if (r > component.codingStyleParameters.decompositionLevelsCount) {
								continue;
							}

							var resolution = component.resolutions[r];
							var numprecincts = resolution.precinctParameters.numprecincts;

							if (p >= numprecincts) {
								continue;
							}

							for (; l < layersCount;) {
								var packet = createPacket(resolution, p, l);
								l++;
								return packet;
							}

							l = 0;
						}

						c = 0;
					}

					p = 0;
				}
			};
		}

		function PositionComponentResolutionLayerIterator(context) {
			var siz = context.SIZ;
			var tileIndex = context.currentTile.index;
			var tile = context.tiles[tileIndex];
			var layersCount = tile.codingStyleDefaultParameters.layersCount;
			var componentsCount = siz.Csiz;
			var precinctsSizes = getPrecinctSizesInImageScale(tile);
			var precinctsIterationSizes = precinctsSizes;
			var l = 0,
					r = 0,
					c = 0,
					px = 0,
					py = 0;

			this.nextPacket = function JpxImage_nextPacket() {
				// Section B.12.1.4 Position-component-resolution-layer
				for (; py < precinctsIterationSizes.maxNumHigh; py++) {
					for (; px < precinctsIterationSizes.maxNumWide; px++) {
						for (; c < componentsCount; c++) {
							var component = tile.components[c];
							var decompositionLevelsCount = component.codingStyleParameters.decompositionLevelsCount;

							for (; r <= decompositionLevelsCount; r++) {
								var resolution = component.resolutions[r];
								var sizeInImageScale = precinctsSizes.components[c].resolutions[r];
								var k = getPrecinctIndexIfExist(px, py, sizeInImageScale, precinctsIterationSizes, resolution);

								if (k === null) {
									continue;
								}

								for (; l < layersCount;) {
									var packet = createPacket(resolution, k, l);
									l++;
									return packet;
								}

								l = 0;
							}

							r = 0;
						}

						c = 0;
					}

					px = 0;
				}
			};
		}

		function ComponentPositionResolutionLayerIterator(context) {
			var siz = context.SIZ;
			var tileIndex = context.currentTile.index;
			var tile = context.tiles[tileIndex];
			var layersCount = tile.codingStyleDefaultParameters.layersCount;
			var componentsCount = siz.Csiz;
			var precinctsSizes = getPrecinctSizesInImageScale(tile);
			var l = 0,
					r = 0,
					c = 0,
					px = 0,
					py = 0;

			this.nextPacket = function JpxImage_nextPacket() {
				// Section B.12.1.5 Component-position-resolution-layer
				for (; c < componentsCount; ++c) {
					var component = tile.components[c];
					var precinctsIterationSizes = precinctsSizes.components[c];
					var decompositionLevelsCount = component.codingStyleParameters.decompositionLevelsCount;

					for (; py < precinctsIterationSizes.maxNumHigh; py++) {
						for (; px < precinctsIterationSizes.maxNumWide; px++) {
							for (; r <= decompositionLevelsCount; r++) {
								var resolution = component.resolutions[r];
								var sizeInImageScale = precinctsIterationSizes.resolutions[r];
								var k = getPrecinctIndexIfExist(px, py, sizeInImageScale, precinctsIterationSizes, resolution);

								if (k === null) {
									continue;
								}

								for (; l < layersCount;) {
									var packet = createPacket(resolution, k, l);
									l++;
									return packet;
								}

								l = 0;
							}

							r = 0;
						}

						px = 0;
					}

					py = 0;
				}
			};
		}

		function getPrecinctIndexIfExist(pxIndex, pyIndex, sizeInImageScale, precinctIterationSizes, resolution) {
			var posX = pxIndex * precinctIterationSizes.minWidth;
			var posY = pyIndex * precinctIterationSizes.minHeight;

			if (posX % sizeInImageScale.width !== 0 || posY % sizeInImageScale.height !== 0) {
				return null;
			}

			var startPrecinctRowIndex = posY / sizeInImageScale.width * resolution.precinctParameters.numprecinctswide;
			return posX / sizeInImageScale.height + startPrecinctRowIndex;
		}

		function getPrecinctSizesInImageScale(tile) {
			var componentsCount = tile.components.length;
			var minWidth = Number.MAX_VALUE;
			var minHeight = Number.MAX_VALUE;
			var maxNumWide = 0;
			var maxNumHigh = 0;
			var sizePerComponent = new Array(componentsCount);

			for (var c = 0; c < componentsCount; c++) {
				var component = tile.components[c];
				var decompositionLevelsCount = component.codingStyleParameters.decompositionLevelsCount;
				var sizePerResolution = new Array(decompositionLevelsCount + 1);
				var minWidthCurrentComponent = Number.MAX_VALUE;
				var minHeightCurrentComponent = Number.MAX_VALUE;
				var maxNumWideCurrentComponent = 0;
				var maxNumHighCurrentComponent = 0;
				var scale = 1;

				for (var r = decompositionLevelsCount; r >= 0; --r) {
					var resolution = component.resolutions[r];
					var widthCurrentResolution = scale * resolution.precinctParameters.precinctWidth;
					var heightCurrentResolution = scale * resolution.precinctParameters.precinctHeight;
					minWidthCurrentComponent = Math.min(minWidthCurrentComponent, widthCurrentResolution);
					minHeightCurrentComponent = Math.min(minHeightCurrentComponent, heightCurrentResolution);
					maxNumWideCurrentComponent = Math.max(maxNumWideCurrentComponent, resolution.precinctParameters.numprecinctswide);
					maxNumHighCurrentComponent = Math.max(maxNumHighCurrentComponent, resolution.precinctParameters.numprecinctshigh);
					sizePerResolution[r] = {
						width: widthCurrentResolution,
						height: heightCurrentResolution
					};
					scale <<= 1;
				}

				minWidth = Math.min(minWidth, minWidthCurrentComponent);
				minHeight = Math.min(minHeight, minHeightCurrentComponent);
				maxNumWide = Math.max(maxNumWide, maxNumWideCurrentComponent);
				maxNumHigh = Math.max(maxNumHigh, maxNumHighCurrentComponent);
				sizePerComponent[c] = {
					resolutions: sizePerResolution,
					minWidth: minWidthCurrentComponent,
					minHeight: minHeightCurrentComponent,
					maxNumWide: maxNumWideCurrentComponent,
					maxNumHigh: maxNumHighCurrentComponent
				};
			}

			return {
				components: sizePerComponent,
				minWidth: minWidth,
				minHeight: minHeight,
				maxNumWide: maxNumWide,
				maxNumHigh: maxNumHigh
			};
		}

		function buildPackets(context) {
			var siz = context.SIZ;
			var tileIndex = context.currentTile.index;
			var tile = context.tiles[tileIndex];
			var componentsCount = siz.Csiz; // Creating resolutions and sub-bands for each component

			for (var c = 0; c < componentsCount; c++) {
				var component = tile.components[c];
				var decompositionLevelsCount = component.codingStyleParameters.decompositionLevelsCount; // Section B.5 Resolution levels and sub-bands

				var resolutions = [];
				var subbands = [];

				for (var r = 0; r <= decompositionLevelsCount; r++) {
					var blocksDimensions = getBlocksDimensions(context, component, r);
					var resolution = {};
					var scale = 1 << decompositionLevelsCount - r;
					resolution.trx0 = Math.ceil(component.tcx0 / scale);
					resolution.try0 = Math.ceil(component.tcy0 / scale);
					resolution.trx1 = Math.ceil(component.tcx1 / scale);
					resolution.try1 = Math.ceil(component.tcy1 / scale);
					resolution.resLevel = r;
					buildPrecincts(context, resolution, blocksDimensions);
					resolutions.push(resolution);
					var subband;

					if (r === 0) {
						// one sub-band (LL) with last decomposition
						subband = {};
						subband.type = 'LL';
						subband.tbx0 = Math.ceil(component.tcx0 / scale);
						subband.tby0 = Math.ceil(component.tcy0 / scale);
						subband.tbx1 = Math.ceil(component.tcx1 / scale);
						subband.tby1 = Math.ceil(component.tcy1 / scale);
						subband.resolution = resolution;
						buildCodeblocks(context, subband, blocksDimensions);
						subbands.push(subband);
						resolution.subbands = [subband];
					} else {
						var bscale = 1 << decompositionLevelsCount - r + 1;
						var resolutionSubbands = []; // three sub-bands (HL, LH and HH) with rest of decompositions

						subband = {};
						subband.type = 'HL';
						subband.tbx0 = Math.ceil(component.tcx0 / bscale - 0.5);
						subband.tby0 = Math.ceil(component.tcy0 / bscale);
						subband.tbx1 = Math.ceil(component.tcx1 / bscale - 0.5);
						subband.tby1 = Math.ceil(component.tcy1 / bscale);
						subband.resolution = resolution;
						buildCodeblocks(context, subband, blocksDimensions);
						subbands.push(subband);
						resolutionSubbands.push(subband);
						subband = {};
						subband.type = 'LH';
						subband.tbx0 = Math.ceil(component.tcx0 / bscale);
						subband.tby0 = Math.ceil(component.tcy0 / bscale - 0.5);
						subband.tbx1 = Math.ceil(component.tcx1 / bscale);
						subband.tby1 = Math.ceil(component.tcy1 / bscale - 0.5);
						subband.resolution = resolution;
						buildCodeblocks(context, subband, blocksDimensions);
						subbands.push(subband);
						resolutionSubbands.push(subband);
						subband = {};
						subband.type = 'HH';
						subband.tbx0 = Math.ceil(component.tcx0 / bscale - 0.5);
						subband.tby0 = Math.ceil(component.tcy0 / bscale - 0.5);
						subband.tbx1 = Math.ceil(component.tcx1 / bscale - 0.5);
						subband.tby1 = Math.ceil(component.tcy1 / bscale - 0.5);
						subband.resolution = resolution;
						buildCodeblocks(context, subband, blocksDimensions);
						subbands.push(subband);
						resolutionSubbands.push(subband);
						resolution.subbands = resolutionSubbands;
					}
				}

				component.resolutions = resolutions;
				component.subbands = subbands;
			} // Generate the packets sequence


			var progressionOrder = tile.codingStyleDefaultParameters.progressionOrder;

			switch (progressionOrder) {
				case 0:
					tile.packetsIterator = new LayerResolutionComponentPositionIterator(context);
					break;

				case 1:
					tile.packetsIterator = new ResolutionLayerComponentPositionIterator(context);
					break;

				case 2:
					tile.packetsIterator = new ResolutionPositionComponentLayerIterator(context);
					break;

				case 3:
					tile.packetsIterator = new PositionComponentResolutionLayerIterator(context);
					break;

				case 4:
					tile.packetsIterator = new ComponentPositionResolutionLayerIterator(context);
					break;

				default:
					throw new Error('JPX Error: Unsupported progression order ' + progressionOrder);
			}
		}

		function parseTilePackets(context, data, offset, dataLength) {
			var position = 0;
			var buffer,
					bufferSize = 0,
					skipNextBit = false;

			function readBits(count) {
				while (bufferSize < count) {
					if (offset + position >= data.length) {
						throw new Error("Unexpected EOF");
					}

					var b = data[offset + position];
					position++;

					if (skipNextBit) {
						buffer = buffer << 7 | b;
						bufferSize += 7;
						skipNextBit = false;
					} else {
						buffer = buffer << 8 | b;
						bufferSize += 8;
					}

					if (b === 0xFF) {
						skipNextBit = true;
					}
				}

				bufferSize -= count;
				return buffer >>> bufferSize & (1 << count) - 1;
			}

			function skipMarkerIfEqual(value) {
				if (data[offset + position - 1] === 0xFF && data[offset + position] === value) {
					skipBytes(1);
					return true;
				} else if (data[offset + position] === 0xFF && data[offset + position + 1] === value) {
					skipBytes(2);
					return true;
				}

				return false;
			}

			function skipBytes(count) {
				position += count;
			}

			function alignToByte() {
				bufferSize = 0;

				if (skipNextBit) {
					position++;
					skipNextBit = false;
				}
			}

			function readCodingpasses() {
				if (readBits(1) === 0) {
					return 1;
				}

				if (readBits(1) === 0) {
					return 2;
				}

				var value = readBits(2);

				if (value < 3) {
					return value + 3;
				}

				value = readBits(5);

				if (value < 31) {
					return value + 6;
				}

				value = readBits(7);
				return value + 37;
			}

			var tileIndex = context.currentTile.index;
			var tile = context.tiles[tileIndex];
			var sopMarkerUsed = context.COD.sopMarkerUsed;
			var ephMarkerUsed = context.COD.ephMarkerUsed;
			var packetsIterator = tile.packetsIterator;

			while (position < dataLength) {
				try {
					alignToByte();

					if (sopMarkerUsed && skipMarkerIfEqual(0x91)) {
						// Skip also marker segment length and packet sequence ID
						skipBytes(4);
					}

					var packet = packetsIterator.nextPacket();

					if (packet === undefined) {
						//No more packets. Stream is probably truncated.
						return;
					}

					if (!readBits(1)) {
						continue;
					}

					var layerNumber = packet.layerNumber;
					var queue = [],
							codeblock;

					for (var i = 0, ii = packet.codeblocks.length; i < ii; i++) {
						codeblock = packet.codeblocks[i];
						var precinct = codeblock.precinct;
						var codeblockColumn = codeblock.cbx - precinct.cbxMin;
						var codeblockRow = codeblock.cby - precinct.cbyMin;
						var codeblockIncluded = false;
						var firstTimeInclusion = false;
						var valueReady;

						if (codeblock['included'] !== undefined) {
							codeblockIncluded = !!readBits(1);
						} else {
							// reading inclusion tree
							precinct = codeblock.precinct;
							var inclusionTree, zeroBitPlanesTree;

							if (precinct['inclusionTree'] !== undefined) {
								inclusionTree = precinct.inclusionTree;
							} else {
								// building inclusion and zero bit-planes trees
								var width = precinct.cbxMax - precinct.cbxMin + 1;
								var height = precinct.cbyMax - precinct.cbyMin + 1;
								inclusionTree = new InclusionTree(width, height);
								zeroBitPlanesTree = new TagTree(width, height);
								precinct.inclusionTree = inclusionTree;
								precinct.zeroBitPlanesTree = zeroBitPlanesTree;
							}

							inclusionTree.reset(codeblockColumn, codeblockRow, layerNumber);

							while (true) {
								if (position >= data.length) {
									return;
								}

								if (inclusionTree.isAboveThreshold()) {
									break;
								}

								if (inclusionTree.isKnown()) {
									inclusionTree.nextLevel();
									continue;
								}

								if (readBits(1)) {
									inclusionTree.setKnown();

									if (inclusionTree.isLeaf()) {
										codeblock.included = true;
										codeblockIncluded = firstTimeInclusion = true;
										break;
									} else {
										inclusionTree.nextLevel();
									}
								} else {
									inclusionTree.incrementValue();
								}
							}
						}

						if (!codeblockIncluded) {
							continue;
						}

						if (firstTimeInclusion) {
							zeroBitPlanesTree = precinct.zeroBitPlanesTree;
							zeroBitPlanesTree.reset(codeblockColumn, codeblockRow);

							while (true) {
								if (position >= data.length) {
									return;
								}

								if (readBits(1)) {
									valueReady = !zeroBitPlanesTree.nextLevel();

									if (valueReady) {
										break;
									}
								} else {
									zeroBitPlanesTree.incrementValue();
								}
							}

							codeblock.zeroBitPlanes = zeroBitPlanesTree.value;
						}

						var codingpasses = readCodingpasses();

						while (readBits(1)) {
							codeblock.Lblock++;
						}

						var codingpassesLog2 = log2(codingpasses); // rounding down log2

						var bits = (codingpasses < 1 << codingpassesLog2 ? codingpassesLog2 - 1 : codingpassesLog2) + codeblock.Lblock;
						var codedDataLength = readBits(bits);
						queue.push({
							codeblock: codeblock,
							codingpasses: codingpasses,
							dataLength: codedDataLength
						});
					}

					alignToByte();

					if (ephMarkerUsed) {
						skipMarkerIfEqual(0x92);
					}

					while (queue.length > 0) {
						var packetItem = queue.shift();
						codeblock = packetItem.codeblock;

						if (codeblock['data'] === undefined) {
							codeblock.data = [];
						}

						codeblock.data.push({
							data: data,
							start: offset + position,
							end: offset + position + packetItem.dataLength,
							codingpasses: packetItem.codingpasses
						});
						position += packetItem.dataLength;
					}
				} catch (e) {
					return;
				}
			}

			return position;
		}

		function copyCoefficients(coefficients, levelWidth, levelHeight, subband, delta, mb, reversible, segmentationSymbolUsed) {
			var x0 = subband.tbx0;
			var y0 = subband.tby0;
			var width = subband.tbx1 - subband.tbx0;
			var codeblocks = subband.codeblocks;
			var right = subband.type.charAt(0) === 'H' ? 1 : 0;
			var bottom = subband.type.charAt(1) === 'H' ? levelWidth : 0;

			for (var i = 0, ii = codeblocks.length; i < ii; ++i) {
				var codeblock = codeblocks[i];
				var blockWidth = codeblock.tbx1_ - codeblock.tbx0_;
				var blockHeight = codeblock.tby1_ - codeblock.tby0_;

				if (blockWidth === 0 || blockHeight === 0) {
					continue;
				}

				if (codeblock['data'] === undefined) {
					continue;
				}

				var bitModel, currentCodingpassType;
				bitModel = new BitModel(blockWidth, blockHeight, codeblock.subbandType, codeblock.zeroBitPlanes, mb);
				currentCodingpassType = 2; // first bit plane starts from cleanup
				// collect data

				var data = codeblock.data,
						totalLength = 0,
						codingpasses = 0;
				var j, jj, dataItem;

				for (j = 0, jj = data.length; j < jj; j++) {
					dataItem = data[j];
					totalLength += dataItem.end - dataItem.start;
					codingpasses += dataItem.codingpasses;
				}

				var encodedData = new Int16Array(totalLength);
				var position = 0;

				for (j = 0, jj = data.length; j < jj; j++) {
					dataItem = data[j];
					var chunk = dataItem.data.subarray(dataItem.start, dataItem.end);
					encodedData.set(chunk, position);
					position += chunk.length;
				} // decoding the item


				var decoder = new ArithmeticDecoder(encodedData, 0, totalLength);
				bitModel.setDecoder(decoder);

				for (j = 0; j < codingpasses; j++) {
					switch (currentCodingpassType) {
						case 0:
							bitModel.runSignificancePropogationPass();
							break;

						case 1:
							bitModel.runMagnitudeRefinementPass();
							break;

						case 2:
							bitModel.runCleanupPass();

							if (segmentationSymbolUsed) {
								bitModel.checkSegmentationSymbol();
							}

							break;
					}

					currentCodingpassType = (currentCodingpassType + 1) % 3;
				}

				var offset = codeblock.tbx0_ - x0 + (codeblock.tby0_ - y0) * width;
				var sign = bitModel.coefficentsSign;
				var magnitude = bitModel.coefficentsMagnitude;
				var bitsDecoded = bitModel.bitsDecoded;
				var magnitudeCorrection = reversible ? 0 : 0.5;
				var k, n, nb;
				position = 0; // Do the interleaving of Section F.3.3 here, so we do not need
				// to copy later. LL level is not interleaved, just copied.

				var interleave = subband.type !== 'LL';

				for (j = 0; j < blockHeight; j++) {
					var row = offset / width | 0; // row in the non-interleaved subband

					var levelOffset = 2 * row * (levelWidth - width) + right + bottom;

					for (k = 0; k < blockWidth; k++) {
						n = magnitude[position];

						if (n !== 0) {
							n = (n + magnitudeCorrection) * delta;

							if (sign[position] !== 0) {
								n = -n;
							}

							nb = bitsDecoded[position];
							var pos = interleave ? levelOffset + (offset << 1) : offset;

							if (reversible && nb >= mb) {
								coefficients[pos] = n;
							} else {
								coefficients[pos] = n * (1 << mb - nb);
							}
						}

						offset++;
						position++;
					}

					offset += width - blockWidth;
				}
			}
		}

		function transformTile(context, tile, c) {
			var component = tile.components[c];
			var codingStyleParameters = component.codingStyleParameters;
			var quantizationParameters = component.quantizationParameters;
			var decompositionLevelsCount = codingStyleParameters.decompositionLevelsCount;
			var spqcds = quantizationParameters.SPqcds;
			var scalarExpounded = quantizationParameters.scalarExpounded;
			var guardBits = quantizationParameters.guardBits;
			var segmentationSymbolUsed = codingStyleParameters.segmentationSymbolUsed;
			var precision = context.components[c].precision;
			var reversible = codingStyleParameters.reversibleTransformation;
			var transform = reversible ? new ReversibleTransform() : new IrreversibleTransform();
			var subbandCoefficients = [];
			var b = 0;

			for (var i = 0; i <= decompositionLevelsCount; i++) {
				var resolution = component.resolutions[i];
				var width = resolution.trx1 - resolution.trx0;
				var height = resolution.try1 - resolution.try0; // Allocate space for the whole sublevel.

				var coefficients = new Float32Array(width * height);

				for (var j = 0, jj = resolution.subbands.length; j < jj; j++) {
					var mu, epsilon;

					if (!scalarExpounded) {
						// formula E-5
						mu = spqcds[0].mu;
						epsilon = spqcds[0].epsilon + (i > 0 ? 1 - i : 0);
					} else {
						mu = spqcds[b].mu;
						epsilon = spqcds[b].epsilon;
						b++;
					}

					var subband = resolution.subbands[j];
					var gainLog2 = SubbandsGainLog2[subband.type]; // calulate quantization coefficient (Section E.1.1.1)

					var delta = reversible ? 1 : Math.pow(2, precision + gainLog2 - epsilon) * (1 + mu / 2048);
					var mb = guardBits + epsilon - 1; // In the first resolution level, copyCoefficients will fill the
					// whole array with coefficients. In the succeding passes,
					// copyCoefficients will consecutively fill in the values that belong
					// to the interleaved positions of the HL, LH, and HH coefficients.
					// The LL coefficients will then be interleaved in Transform.iterate().

					copyCoefficients(coefficients, width, height, subband, delta, mb, reversible, segmentationSymbolUsed);
				}

				subbandCoefficients.push({
					width: width,
					height: height,
					items: coefficients
				});
			}

			var result = transform.calculate(subbandCoefficients, component.tcx0, component.tcy0);
			return {
				left: component.tcx0,
				top: component.tcy0,
				width: result.width,
				height: result.height,
				items: result.items
			};
		}

		function transformComponents(context) {
			var siz = context.SIZ;
			var components = context.components;
			var componentsCount = siz.Csiz;
			var resultImages = [];

			for (var i = 0, ii = context.tiles.length; i < ii; i++) {
				var tile = context.tiles[i];
				var transformedTiles = [];
				var c;

				for (c = 0; c < componentsCount; c++) {
					transformedTiles[c] = transformTile(context, tile, c);
				}

				var tile0 = transformedTiles[0];
				var isSigned = components[0].isSigned;

				if (isSigned) {
					var out = new Int16Array(tile0.items.length * componentsCount);
				} else {
					var out = new Uint16Array(tile0.items.length * componentsCount);
				}

				var result = {
					left: tile0.left,
					top: tile0.top,
					width: tile0.width,
					height: tile0.height,
					items: out
				}; // Section G.2.2 Inverse multi component transform

				var shift, offset, max, min, maxK;
				var pos = 0,
						j,
						jj,
						y0,
						y1,
						y2,
						r,
						g,
						b,
						k,
						val;

				if (tile.codingStyleDefaultParameters.multipleComponentTransform) {
					var fourComponents = componentsCount === 4;
					var y0items = transformedTiles[0].items;
					var y1items = transformedTiles[1].items;
					var y2items = transformedTiles[2].items;
					var y3items = fourComponents ? transformedTiles[3].items : null; // HACK: The multiple component transform formulas below assume that
					// all components have the same precision. With this in mind, we
					// compute shift and offset only once.

					shift = components[0].precision - 8;
					offset = (128 << shift) + 0.5;
					max = 255 * (1 << shift);
					maxK = max * 0.5;
					min = -maxK;
					var component0 = tile.components[0];
					var alpha01 = componentsCount - 3;
					jj = y0items.length;

					if (!component0.codingStyleParameters.reversibleTransformation) {
						// inverse irreversible multiple component transform
						for (j = 0; j < jj; j++, pos += alpha01) {
							y0 = y0items[j] + offset;
							y1 = y1items[j];
							y2 = y2items[j];
							r = y0 + 1.402 * y2;
							g = y0 - 0.34413 * y1 - 0.71414 * y2;
							b = y0 + 1.772 * y1;
							out[pos++] = r <= 0 ? 0 : r >= max ? 255 : r >> shift;
							out[pos++] = g <= 0 ? 0 : g >= max ? 255 : g >> shift;
							out[pos++] = b <= 0 ? 0 : b >= max ? 255 : b >> shift;
						}
					} else {
						// inverse reversible multiple component transform
						for (j = 0; j < jj; j++, pos += alpha01) {
							y0 = y0items[j] + offset;
							y1 = y1items[j];
							y2 = y2items[j];
							g = y0 - (y2 + y1 >> 2);
							r = g + y2;
							b = g + y1;
							out[pos++] = r <= 0 ? 0 : r >= max ? 255 : r >> shift;
							out[pos++] = g <= 0 ? 0 : g >= max ? 255 : g >> shift;
							out[pos++] = b <= 0 ? 0 : b >= max ? 255 : b >> shift;
						}
					}

					if (fourComponents) {
						for (j = 0, pos = 3; j < jj; j++, pos += 4) {
							k = y3items[j];
							out[pos] = k <= min ? 0 : k >= maxK ? 255 : k + offset >> shift;
						}
					}
				} else {
					// no multi-component transform
					for (c = 0; c < componentsCount; c++) {
						if (components[c].precision === 8) {
							var items = transformedTiles[c].items;
							shift = components[c].precision - 8;
							offset = (128 << shift) + 0.5;
							max = 127.5 * (1 << shift);
							min = -max;

							for (pos = c, j = 0, jj = items.length; j < jj; j++) {
								val = items[j];
								out[pos] = val <= min ? 0 : val >= max ? 255 : val + offset >> shift;
								pos += componentsCount;
							}
						} else {
							var isSigned = components[c].isSigned;
							var items = transformedTiles[c].items;

							if (isSigned) {
								for (pos = c, j = 0, jj = items.length; j < jj; j++) {
									out[pos] = items[j];
									pos += componentsCount;
								}
							} else {
								shift = components[c].precision - 8;
								offset = (128 << shift) + 0.5;
								var precisionMax = Math.pow(2, components[c].precision) - 1;

								for (pos = c, j = 0, jj = items.length; j < jj; j++) {
									val = items[j];
									out[pos] = Math.max(Math.min(val + offset, precisionMax), 0);
									pos += componentsCount;
								}
							}
						}
					}
				}

				resultImages.push(result);
			}

			return resultImages;
		}

		function initializeTile(context, tileIndex) {
			var siz = context.SIZ;
			var componentsCount = siz.Csiz;
			var tile = context.tiles[tileIndex];

			for (var c = 0; c < componentsCount; c++) {
				var component = tile.components[c];
				var qcdOrQcc = context.currentTile.QCC[c] !== undefined ? context.currentTile.QCC[c] : context.currentTile.QCD;
				component.quantizationParameters = qcdOrQcc;
				var codOrCoc = context.currentTile.COC[c] !== undefined ? context.currentTile.COC[c] : context.currentTile.COD;
				component.codingStyleParameters = codOrCoc;
			}

			tile.codingStyleDefaultParameters = context.currentTile.COD;
		} // Section B.10.2 Tag trees


		var TagTree = function TagTreeClosure() {
			function TagTree(width, height) {
				var levelsLength = log2(Math.max(width, height)) + 1;
				this.levels = [];

				for (var i = 0; i < levelsLength; i++) {
					var level = {
						width: width,
						height: height,
						items: []
					};
					this.levels.push(level);
					width = Math.ceil(width / 2);
					height = Math.ceil(height / 2);
				}
			}

			TagTree.prototype = {
				reset: function TagTree_reset(i, j) {
					var currentLevel = 0,
							value = 0,
							level;

					while (currentLevel < this.levels.length) {
						level = this.levels[currentLevel];
						var index = i + j * level.width;

						if (level.items[index] !== undefined) {
							value = level.items[index];
							break;
						}

						level.index = index;
						i >>= 1;
						j >>= 1;
						currentLevel++;
					}

					currentLevel--;
					level = this.levels[currentLevel];
					level.items[level.index] = value;
					this.currentLevel = currentLevel;
					delete this.value;
				},
				incrementValue: function TagTree_incrementValue() {
					var level = this.levels[this.currentLevel];
					level.items[level.index]++;
				},
				nextLevel: function TagTree_nextLevel() {
					var currentLevel = this.currentLevel;
					var level = this.levels[currentLevel];
					var value = level.items[level.index];
					currentLevel--;

					if (currentLevel < 0) {
						this.value = value;
						return false;
					}

					this.currentLevel = currentLevel;
					level = this.levels[currentLevel];
					level.items[level.index] = value;
					return true;
				}
			};
			return TagTree;
		}();

		var InclusionTree = function InclusionTreeClosure() {
			function InclusionTree(width, height) {
				var levelsLength = log2(Math.max(width, height)) + 1;
				this.levels = [];

				for (var i = 0; i < levelsLength; i++) {
					var items = new Uint8Array(width * height);
					var status = new Uint8Array(width * height);

					for (var j = 0, jj = items.length; j < jj; j++) {
						items[j] = 0;
						status[j] = 0;
					}

					var level = {
						width: width,
						height: height,
						items: items,
						status: status
					};
					this.levels.push(level);
					width = Math.ceil(width / 2);
					height = Math.ceil(height / 2);
				}
			}

			InclusionTree.prototype = {
				reset: function InclusionTree_reset(i, j, stopValue) {
					this.currentStopValue = stopValue;
					var currentLevel = 0;

					while (currentLevel < this.levels.length) {
						var level = this.levels[currentLevel];
						var index = i + j * level.width;
						level.index = index;
						i >>= 1;
						j >>= 1;
						currentLevel++;
					}

					this.currentLevel = this.levels.length - 1;
					this.minValue = this.levels[this.currentLevel].items[0];
					return;
				},
				incrementValue: function InclusionTree_incrementValue() {
					var level = this.levels[this.currentLevel];
					level.items[level.index] = level.items[level.index] + 1;

					if (level.items[level.index] > this.minValue) {
						this.minValue = level.items[level.index];
					}
				},
				nextLevel: function InclusionTree_nextLevel() {
					var currentLevel = this.currentLevel;
					currentLevel--;

					if (currentLevel < 0) {
						return false;
					} else {
						this.currentLevel = currentLevel;
						var level = this.levels[currentLevel];

						if (level.items[level.index] < this.minValue) {
							level.items[level.index] = this.minValue;
						} else if (level.items[level.index] > this.minValue) {
							this.minValue = level.items[level.index];
						}

						return true;
					}
				},
				isLeaf: function InclusionTree_isLeaf() {
					return this.currentLevel === 0;
				},
				isAboveThreshold: function InclusionTree_isAboveThreshold() {
					var levelindex = this.currentLevel;
					var level = this.levels[levelindex];
					return level.items[level.index] > this.currentStopValue;
				},
				isKnown: function InclusionTree_isKnown() {
					var levelindex = this.currentLevel;
					var level = this.levels[levelindex];
					return level.status[level.index] > 0;
				},
				setKnown: function InclusionTree_setKnown() {
					var levelindex = this.currentLevel;
					var level = this.levels[levelindex];
					level.status[level.index] = 1;
					return;
				}
			};
			return InclusionTree;
		}(); // Section D. Coefficient bit modeling


		var BitModel = function BitModelClosure() {
			var UNIFORM_CONTEXT = 17;
			var RUNLENGTH_CONTEXT = 18; // Table D-1
			// The index is binary presentation: 0dddvvhh, ddd - sum of Di (0..4),
			// vv - sum of Vi (0..2), and hh - sum of Hi (0..2)

			var LLAndLHContextsLabel = new Uint8Array([0, 5, 8, 0, 3, 7, 8, 0, 4, 7, 8, 0, 0, 0, 0, 0, 1, 6, 8, 0, 3, 7, 8, 0, 4, 7, 8, 0, 0, 0, 0, 0, 2, 6, 8, 0, 3, 7, 8, 0, 4, 7, 8, 0, 0, 0, 0, 0, 2, 6, 8, 0, 3, 7, 8, 0, 4, 7, 8, 0, 0, 0, 0, 0, 2, 6, 8, 0, 3, 7, 8, 0, 4, 7, 8]);
			var HLContextLabel = new Uint8Array([0, 3, 4, 0, 5, 7, 7, 0, 8, 8, 8, 0, 0, 0, 0, 0, 1, 3, 4, 0, 6, 7, 7, 0, 8, 8, 8, 0, 0, 0, 0, 0, 2, 3, 4, 0, 6, 7, 7, 0, 8, 8, 8, 0, 0, 0, 0, 0, 2, 3, 4, 0, 6, 7, 7, 0, 8, 8, 8, 0, 0, 0, 0, 0, 2, 3, 4, 0, 6, 7, 7, 0, 8, 8, 8]);
			var HHContextLabel = new Uint8Array([0, 1, 2, 0, 1, 2, 2, 0, 2, 2, 2, 0, 0, 0, 0, 0, 3, 4, 5, 0, 4, 5, 5, 0, 5, 5, 5, 0, 0, 0, 0, 0, 6, 7, 7, 0, 7, 7, 7, 0, 7, 7, 7, 0, 0, 0, 0, 0, 8, 8, 8, 0, 8, 8, 8, 0, 8, 8, 8, 0, 0, 0, 0, 0, 8, 8, 8, 0, 8, 8, 8, 0, 8, 8, 8]);

			function BitModel(width, height, subband, zeroBitPlanes, mb) {
				this.width = width;
				this.height = height;
				this.contextLabelTable = subband === 'HH' ? HHContextLabel : subband === 'HL' ? HLContextLabel : LLAndLHContextsLabel;
				var coefficientCount = width * height; // coefficients outside the encoding region treated as insignificant
				// add border state cells for significanceState

				this.neighborsSignificance = new Uint8Array(coefficientCount);
				this.coefficentsSign = new Uint8Array(coefficientCount);
				this.coefficentsMagnitude = mb > 14 ? new Uint32Array(coefficientCount) : mb > 6 ? new Uint16Array(coefficientCount) : new Uint8Array(coefficientCount);
				this.processingFlags = new Uint8Array(coefficientCount);
				var bitsDecoded = new Uint8Array(coefficientCount);

				if (zeroBitPlanes !== 0) {
					for (var i = 0; i < coefficientCount; i++) {
						bitsDecoded[i] = zeroBitPlanes;
					}
				}

				this.bitsDecoded = bitsDecoded;
				this.reset();
			}

			BitModel.prototype = {
				setDecoder: function BitModel_setDecoder(decoder) {
					this.decoder = decoder;
				},
				reset: function BitModel_reset() {
					// We have 17 contexts that are accessed via context labels,
					// plus the uniform and runlength context.
					this.contexts = new Int8Array(19); // Contexts are packed into 1 byte:
					// highest 7 bits carry the index, lowest bit carries mps

					this.contexts[0] = 4 << 1 | 0;
					this.contexts[UNIFORM_CONTEXT] = 46 << 1 | 0;
					this.contexts[RUNLENGTH_CONTEXT] = 3 << 1 | 0;
				},
				setNeighborsSignificance: function BitModel_setNeighborsSignificance(row, column, index) {
					var neighborsSignificance = this.neighborsSignificance;
					var width = this.width,
							height = this.height;
					var left = column > 0;
					var right = column + 1 < width;
					var i;

					if (row > 0) {
						i = index - width;

						if (left) {
							neighborsSignificance[i - 1] += 0x10;
						}

						if (right) {
							neighborsSignificance[i + 1] += 0x10;
						}

						neighborsSignificance[i] += 0x04;
					}

					if (row + 1 < height) {
						i = index + width;

						if (left) {
							neighborsSignificance[i - 1] += 0x10;
						}

						if (right) {
							neighborsSignificance[i + 1] += 0x10;
						}

						neighborsSignificance[i] += 0x04;
					}

					if (left) {
						neighborsSignificance[index - 1] += 0x01;
					}

					if (right) {
						neighborsSignificance[index + 1] += 0x01;
					}

					neighborsSignificance[index] |= 0x80;
				},
				runSignificancePropogationPass: function BitModel_runSignificancePropogationPass() {
					var decoder = this.decoder;
					var width = this.width,
							height = this.height;
					var coefficentsMagnitude = this.coefficentsMagnitude;
					var coefficentsSign = this.coefficentsSign;
					var neighborsSignificance = this.neighborsSignificance;
					var processingFlags = this.processingFlags;
					var contexts = this.contexts;
					var labels = this.contextLabelTable;
					var bitsDecoded = this.bitsDecoded;
					var processedInverseMask = ~1;
					var processedMask = 1;
					var firstMagnitudeBitMask = 2;

					for (var i0 = 0; i0 < height; i0 += 4) {
						for (var j = 0; j < width; j++) {
							var index = i0 * width + j;

							for (var i1 = 0; i1 < 4; i1++, index += width) {
								var i = i0 + i1;

								if (i >= height) {
									break;
								} // clear processed flag first


								processingFlags[index] &= processedInverseMask;

								if (coefficentsMagnitude[index] || !neighborsSignificance[index]) {
									continue;
								}

								var contextLabel = labels[neighborsSignificance[index]];
								var decision = decoder.readBit(contexts, contextLabel);

								if (decision) {
									var sign = this.decodeSignBit(i, j, index);
									coefficentsSign[index] = sign;
									coefficentsMagnitude[index] = 1;
									this.setNeighborsSignificance(i, j, index);
									processingFlags[index] |= firstMagnitudeBitMask;
								}

								bitsDecoded[index]++;
								processingFlags[index] |= processedMask;
							}
						}
					}
				},
				decodeSignBit: function BitModel_decodeSignBit(row, column, index) {
					var width = this.width,
							height = this.height;
					var coefficentsMagnitude = this.coefficentsMagnitude;
					var coefficentsSign = this.coefficentsSign;
					var contribution, sign0, sign1, significance1;
					var contextLabel, decoded; // calculate horizontal contribution

					significance1 = column > 0 && coefficentsMagnitude[index - 1] !== 0;

					if (column + 1 < width && coefficentsMagnitude[index + 1] !== 0) {
						sign1 = coefficentsSign[index + 1];

						if (significance1) {
							sign0 = coefficentsSign[index - 1];
							contribution = 1 - sign1 - sign0;
						} else {
							contribution = 1 - sign1 - sign1;
						}
					} else if (significance1) {
						sign0 = coefficentsSign[index - 1];
						contribution = 1 - sign0 - sign0;
					} else {
						contribution = 0;
					}

					var horizontalContribution = 3 * contribution; // calculate vertical contribution and combine with the horizontal

					significance1 = row > 0 && coefficentsMagnitude[index - width] !== 0;

					if (row + 1 < height && coefficentsMagnitude[index + width] !== 0) {
						sign1 = coefficentsSign[index + width];

						if (significance1) {
							sign0 = coefficentsSign[index - width];
							contribution = 1 - sign1 - sign0 + horizontalContribution;
						} else {
							contribution = 1 - sign1 - sign1 + horizontalContribution;
						}
					} else if (significance1) {
						sign0 = coefficentsSign[index - width];
						contribution = 1 - sign0 - sign0 + horizontalContribution;
					} else {
						contribution = horizontalContribution;
					}

					if (contribution >= 0) {
						contextLabel = 9 + contribution;
						decoded = this.decoder.readBit(this.contexts, contextLabel);
					} else {
						contextLabel = 9 - contribution;
						decoded = this.decoder.readBit(this.contexts, contextLabel) ^ 1;
					}

					return decoded;
				},
				runMagnitudeRefinementPass: function BitModel_runMagnitudeRefinementPass() {
					var decoder = this.decoder;
					var width = this.width,
							height = this.height;
					var coefficentsMagnitude = this.coefficentsMagnitude;
					var neighborsSignificance = this.neighborsSignificance;
					var contexts = this.contexts;
					var bitsDecoded = this.bitsDecoded;
					var processingFlags = this.processingFlags;
					var processedMask = 1;
					var firstMagnitudeBitMask = 2;
					var length = width * height;
					var width4 = width * 4;

					for (var index0 = 0, indexNext; index0 < length; index0 = indexNext) {
						indexNext = Math.min(length, index0 + width4);

						for (var j = 0; j < width; j++) {
							for (var index = index0 + j; index < indexNext; index += width) {
								// significant but not those that have just become
								if (!coefficentsMagnitude[index] || (processingFlags[index] & processedMask) !== 0) {
									continue;
								}

								var contextLabel = 16;

								if ((processingFlags[index] & firstMagnitudeBitMask) !== 0) {
									processingFlags[index] ^= firstMagnitudeBitMask; // first refinement

									var significance = neighborsSignificance[index] & 127;
									contextLabel = significance === 0 ? 15 : 14;
								}

								var bit = decoder.readBit(contexts, contextLabel);
								coefficentsMagnitude[index] = coefficentsMagnitude[index] << 1 | bit;
								bitsDecoded[index]++;
								processingFlags[index] |= processedMask;
							}
						}
					}
				},
				runCleanupPass: function BitModel_runCleanupPass() {
					var decoder = this.decoder;
					var width = this.width,
							height = this.height;
					var neighborsSignificance = this.neighborsSignificance;
					var coefficentsMagnitude = this.coefficentsMagnitude;
					var coefficentsSign = this.coefficentsSign;
					var contexts = this.contexts;
					var labels = this.contextLabelTable;
					var bitsDecoded = this.bitsDecoded;
					var processingFlags = this.processingFlags;
					var processedMask = 1;
					var firstMagnitudeBitMask = 2;
					var oneRowDown = width;
					var twoRowsDown = width * 2;
					var threeRowsDown = width * 3;
					var iNext;

					for (var i0 = 0; i0 < height; i0 = iNext) {
						iNext = Math.min(i0 + 4, height);
						var indexBase = i0 * width;
						var checkAllEmpty = i0 + 3 < height;

						for (var j = 0; j < width; j++) {
							var index0 = indexBase + j; // using the property: labels[neighborsSignificance[index]] === 0
							// when neighborsSignificance[index] === 0

							var allEmpty = checkAllEmpty && processingFlags[index0] === 0 && processingFlags[index0 + oneRowDown] === 0 && processingFlags[index0 + twoRowsDown] === 0 && processingFlags[index0 + threeRowsDown] === 0 && neighborsSignificance[index0] === 0 && neighborsSignificance[index0 + oneRowDown] === 0 && neighborsSignificance[index0 + twoRowsDown] === 0 && neighborsSignificance[index0 + threeRowsDown] === 0;
							var i1 = 0,
									index = index0;
							var i = i0,
									sign;

							if (allEmpty) {
								var hasSignificantCoefficent = decoder.readBit(contexts, RUNLENGTH_CONTEXT);

								if (!hasSignificantCoefficent) {
									bitsDecoded[index0]++;
									bitsDecoded[index0 + oneRowDown]++;
									bitsDecoded[index0 + twoRowsDown]++;
									bitsDecoded[index0 + threeRowsDown]++;
									continue; // next column
								}

								i1 = decoder.readBit(contexts, UNIFORM_CONTEXT) << 1 | decoder.readBit(contexts, UNIFORM_CONTEXT);

								if (i1 !== 0) {
									i = i0 + i1;
									index += i1 * width;
								}

								sign = this.decodeSignBit(i, j, index);
								coefficentsSign[index] = sign;
								coefficentsMagnitude[index] = 1;
								this.setNeighborsSignificance(i, j, index);
								processingFlags[index] |= firstMagnitudeBitMask;
								index = index0;

								for (var i2 = i0; i2 <= i; i2++, index += width) {
									bitsDecoded[index]++;
								}

								i1++;
							}

							for (i = i0 + i1; i < iNext; i++, index += width) {
								if (coefficentsMagnitude[index] || (processingFlags[index] & processedMask) !== 0) {
									continue;
								}

								var contextLabel = labels[neighborsSignificance[index]];
								var decision = decoder.readBit(contexts, contextLabel);

								if (decision === 1) {
									sign = this.decodeSignBit(i, j, index);
									coefficentsSign[index] = sign;
									coefficentsMagnitude[index] = 1;
									this.setNeighborsSignificance(i, j, index);
									processingFlags[index] |= firstMagnitudeBitMask;
								}

								bitsDecoded[index]++;
							}
						}
					}
				},
				checkSegmentationSymbol: function BitModel_checkSegmentationSymbol() {
					var decoder = this.decoder;
					var contexts = this.contexts;
					var symbol = decoder.readBit(contexts, UNIFORM_CONTEXT) << 3 | decoder.readBit(contexts, UNIFORM_CONTEXT) << 2 | decoder.readBit(contexts, UNIFORM_CONTEXT) << 1 | decoder.readBit(contexts, UNIFORM_CONTEXT);

					if (symbol !== 0xA) {
						throw new Error('JPX Error: Invalid segmentation symbol');
					}
				}
			};
			return BitModel;
		}(); // Section F, Discrete wavelet transformation


		var Transform = function TransformClosure() {
			function Transform() {}

			Transform.prototype.calculate = function transformCalculate(subbands, u0, v0) {
				var ll = subbands[0];

				for (var i = 1, ii = subbands.length; i < ii; i++) {
					ll = this.iterate(ll, subbands[i], u0, v0);
				}

				return ll;
			};

			Transform.prototype.extend = function extend(buffer, offset, size) {
				// Section F.3.7 extending... using max extension of 4
				var i1 = offset - 1,
						j1 = offset + 1;
				var i2 = offset + size - 2,
						j2 = offset + size;
				buffer[i1--] = buffer[j1++];
				buffer[j2++] = buffer[i2--];
				buffer[i1--] = buffer[j1++];
				buffer[j2++] = buffer[i2--];
				buffer[i1--] = buffer[j1++];
				buffer[j2++] = buffer[i2--];
				buffer[i1] = buffer[j1];
				buffer[j2] = buffer[i2];
			};

			Transform.prototype.iterate = function Transform_iterate(ll, hl_lh_hh, u0, v0) {
				var llWidth = ll.width,
						llHeight = ll.height,
						llItems = ll.items;
				var width = hl_lh_hh.width;
				var height = hl_lh_hh.height;
				var items = hl_lh_hh.items;
				var i, j, k, l, u, v; // Interleave LL according to Section F.3.3

				for (k = 0, i = 0; i < llHeight; i++) {
					l = i * 2 * width;

					for (j = 0; j < llWidth; j++, k++, l += 2) {
						items[l] = llItems[k];
					}
				} // The LL band is not needed anymore.


				llItems = ll.items = null;
				var bufferPadding = 4;
				var rowBuffer = new Float32Array(width + 2 * bufferPadding); // Section F.3.4 HOR_SR

				if (width === 1) {
					// if width = 1, when u0 even keep items as is, when odd divide by 2
					if ((u0 & 1) !== 0) {
						for (v = 0, k = 0; v < height; v++, k += width) {
							items[k] *= 0.5;
						}
					}
				} else {
					for (v = 0, k = 0; v < height; v++, k += width) {
						rowBuffer.set(items.subarray(k, k + width), bufferPadding);
						this.extend(rowBuffer, bufferPadding, width);
						this.filter(rowBuffer, bufferPadding, width);
						items.set(rowBuffer.subarray(bufferPadding, bufferPadding + width), k);
					}
				} // Accesses to the items array can take long, because it may not fit into
				// CPU cache and has to be fetched from main memory. Since subsequent
				// accesses to the items array are not local when reading columns, we
				// have a cache miss every time. To reduce cache misses, get up to
				// 'numBuffers' items at a time and store them into the individual
				// buffers. The colBuffers should be small enough to fit into CPU cache.


				var numBuffers = 16;
				var colBuffers = [];

				for (i = 0; i < numBuffers; i++) {
					colBuffers.push(new Float32Array(height + 2 * bufferPadding));
				}

				var b,
						currentBuffer = 0;
				ll = bufferPadding + height; // Section F.3.5 VER_SR

				if (height === 1) {
					// if height = 1, when v0 even keep items as is, when odd divide by 2
					if ((v0 & 1) !== 0) {
						for (u = 0; u < width; u++) {
							items[u] *= 0.5;
						}
					}
				} else {
					for (u = 0; u < width; u++) {
						// if we ran out of buffers, copy several image columns at once
						if (currentBuffer === 0) {
							numBuffers = Math.min(width - u, numBuffers);

							for (k = u, l = bufferPadding; l < ll; k += width, l++) {
								for (b = 0; b < numBuffers; b++) {
									colBuffers[b][l] = items[k + b];
								}
							}

							currentBuffer = numBuffers;
						}

						currentBuffer--;
						var buffer = colBuffers[currentBuffer];
						this.extend(buffer, bufferPadding, height);
						this.filter(buffer, bufferPadding, height); // If this is last buffer in this group of buffers, flush all buffers.

						if (currentBuffer === 0) {
							k = u - numBuffers + 1;

							for (l = bufferPadding; l < ll; k += width, l++) {
								for (b = 0; b < numBuffers; b++) {
									items[k + b] = colBuffers[b][l];
								}
							}
						}
					}
				}

				return {
					width: width,
					height: height,
					items: items
				};
			};

			return Transform;
		}(); // Section 3.8.2 Irreversible 9-7 filter


		var IrreversibleTransform = function IrreversibleTransformClosure() {
			function IrreversibleTransform() {
				Transform.call(this);
			}

			IrreversibleTransform.prototype = Object.create(Transform.prototype);

			IrreversibleTransform.prototype.filter = function irreversibleTransformFilter(x, offset, length) {
				var len = length >> 1;
				offset = offset | 0;
				var j, n, current, next;
				var alpha = -1.586134342059924;
				var beta = -0.052980118572961;
				var gamma = 0.882911075530934;
				var delta = 0.443506852043971;
				var K = 1.230174104914001;
				var K_ = 1 / K; // step 1 is combined with step 3
				// step 2

				j = offset - 3;

				for (n = len + 4; n--; j += 2) {
					x[j] *= K_;
				} // step 1 & 3


				j = offset - 2;
				current = delta * x[j - 1];

				for (n = len + 3; n--; j += 2) {
					next = delta * x[j + 1];
					x[j] = K * x[j] - current - next;

					if (n--) {
						j += 2;
						current = delta * x[j + 1];
						x[j] = K * x[j] - current - next;
					} else {
						break;
					}
				} // step 4


				j = offset - 1;
				current = gamma * x[j - 1];

				for (n = len + 2; n--; j += 2) {
					next = gamma * x[j + 1];
					x[j] -= current + next;

					if (n--) {
						j += 2;
						current = gamma * x[j + 1];
						x[j] -= current + next;
					} else {
						break;
					}
				} // step 5


				j = offset;
				current = beta * x[j - 1];

				for (n = len + 1; n--; j += 2) {
					next = beta * x[j + 1];
					x[j] -= current + next;

					if (n--) {
						j += 2;
						current = beta * x[j + 1];
						x[j] -= current + next;
					} else {
						break;
					}
				} // step 6


				if (len !== 0) {
					j = offset + 1;
					current = alpha * x[j - 1];

					for (n = len; n--; j += 2) {
						next = alpha * x[j + 1];
						x[j] -= current + next;

						if (n--) {
							j += 2;
							current = alpha * x[j + 1];
							x[j] -= current + next;
						} else {
							break;
						}
					}
				}
			};

			return IrreversibleTransform;
		}(); // Section 3.8.1 Reversible 5-3 filter


		var ReversibleTransform = function ReversibleTransformClosure() {
			function ReversibleTransform() {
				Transform.call(this);
			}

			ReversibleTransform.prototype = Object.create(Transform.prototype);

			ReversibleTransform.prototype.filter = function reversibleTransformFilter(x, offset, length) {
				var len = length >> 1;
				offset = offset | 0;
				var j, n;

				for (j = offset, n = len + 1; n--; j += 2) {
					x[j] -= x[j - 1] + x[j + 1] + 2 >> 2;
				}

				for (j = offset + 1, n = len; n--; j += 2) {
					x[j] += x[j - 1] + x[j + 1] >> 1;
				}
			};

			return ReversibleTransform;
		}();

		return JpxImage;
	}();
	/* This class implements the QM Coder decoding as defined in
	 *	 JPEG 2000 Part I Final Committee Draft Version 1.0
	 *	 Annex C.3 Arithmetic decoding procedure 
	 * available at http://www.jpeg.org/public/fcd15444-1.pdf
	 * 
	 * The arithmetic decoder is used in conjunction with context models to decode
	 * JPEG2000 and JBIG2 streams.
	 */


	var ArithmeticDecoder = function ArithmeticDecoderClosure() {
		// Table C-2
		var QeTable = [{
			qe: 0x5601,
			nmps: 1,
			nlps: 1,
			switchFlag: 1
		}, {
			qe: 0x3401,
			nmps: 2,
			nlps: 6,
			switchFlag: 0
		}, {
			qe: 0x1801,
			nmps: 3,
			nlps: 9,
			switchFlag: 0
		}, {
			qe: 0x0AC1,
			nmps: 4,
			nlps: 12,
			switchFlag: 0
		}, {
			qe: 0x0521,
			nmps: 5,
			nlps: 29,
			switchFlag: 0
		}, {
			qe: 0x0221,
			nmps: 38,
			nlps: 33,
			switchFlag: 0
		}, {
			qe: 0x5601,
			nmps: 7,
			nlps: 6,
			switchFlag: 1
		}, {
			qe: 0x5401,
			nmps: 8,
			nlps: 14,
			switchFlag: 0
		}, {
			qe: 0x4801,
			nmps: 9,
			nlps: 14,
			switchFlag: 0
		}, {
			qe: 0x3801,
			nmps: 10,
			nlps: 14,
			switchFlag: 0
		}, {
			qe: 0x3001,
			nmps: 11,
			nlps: 17,
			switchFlag: 0
		}, {
			qe: 0x2401,
			nmps: 12,
			nlps: 18,
			switchFlag: 0
		}, {
			qe: 0x1C01,
			nmps: 13,
			nlps: 20,
			switchFlag: 0
		}, {
			qe: 0x1601,
			nmps: 29,
			nlps: 21,
			switchFlag: 0
		}, {
			qe: 0x5601,
			nmps: 15,
			nlps: 14,
			switchFlag: 1
		}, {
			qe: 0x5401,
			nmps: 16,
			nlps: 14,
			switchFlag: 0
		}, {
			qe: 0x5101,
			nmps: 17,
			nlps: 15,
			switchFlag: 0
		}, {
			qe: 0x4801,
			nmps: 18,
			nlps: 16,
			switchFlag: 0
		}, {
			qe: 0x3801,
			nmps: 19,
			nlps: 17,
			switchFlag: 0
		}, {
			qe: 0x3401,
			nmps: 20,
			nlps: 18,
			switchFlag: 0
		}, {
			qe: 0x3001,
			nmps: 21,
			nlps: 19,
			switchFlag: 0
		}, {
			qe: 0x2801,
			nmps: 22,
			nlps: 19,
			switchFlag: 0
		}, {
			qe: 0x2401,
			nmps: 23,
			nlps: 20,
			switchFlag: 0
		}, {
			qe: 0x2201,
			nmps: 24,
			nlps: 21,
			switchFlag: 0
		}, {
			qe: 0x1C01,
			nmps: 25,
			nlps: 22,
			switchFlag: 0
		}, {
			qe: 0x1801,
			nmps: 26,
			nlps: 23,
			switchFlag: 0
		}, {
			qe: 0x1601,
			nmps: 27,
			nlps: 24,
			switchFlag: 0
		}, {
			qe: 0x1401,
			nmps: 28,
			nlps: 25,
			switchFlag: 0
		}, {
			qe: 0x1201,
			nmps: 29,
			nlps: 26,
			switchFlag: 0
		}, {
			qe: 0x1101,
			nmps: 30,
			nlps: 27,
			switchFlag: 0
		}, {
			qe: 0x0AC1,
			nmps: 31,
			nlps: 28,
			switchFlag: 0
		}, {
			qe: 0x09C1,
			nmps: 32,
			nlps: 29,
			switchFlag: 0
		}, {
			qe: 0x08A1,
			nmps: 33,
			nlps: 30,
			switchFlag: 0
		}, {
			qe: 0x0521,
			nmps: 34,
			nlps: 31,
			switchFlag: 0
		}, {
			qe: 0x0441,
			nmps: 35,
			nlps: 32,
			switchFlag: 0
		}, {
			qe: 0x02A1,
			nmps: 36,
			nlps: 33,
			switchFlag: 0
		}, {
			qe: 0x0221,
			nmps: 37,
			nlps: 34,
			switchFlag: 0
		}, {
			qe: 0x0141,
			nmps: 38,
			nlps: 35,
			switchFlag: 0
		}, {
			qe: 0x0111,
			nmps: 39,
			nlps: 36,
			switchFlag: 0
		}, {
			qe: 0x0085,
			nmps: 40,
			nlps: 37,
			switchFlag: 0
		}, {
			qe: 0x0049,
			nmps: 41,
			nlps: 38,
			switchFlag: 0
		}, {
			qe: 0x0025,
			nmps: 42,
			nlps: 39,
			switchFlag: 0
		}, {
			qe: 0x0015,
			nmps: 43,
			nlps: 40,
			switchFlag: 0
		}, {
			qe: 0x0009,
			nmps: 44,
			nlps: 41,
			switchFlag: 0
		}, {
			qe: 0x0005,
			nmps: 45,
			nlps: 42,
			switchFlag: 0
		}, {
			qe: 0x0001,
			nmps: 45,
			nlps: 43,
			switchFlag: 0
		}, {
			qe: 0x5601,
			nmps: 46,
			nlps: 46,
			switchFlag: 0
		}]; // C.3.5 Initialisation of the decoder (INITDEC)

		function ArithmeticDecoder(data, start, end) {
			this.data = data;
			this.bp = start;
			this.dataEnd = end;
			this.chigh = data[start];
			this.clow = 0;
			this.byteIn();
			this.chigh = this.chigh << 7 & 0xFFFF | this.clow >> 9 & 0x7F;
			this.clow = this.clow << 7 & 0xFFFF;
			this.ct -= 7;
			this.a = 0x8000;
		}

		ArithmeticDecoder.prototype = {
			// C.3.4 Compressed data input (BYTEIN)
			byteIn: function ArithmeticDecoder_byteIn() {
				var data = this.data;
				var bp = this.bp;

				if (data[bp] === 0xFF) {
					var b1 = data[bp + 1];

					if (b1 > 0x8F) {
						this.clow += 0xFF00;
						this.ct = 8;
					} else {
						bp++;
						this.clow += data[bp] << 9;
						this.ct = 7;
						this.bp = bp;
					}
				} else {
					bp++;
					this.clow += bp < this.dataEnd ? data[bp] << 8 : 0xFF00;
					this.ct = 8;
					this.bp = bp;
				}

				if (this.clow > 0xFFFF) {
					this.chigh += this.clow >> 16;
					this.clow &= 0xFFFF;
				}
			},
			// C.3.2 Decoding a decision (DECODE)
			readBit: function ArithmeticDecoder_readBit(contexts, pos) {
				// contexts are packed into 1 byte:
				// highest 7 bits carry cx.index, lowest bit carries cx.mps
				var cx_index = contexts[pos] >> 1,
						cx_mps = contexts[pos] & 1;
				var qeTableIcx = QeTable[cx_index];
				var qeIcx = qeTableIcx.qe;
				var d;
				var a = this.a - qeIcx;

				if (this.chigh < qeIcx) {
					// exchangeLps
					if (a < qeIcx) {
						a = qeIcx;
						d = cx_mps;
						cx_index = qeTableIcx.nmps;
					} else {
						a = qeIcx;
						d = 1 ^ cx_mps;

						if (qeTableIcx.switchFlag === 1) {
							cx_mps = d;
						}

						cx_index = qeTableIcx.nlps;
					}
				} else {
					this.chigh -= qeIcx;

					if ((a & 0x8000) !== 0) {
						this.a = a;
						return cx_mps;
					} // exchangeMps


					if (a < qeIcx) {
						d = 1 ^ cx_mps;

						if (qeTableIcx.switchFlag === 1) {
							cx_mps = d;
						}

						cx_index = qeTableIcx.nlps;
					} else {
						d = cx_mps;
						cx_index = qeTableIcx.nmps;
					}
				} // C.3.3 renormD;


				do {
					if (this.ct === 0) {
						this.byteIn();
					}

					a <<= 1;
					this.chigh = this.chigh << 1 & 0xFFFF | this.clow >> 15 & 1;
					this.clow = this.clow << 1 & 0xFFFF;
					this.ct--;
				} while ((a & 0x8000) === 0);

				this.a = a;
				contexts[pos] = cx_index << 1 | cx_mps;
				return d;
			}
		};
		return ArithmeticDecoder;
	}();

	var isWorker = typeof window === 'undefined';
	var globalScope = isWorker ? undefined : window;
	// In production, it will be declared outside a global wrapper
	// In development, it will be declared here

	if (!globalScope.PDFJS) {
		globalScope.PDFJS = {};
	}

	globalScope.PDFJS.pdfBug = false;
	PDFJS.VERBOSITY_LEVELS = {
		errors: 0,
		warnings: 1,
		infos: 5
	}; // All the possible operations for an operator list.

	PDFJS.OPS = {
		// Intentionally start from 1 so it is easy to spot bad operators that will be
		// 0's.
		dependency: 1,
		setLineWidth: 2,
		setLineCap: 3,
		setLineJoin: 4,
		setMiterLimit: 5,
		setDash: 6,
		setRenderingIntent: 7,
		setFlatness: 8,
		setGState: 9,
		save: 10,
		restore: 11,
		transform: 12,
		moveTo: 13,
		lineTo: 14,
		curveTo: 15,
		curveTo2: 16,
		curveTo3: 17,
		closePath: 18,
		rectangle: 19,
		stroke: 20,
		closeStroke: 21,
		fill: 22,
		eoFill: 23,
		fillStroke: 24,
		eoFillStroke: 25,
		closeFillStroke: 26,
		closeEOFillStroke: 27,
		endPath: 28,
		clip: 29,
		eoClip: 30,
		beginText: 31,
		endText: 32,
		setCharSpacing: 33,
		setWordSpacing: 34,
		setHScale: 35,
		setLeading: 36,
		setFont: 37,
		setTextRenderingMode: 38,
		setTextRise: 39,
		moveText: 40,
		setLeadingMoveText: 41,
		setTextMatrix: 42,
		nextLine: 43,
		showText: 44,
		showSpacedText: 45,
		nextLineShowText: 46,
		nextLineSetSpacingShowText: 47,
		setCharWidth: 48,
		setCharWidthAndBounds: 49,
		setStrokeColorSpace: 50,
		setFillColorSpace: 51,
		setStrokeColor: 52,
		setStrokeColorN: 53,
		setFillColor: 54,
		setFillColorN: 55,
		setStrokeGray: 56,
		setFillGray: 57,
		setStrokeRGBColor: 58,
		setFillRGBColor: 59,
		setStrokeCMYKColor: 60,
		setFillCMYKColor: 61,
		shadingFill: 62,
		beginInlineImage: 63,
		beginImageData: 64,
		endInlineImage: 65,
		paintXObject: 66,
		markPoint: 67,
		markPointProps: 68,
		beginMarkedContent: 69,
		beginMarkedContentProps: 70,
		endMarkedContent: 71,
		beginCompat: 72,
		endCompat: 73,
		paintFormXObjectBegin: 74,
		paintFormXObjectEnd: 75,
		beginGroup: 76,
		endGroup: 77,
		beginAnnotations: 78,
		endAnnotations: 79,
		beginAnnotation: 80,
		endAnnotation: 81,
		paintJpegXObject: 82,
		paintImageMaskXObject: 83,
		paintImageMaskXObjectGroup: 84,
		paintImageXObject: 85,
		paintInlineImageXObject: 86,
		paintInlineImageXObjectGroup: 87,
		paintImageXObjectRepeat: 88,
		paintImageMaskXObjectRepeat: 89,
		paintSolidColorImageMask: 90,
		constructPath: 91
	}; // A notice for devs. These are good for things that are helpful to devs, such
	// as warning that Workers were disabled, which is important to devs but not
	// end users.

	function info(msg) {
		if (PDFJS.verbosity >= PDFJS.VERBOSITY_LEVELS.infos) {
			console.log('Info: ' + msg);
		}
	} // Non-fatal warnings.


	function warn(msg) {
		if (PDFJS.verbosity >= PDFJS.VERBOSITY_LEVELS.warnings) {
			console.log('Warning: ' + msg);
		}
	} // Fatal errors that should trigger the fallback UI and halt execution by

	PDFJS.UNSUPPORTED_FEATURES = {
		unknown: 'unknown',
		forms: 'forms',
		javaScript: 'javaScript',
		smask: 'smask',
		shadingPattern: 'shadingPattern',
		font: 'font'
	};

	PDFJS.UnsupportedManager = function UnsupportedManagerClosure() {
		var listeners = [];
		return {
			listen: function (cb) {
				listeners.push(cb);
			},
			notify: function (featureId) {
				warn('Unsupported feature "' + featureId + '"');

				for (var i = 0, ii = listeners.length; i < ii; i++) {
					listeners[i](featureId);
				}
			}
		};
	}(); // Combines two URLs. The baseUrl shall be absolute URL. If the url is an


	function isValidUrl(url, allowRelative) {
		if (!url) {
			return false;
		} // RFC 3986 (http://tools.ietf.org/html/rfc3986#section-3.1)
		// scheme = ALPHA *( ALPHA / DIGIT / "+" / "-" / "." )


		var protocol = /^[a-z][a-z0-9+\-.]*(?=:)/i.exec(url);

		if (!protocol) {
			return allowRelative;
		}

		protocol = protocol[0].toLowerCase();

		switch (protocol) {
			case 'http':
			case 'https':
			case 'ftp':
			case 'mailto':
			case 'tel':
				return true;

			default:
				return false;
		}
	}

	PDFJS.isValidUrl = isValidUrl;

	function shadow(obj, prop, value) {
		Object.defineProperty(obj, prop, {
			value: value,
			enumerable: true,
			configurable: true,
			writable: false
		});
		return value;
	}

	PDFJS.shadow = shadow;
	PDFJS.PasswordResponses = {
		NEED_PASSWORD: 1,
		INCORRECT_PASSWORD: 2
	};

	var PasswordException = function PasswordExceptionClosure() {
		function PasswordException(msg, code) {
			this.name = 'PasswordException';
			this.message = msg;
			this.code = code;
		}

		PasswordException.prototype = new Error();
		PasswordException.constructor = PasswordException;
		return PasswordException;
	}();

	PDFJS.PasswordException = PasswordException;

	var UnknownErrorException = function UnknownErrorExceptionClosure() {
		function UnknownErrorException(msg, details) {
			this.name = 'UnknownErrorException';
			this.message = msg;
			this.details = details;
		}

		UnknownErrorException.prototype = new Error();
		UnknownErrorException.constructor = UnknownErrorException;
		return UnknownErrorException;
	}();

	PDFJS.UnknownErrorException = UnknownErrorException;

	var InvalidPDFException = function InvalidPDFExceptionClosure() {
		function InvalidPDFException(msg) {
			this.name = 'InvalidPDFException';
			this.message = msg;
		}

		InvalidPDFException.prototype = new Error();
		InvalidPDFException.constructor = InvalidPDFException;
		return InvalidPDFException;
	}();

	PDFJS.InvalidPDFException = InvalidPDFException;

	var MissingPDFException = function MissingPDFExceptionClosure() {
		function MissingPDFException(msg) {
			this.name = 'MissingPDFException';
			this.message = msg;
		}

		MissingPDFException.prototype = new Error();
		MissingPDFException.constructor = MissingPDFException;
		return MissingPDFException;
	}();

	PDFJS.MissingPDFException = MissingPDFException;

	var UnexpectedResponseException = function UnexpectedResponseExceptionClosure() {
		function UnexpectedResponseException(msg, status) {
			this.name = 'UnexpectedResponseException';
			this.message = msg;
			this.status = status;
		}

		UnexpectedResponseException.prototype = new Error();
		UnexpectedResponseException.constructor = UnexpectedResponseException;
		return UnexpectedResponseException;
	}();

	PDFJS.UnexpectedResponseException = UnexpectedResponseException;

	(function NotImplementedExceptionClosure() {
		function NotImplementedException(msg) {
			this.message = msg;
		}

		NotImplementedException.prototype = new Error();
		NotImplementedException.prototype.name = 'NotImplementedException';
		NotImplementedException.constructor = NotImplementedException;
		return NotImplementedException;
	})();

	(function MissingDataExceptionClosure() {
		function MissingDataException(begin, end) {
			this.begin = begin;
			this.end = end;
			this.message = 'Missing data [' + begin + ', ' + end + ')';
		}

		MissingDataException.prototype = new Error();
		MissingDataException.prototype.name = 'MissingDataException';
		MissingDataException.constructor = MissingDataException;
		return MissingDataException;
	})();

	(function XRefParseExceptionClosure() {
		function XRefParseException(msg) {
			this.message = msg;
		}

		XRefParseException.prototype = new Error();
		XRefParseException.prototype.name = 'XRefParseException';
		XRefParseException.constructor = XRefParseException;
		return XRefParseException;
	})();

	function log2(x) {
		var n = 1,
				i = 0;

		while (x > n) {
			n <<= 1;
			i++;
		}

		return i;
	}

	function readUint16(data, offset) {
		return data[offset] << 8 | data[offset + 1];
	}

	function readUint32(data, offset) {
		return (data[offset] << 24 | data[offset + 1] << 16 | data[offset + 2] << 8 | data[offset + 3]) >>> 0;
	} // Lazy test the endianness of the platform
	// NOTE: This will be 'true' for simulated TypedArrays


	function isLittleEndian() {
		var buffer8 = new Uint8Array(2);
		buffer8[0] = 1;
		var buffer16 = new Uint16Array(buffer8.buffer);
		return buffer16[0] === 1;
	}

	Object.defineProperty(PDFJS, 'isLittleEndian', {
		configurable: true,
		get: function PDFJS_isLittleEndian() {
			return shadow(PDFJS, 'isLittleEndian', isLittleEndian());
		}
	}); //#if !(FIREFOX || MOZCENTRAL || B2G || CHROME)
	//// Lazy test if the userAgant support CanvasTypedArrays

	function hasCanvasTypedArrays() {
		var canvas = document.createElement('canvas');
		canvas.width = canvas.height = 1;
		var ctx = canvas.getContext('2d');
		var imageData = ctx.createImageData(1, 1);
		return typeof imageData.data.buffer !== 'undefined';
	}

	Object.defineProperty(PDFJS, 'hasCanvasTypedArrays', {
		configurable: true,
		get: function PDFJS_hasCanvasTypedArrays() {
			return shadow(PDFJS, 'hasCanvasTypedArrays', hasCanvasTypedArrays());
		}
	});

	var Util = PDFJS.Util = function UtilClosure() {
		function Util() {}

		var rgbBuf = ['rgb(', 0, ',', 0, ',', 0, ')']; // makeCssRgb() can be called thousands of times. Using |rgbBuf| avoids
		// creating many intermediate strings.

		Util.makeCssRgb = function Util_makeCssRgb(r, g, b) {
			rgbBuf[1] = r;
			rgbBuf[3] = g;
			rgbBuf[5] = b;
			return rgbBuf.join('');
		}; // Concatenates two transformation matrices together and returns the result.


		Util.transform = function Util_transform(m1, m2) {
			return [m1[0] * m2[0] + m1[2] * m2[1], m1[1] * m2[0] + m1[3] * m2[1], m1[0] * m2[2] + m1[2] * m2[3], m1[1] * m2[2] + m1[3] * m2[3], m1[0] * m2[4] + m1[2] * m2[5] + m1[4], m1[1] * m2[4] + m1[3] * m2[5] + m1[5]];
		}; // For 2d affine transforms


		Util.applyTransform = function Util_applyTransform(p, m) {
			var xt = p[0] * m[0] + p[1] * m[2] + m[4];
			var yt = p[0] * m[1] + p[1] * m[3] + m[5];
			return [xt, yt];
		};

		Util.applyInverseTransform = function Util_applyInverseTransform(p, m) {
			var d = m[0] * m[3] - m[1] * m[2];
			var xt = (p[0] * m[3] - p[1] * m[2] + m[2] * m[5] - m[4] * m[3]) / d;
			var yt = (-p[0] * m[1] + p[1] * m[0] + m[4] * m[1] - m[5] * m[0]) / d;
			return [xt, yt];
		}; // Applies the transform to the rectangle and finds the minimum axially
		// aligned bounding box.


		Util.getAxialAlignedBoundingBox = function Util_getAxialAlignedBoundingBox(r, m) {
			var p1 = Util.applyTransform(r, m);
			var p2 = Util.applyTransform(r.slice(2, 4), m);
			var p3 = Util.applyTransform([r[0], r[3]], m);
			var p4 = Util.applyTransform([r[2], r[1]], m);
			return [Math.min(p1[0], p2[0], p3[0], p4[0]), Math.min(p1[1], p2[1], p3[1], p4[1]), Math.max(p1[0], p2[0], p3[0], p4[0]), Math.max(p1[1], p2[1], p3[1], p4[1])];
		};

		Util.inverseTransform = function Util_inverseTransform(m) {
			var d = m[0] * m[3] - m[1] * m[2];
			return [m[3] / d, -m[1] / d, -m[2] / d, m[0] / d, (m[2] * m[5] - m[4] * m[3]) / d, (m[4] * m[1] - m[5] * m[0]) / d];
		}; // Apply a generic 3d matrix M on a 3-vector v:
		//	 | a b c |	 | X |
		//	 | d e f | x | Y |
		//	 | g h i |	 | Z |
		// M is assumed to be serialized as [a,b,c,d,e,f,g,h,i],
		// with v as [X,Y,Z]


		Util.apply3dTransform = function Util_apply3dTransform(m, v) {
			return [m[0] * v[0] + m[1] * v[1] + m[2] * v[2], m[3] * v[0] + m[4] * v[1] + m[5] * v[2], m[6] * v[0] + m[7] * v[1] + m[8] * v[2]];
		}; // This calculation uses Singular Value Decomposition.
		// The SVD can be represented with formula A = USV. We are interested in the
		// matrix S here because it represents the scale values.


		Util.singularValueDecompose2dScale = function Util_singularValueDecompose2dScale(m) {
			var transpose = [m[0], m[2], m[1], m[3]]; // Multiply matrix m with its transpose.

			var a = m[0] * transpose[0] + m[1] * transpose[2];
			var b = m[0] * transpose[1] + m[1] * transpose[3];
			var c = m[2] * transpose[0] + m[3] * transpose[2];
			var d = m[2] * transpose[1] + m[3] * transpose[3]; // Solve the second degree polynomial to get roots.

			var first = (a + d) / 2;
			var second = Math.sqrt((a + d) * (a + d) - 4 * (a * d - c * b)) / 2;
			var sx = first + second || 1;
			var sy = first - second || 1; // Scale values are the square roots of the eigenvalues.

			return [Math.sqrt(sx), Math.sqrt(sy)];
		}; // Normalize rectangle rect=[x1, y1, x2, y2] so that (x1,y1) < (x2,y2)
		// For coordinate systems whose origin lies in the bottom-left, this
		// means normalization to (BL,TR) ordering. For systems with origin in the
		// top-left, this means (TL,BR) ordering.


		Util.normalizeRect = function Util_normalizeRect(rect) {
			var r = rect.slice(0); // clone rect

			if (rect[0] > rect[2]) {
				r[0] = rect[2];
				r[2] = rect[0];
			}

			if (rect[1] > rect[3]) {
				r[1] = rect[3];
				r[3] = rect[1];
			}

			return r;
		}; // Returns a rectangle [x1, y1, x2, y2] corresponding to the
		// intersection of rect1 and rect2. If no intersection, returns 'false'
		// The rectangle coordinates of rect1, rect2 should be [x1, y1, x2, y2]


		Util.intersect = function Util_intersect(rect1, rect2) {
			function compare(a, b) {
				return a - b;
			} // Order points along the axes


			var orderedX = [rect1[0], rect1[2], rect2[0], rect2[2]].sort(compare),
					orderedY = [rect1[1], rect1[3], rect2[1], rect2[3]].sort(compare),
					result = [];
			rect1 = Util.normalizeRect(rect1);
			rect2 = Util.normalizeRect(rect2); // X: first and second points belong to different rectangles?

			if (orderedX[0] === rect1[0] && orderedX[1] === rect2[0] || orderedX[0] === rect2[0] && orderedX[1] === rect1[0]) {
				// Intersection must be between second and third points
				result[0] = orderedX[1];
				result[2] = orderedX[2];
			} else {
				return false;
			} // Y: first and second points belong to different rectangles?


			if (orderedY[0] === rect1[1] && orderedY[1] === rect2[1] || orderedY[0] === rect2[1] && orderedY[1] === rect1[1]) {
				// Intersection must be between second and third points
				result[1] = orderedY[1];
				result[3] = orderedY[2];
			} else {
				return false;
			}

			return result;
		};

		Util.sign = function Util_sign(num) {
			return num < 0 ? -1 : 1;
		};

		Util.appendToArray = function Util_appendToArray(arr1, arr2) {
			Array.prototype.push.apply(arr1, arr2);
		};

		Util.prependToArray = function Util_prependToArray(arr1, arr2) {
			Array.prototype.unshift.apply(arr1, arr2);
		};

		Util.extendObj = function extendObj(obj1, obj2) {
			for (var key in obj2) {
				obj1[key] = obj2[key];
			}
		};

		Util.getInheritableProperty = function Util_getInheritableProperty(dict, name) {
			while (dict && !dict.has(name)) {
				dict = dict.get('Parent');
			}

			if (!dict) {
				return null;
			}

			return dict.get(name);
		};

		Util.inherit = function Util_inherit(sub, base, prototype) {
			sub.prototype = Object.create(base.prototype);
			sub.prototype.constructor = sub;

			for (var prop in prototype) {
				sub.prototype[prop] = prototype[prop];
			}
		};

		Util.loadScript = function Util_loadScript(src, callback) {
			var script = document.createElement('script');
			var loaded = false;
			script.setAttribute('src', src);

			if (callback) {
				script.onload = function () {
					if (!loaded) {
						callback();
					}

					loaded = true;
				};
			}

			document.getElementsByTagName('head')[0].appendChild(script);
		};

		return Util;
	}();
	/**
	 * PDF page viewport created based on scale, rotation and offset.
	 * @class
	 * @alias PDFJS.PageViewport
	 */


	PDFJS.PageViewport = function PageViewportClosure() {
		/**
		 * @constructor
		 * @private
		 * @param viewBox {Array} xMin, yMin, xMax and yMax coordinates.
		 * @param scale {number} scale of the viewport.
		 * @param rotation {number} rotations of the viewport in degrees.
		 * @param offsetX {number} offset X
		 * @param offsetY {number} offset Y
		 * @param dontFlip {boolean} if true, axis Y will not be flipped.
		 */
		function PageViewport(viewBox, scale, rotation, offsetX, offsetY, dontFlip) {
			this.viewBox = viewBox;
			this.scale = scale;
			this.rotation = rotation;
			this.offsetX = offsetX;
			this.offsetY = offsetY; // creating transform to convert pdf coordinate system to the normal
			// canvas like coordinates taking in account scale and rotation

			var centerX = (viewBox[2] + viewBox[0]) / 2;
			var centerY = (viewBox[3] + viewBox[1]) / 2;
			var rotateA, rotateB, rotateC, rotateD;
			rotation = rotation % 360;
			rotation = rotation < 0 ? rotation + 360 : rotation;

			switch (rotation) {
				case 180:
					rotateA = -1;
					rotateB = 0;
					rotateC = 0;
					rotateD = 1;
					break;

				case 90:
					rotateA = 0;
					rotateB = 1;
					rotateC = 1;
					rotateD = 0;
					break;

				case 270:
					rotateA = 0;
					rotateB = -1;
					rotateC = -1;
					rotateD = 0;
					break;
				//case 0:

				default:
					rotateA = 1;
					rotateB = 0;
					rotateC = 0;
					rotateD = -1;
					break;
			}

			if (dontFlip) {
				rotateC = -rotateC;
				rotateD = -rotateD;
			}

			var offsetCanvasX, offsetCanvasY;
			var width, height;

			if (rotateA === 0) {
				offsetCanvasX = Math.abs(centerY - viewBox[1]) * scale + offsetX;
				offsetCanvasY = Math.abs(centerX - viewBox[0]) * scale + offsetY;
				width = Math.abs(viewBox[3] - viewBox[1]) * scale;
				height = Math.abs(viewBox[2] - viewBox[0]) * scale;
			} else {
				offsetCanvasX = Math.abs(centerX - viewBox[0]) * scale + offsetX;
				offsetCanvasY = Math.abs(centerY - viewBox[1]) * scale + offsetY;
				width = Math.abs(viewBox[2] - viewBox[0]) * scale;
				height = Math.abs(viewBox[3] - viewBox[1]) * scale;
			} // creating transform for the following operations:
			// translate(-centerX, -centerY), rotate and flip vertically,
			// scale, and translate(offsetCanvasX, offsetCanvasY)


			this.transform = [rotateA * scale, rotateB * scale, rotateC * scale, rotateD * scale, offsetCanvasX - rotateA * scale * centerX - rotateC * scale * centerY, offsetCanvasY - rotateB * scale * centerX - rotateD * scale * centerY];
			this.width = width;
			this.height = height;
			this.fontScale = scale;
		}

		PageViewport.prototype =
		/** @lends PDFJS.PageViewport.prototype */
		{
			/**
			 * Clones viewport with additional properties.
			 * @param args {Object} (optional) If specified, may contain the 'scale' or
			 * 'rotation' properties to override the corresponding properties in
			 * the cloned viewport.
			 * @returns {PDFJS.PageViewport} Cloned viewport.
			 */
			clone: function PageViewPort_clone(args) {
				args = args || {};
				var scale = 'scale' in args ? args.scale : this.scale;
				var rotation = 'rotation' in args ? args.rotation : this.rotation;
				return new PageViewport(this.viewBox.slice(), scale, rotation, this.offsetX, this.offsetY, args.dontFlip);
			},

			/**
			 * Converts PDF point to the viewport coordinates. For examples, useful for
			 * converting PDF location into canvas pixel coordinates.
			 * @param x {number} X coordinate.
			 * @param y {number} Y coordinate.
			 * @returns {Object} Object that contains 'x' and 'y' properties of the
			 * point in the viewport coordinate space.
			 * @see {@link convertToPdfPoint}
			 * @see {@link convertToViewportRectangle}
			 */
			convertToViewportPoint: function PageViewport_convertToViewportPoint(x, y) {
				return Util.applyTransform([x, y], this.transform);
			},

			/**
			 * Converts PDF rectangle to the viewport coordinates.
			 * @param rect {Array} xMin, yMin, xMax and yMax coordinates.
			 * @returns {Array} Contains corresponding coordinates of the rectangle
			 * in the viewport coordinate space.
			 * @see {@link convertToViewportPoint}
			 */
			convertToViewportRectangle: function PageViewport_convertToViewportRectangle(rect) {
				var tl = Util.applyTransform([rect[0], rect[1]], this.transform);
				var br = Util.applyTransform([rect[2], rect[3]], this.transform);
				return [tl[0], tl[1], br[0], br[1]];
			},

			/**
			 * Converts viewport coordinates to the PDF location. For examples, useful
			 * for converting canvas pixel location into PDF one.
			 * @param x {number} X coordinate.
			 * @param y {number} Y coordinate.
			 * @returns {Object} Object that contains 'x' and 'y' properties of the
			 * point in the PDF coordinate space.
			 * @see {@link convertToViewportPoint}
			 */
			convertToPdfPoint: function PageViewport_convertToPdfPoint(x, y) {
				return Util.applyInverseTransform([x, y], this.transform);
			}
		};
		return PageViewport;
	}();
	/**
	 * Promise Capability object.
	 *
	 * @typedef {Object} PromiseCapability
	 * @property {Promise} promise - A promise object.
	 * @property {function} resolve - Fullfills the promise.
	 * @property {function} reject - Rejects the promise.
	 */

	/**
	 * Creates a promise capability object.
	 * @alias PDFJS.createPromiseCapability
	 *
	 * @return {PromiseCapability} A capability object contains:
	 * - a Promise, resolve and reject methods.
	 */


	function createPromiseCapability() {
		var capability = {};
		capability.promise = new Promise(function (resolve, reject) {
			capability.resolve = resolve;
			capability.reject = reject;
		});
		return capability;
	}

	PDFJS.createPromiseCapability = createPromiseCapability;
	/**
	 * Polyfill for Promises:
	 * The following promise implementation tries to generally implement the
	 * Promise/A+ spec. Some notable differences from other promise libaries are:
	 * - There currently isn't a seperate deferred and promise object.
	 * - Unhandled rejections eventually show an error if they aren't handled.
	 *
	 * Based off of the work in:
	 * https://bugzilla.mozilla.org/show_bug.cgi?id=810490
	 */

	(function PromiseClosure() {
		if (globalScope.Promise) {
			// Promises existing in the DOM/Worker, checking presence of all/resolve
			if (typeof globalScope.Promise.all !== 'function') {
				globalScope.Promise.all = function (iterable) {
					var count = 0,
							results = [],
							resolve,
							reject;
					var promise = new globalScope.Promise(function (resolve_, reject_) {
						resolve = resolve_;
						reject = reject_;
					});
					iterable.forEach(function (p, i) {
						count++;
						p.then(function (result) {
							results[i] = result;
							count--;

							if (count === 0) {
								resolve(results);
							}
						}, reject);
					});

					if (count === 0) {
						resolve(results);
					}

					return promise;
				};
			}

			if (typeof globalScope.Promise.resolve !== 'function') {
				globalScope.Promise.resolve = function (value) {
					return new globalScope.Promise(function (resolve) {
						resolve(value);
					});
				};
			}

			if (typeof globalScope.Promise.reject !== 'function') {
				globalScope.Promise.reject = function (reason) {
					return new globalScope.Promise(function (resolve, reject) {
						reject(reason);
					});
				};
			}

			if (typeof globalScope.Promise.prototype.catch !== 'function') {
				globalScope.Promise.prototype.catch = function (onReject) {
					return globalScope.Promise.prototype.then(undefined, onReject);
				};
			}

			return;
		} //#if !MOZCENTRAL


		var STATUS_PENDING = 0;
		var STATUS_RESOLVED = 1;
		var STATUS_REJECTED = 2; // In an attempt to avoid silent exceptions, unhandled rejections are
		// tracked and if they aren't handled in a certain amount of time an
		// error is logged.

		var REJECTION_TIMEOUT = 500;
		var HandlerManager = {
			handlers: [],
			running: false,
			unhandledRejections: [],
			pendingRejectionCheck: false,
			scheduleHandlers: function scheduleHandlers(promise) {
				if (promise._status === STATUS_PENDING) {
					return;
				}

				this.handlers = this.handlers.concat(promise._handlers);
				promise._handlers = [];

				if (this.running) {
					return;
				}

				this.running = true;
				setTimeout(this.runHandlers.bind(this), 0);
			},
			runHandlers: function runHandlers() {
				var RUN_TIMEOUT = 1; // ms

				var timeoutAt = Date.now() + RUN_TIMEOUT;

				while (this.handlers.length > 0) {
					var handler = this.handlers.shift();
					var nextStatus = handler.thisPromise._status;
					var nextValue = handler.thisPromise._value;

					try {
						if (nextStatus === STATUS_RESOLVED) {
							if (typeof handler.onResolve === 'function') {
								nextValue = handler.onResolve(nextValue);
							}
						} else if (typeof handler.onReject === 'function') {
							nextValue = handler.onReject(nextValue);
							nextStatus = STATUS_RESOLVED;

							if (handler.thisPromise._unhandledRejection) {
								this.removeUnhandeledRejection(handler.thisPromise);
							}
						}
					} catch (ex) {
						nextStatus = STATUS_REJECTED;
						nextValue = ex;
					}

					handler.nextPromise._updateStatus(nextStatus, nextValue);

					if (Date.now() >= timeoutAt) {
						break;
					}
				}

				if (this.handlers.length > 0) {
					setTimeout(this.runHandlers.bind(this), 0);
					return;
				}

				this.running = false;
			},
			addUnhandledRejection: function addUnhandledRejection(promise) {
				this.unhandledRejections.push({
					promise: promise,
					time: Date.now()
				});
				this.scheduleRejectionCheck();
			},
			removeUnhandeledRejection: function removeUnhandeledRejection(promise) {
				promise._unhandledRejection = false;

				for (var i = 0; i < this.unhandledRejections.length; i++) {
					if (this.unhandledRejections[i].promise === promise) {
						this.unhandledRejections.splice(i);
						i--;
					}
				}
			},
			scheduleRejectionCheck: function scheduleRejectionCheck() {
				if (this.pendingRejectionCheck) {
					return;
				}

				this.pendingRejectionCheck = true;
				setTimeout(function rejectionCheck() {
					this.pendingRejectionCheck = false;
					var now = Date.now();

					for (var i = 0; i < this.unhandledRejections.length; i++) {
						if (now - this.unhandledRejections[i].time > REJECTION_TIMEOUT) {
							var unhandled = this.unhandledRejections[i].promise._value;
							var msg = 'Unhandled rejection: ' + unhandled;

							if (unhandled.stack) {
								msg += '\n' + unhandled.stack;
							}

							warn(msg);
							this.unhandledRejections.splice(i);
							i--;
						}
					}

					if (this.unhandledRejections.length) {
						this.scheduleRejectionCheck();
					}
				}.bind(this), REJECTION_TIMEOUT);
			}
		};

		function Promise(resolver) {
			this._status = STATUS_PENDING;
			this._handlers = [];

			try {
				resolver.call(this, this._resolve.bind(this), this._reject.bind(this));
			} catch (e) {
				this._reject(e);
			}
		}
		/**
		 * Builds a promise that is resolved when all the passed in promises are
		 * resolved.
		 * @param {array} array of data and/or promises to wait for.
		 * @return {Promise} New dependant promise.
		 */


		Promise.all = function Promise_all(promises) {
			var resolveAll, rejectAll;
			var deferred = new Promise(function (resolve, reject) {
				resolveAll = resolve;
				rejectAll = reject;
			});
			var unresolved = promises.length;
			var results = [];

			if (unresolved === 0) {
				resolveAll(results);
				return deferred;
			}

			function reject(reason) {
				if (deferred._status === STATUS_REJECTED) {
					return;
				}

				results = [];
				rejectAll(reason);
			}

			for (var i = 0, ii = promises.length; i < ii; ++i) {
				var promise = promises[i];

				var resolve = function (i) {
					return function (value) {
						if (deferred._status === STATUS_REJECTED) {
							return;
						}

						results[i] = value;
						unresolved--;

						if (unresolved === 0) {
							resolveAll(results);
						}
					};
				}(i);

				if (Promise.isPromise(promise)) {
					promise.then(resolve, reject);
				} else {
					resolve(promise);
				}
			}

			return deferred;
		};
		/**
		 * Checks if the value is likely a promise (has a 'then' function).
		 * @return {boolean} true if value is thenable
		 */


		Promise.isPromise = function Promise_isPromise(value) {
			return value && typeof value.then === 'function';
		};
		/**
		 * Creates resolved promise
		 * @param value resolve value
		 * @returns {Promise}
		 */


		Promise.resolve = function Promise_resolve(value) {
			return new Promise(function (resolve) {
				resolve(value);
			});
		};
		/**
		 * Creates rejected promise
		 * @param reason rejection value
		 * @returns {Promise}
		 */


		Promise.reject = function Promise_reject(reason) {
			return new Promise(function (resolve, reject) {
				reject(reason);
			});
		};

		Promise.prototype = {
			_status: null,
			_value: null,
			_handlers: null,
			_unhandledRejection: null,
			_updateStatus: function Promise__updateStatus(status, value) {
				if (this._status === STATUS_RESOLVED || this._status === STATUS_REJECTED) {
					return;
				}

				if (status === STATUS_RESOLVED && Promise.isPromise(value)) {
					value.then(this._updateStatus.bind(this, STATUS_RESOLVED), this._updateStatus.bind(this, STATUS_REJECTED));
					return;
				}

				this._status = status;
				this._value = value;

				if (status === STATUS_REJECTED && this._handlers.length === 0) {
					this._unhandledRejection = true;
					HandlerManager.addUnhandledRejection(this);
				}

				HandlerManager.scheduleHandlers(this);
			},
			_resolve: function Promise_resolve(value) {
				this._updateStatus(STATUS_RESOLVED, value);
			},
			_reject: function Promise_reject(reason) {
				this._updateStatus(STATUS_REJECTED, reason);
			},
			then: function Promise_then(onResolve, onReject) {
				var nextPromise = new Promise(function (resolve, reject) {
					this.resolve = resolve;
					this.reject = reject;
				});

				this._handlers.push({
					thisPromise: this,
					onResolve: onResolve,
					onReject: onReject,
					nextPromise: nextPromise
				});

				HandlerManager.scheduleHandlers(this);
				return nextPromise;
			},
			catch: function Promise_catch(onReject) {
				return this.then(undefined, onReject);
			}
		};
		globalScope.Promise = Promise; //#else
		//throw new Error('DOM Promise is not present');
		//#endif
	})();

	PDFJS.createBlob = function createBlob(data, contentType) {
		if (typeof Blob !== 'undefined') {
			return new Blob([data], {
				type: contentType
			});
		} // Blob builder is deprecated in FF14 and removed in FF18.


		var bb = new MozBlobBuilder();
		bb.append(data);
		return bb.getBlob(contentType);
	};

	PDFJS.createObjectURL = function createObjectURLClosure() {
		// Blob/createObjectURL is not available, falling back to data schema.
		var digits = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
		return function createObjectURL(data, contentType) {
			if (!PDFJS.disableCreateObjectURL && typeof URL !== 'undefined' && URL.createObjectURL) {
				var blob = PDFJS.createBlob(data, contentType);
				return URL.createObjectURL(blob);
			}

			var buffer = 'data:' + contentType + ';base64,';

			for (var i = 0, ii = data.length; i < ii; i += 3) {
				var b1 = data[i] & 0xFF;
				var b2 = data[i + 1] & 0xFF;
				var b3 = data[i + 2] & 0xFF;
				var d1 = b1 >> 2,
						d2 = (b1 & 3) << 4 | b2 >> 4;
				var d3 = i + 1 < ii ? (b2 & 0xF) << 2 | b3 >> 6 : 64;
				var d4 = i + 2 < ii ? b3 & 0x3F : 64;
				buffer += digits[d1] + digits[d2] + digits[d3] + digits[d4];
			}

			return buffer;
		};
	}();
	var moduleType = typeof module;

	if (moduleType !== 'undefined' && module.exports) {
		module.exports = JpxImage;
	}

	var Jpx = /*#__PURE__*/Object.freeze({
		__proto__: null
	});

	/** * Imports ***/
	let openJPEG; // for one time initialization

	/**
	 * Dicom parser is a combination of utilities to get a VJS image from dicom files.
	 *scripts
	 * Relies on dcmjs, jquery, HTML5 fetch API, HTML5 promise API.
	 *
	 * image-JPEG2000 (jpx) is still in use, because Cornerstone does it and may have identified some edge corners.
	 * Ref:
	 *	 https://github.com/cornerstonejs/cornerstoneWADOImageLoader/blob/master/docs/Codecs.md
	 *	 https://github.com/cornerstonejs/cornerstoneWADOImageLoader/blob/a9b408f5562bde5543fc6986bd23fbac9d676562/src/shared/decoders/decodeJPEG2000.js#L127-L134
	 *
	 * @module parsers/dicom
	 *
	 * @param arrayBuffer {arraybuffer} - List of files to be parsed. It is urls from which
	 * VJS.parsers.dicom can pull the data from.
	 */

	class ParsersDicom extends ParsersVolume {
		constructor(data, id) {
			super();
			this._id = id;
			this._arrayBuffer = data.buffer;
			let byteArray = new Uint8Array(this._arrayBuffer); // catch error
			// throw error if any!

			this._dataSet = null;

			try {
				this._dataSet = DicomParser__namespace.parseDicom(byteArray);
			} catch (e) {
				console.log(e);
				const error = new Error('parsers.dicom could not parse the file');
				throw error;
			}
		}
		/**
		 * Series instance UID (0020,000e)
		 *
		 * @return {String}
		 */


		seriesInstanceUID() {
			return this._dataSet.string('x0020000e');
		}
		/**
		 * Study instance UID (0020,000d)
		 *
		 * @return {String}
		 */


		studyInstanceUID() {
			return this._dataSet.string('x0020000d');
		}
		/**
		 * Get modality (0008,0060)
		 *
		 * @return {String}
		 */


		modality() {
			return this._dataSet.string('x00080060');
		}
		/**
		 * Segmentation type (0062,0001)
		 *
		 * @return {String}
		 */


		segmentationType() {
			return this._dataSet.string('x00620001');
		}
		/**
		 * Segmentation segments
		 * -> Sequence of segments (0062,0002)
		 *	 -> Recommended Display CIELab
		 *	 -> Segmentation Code
		 *	 -> Segment Number (0062,0004)
		 *	 -> Segment Label (0062,0005)
		 *	 -> Algorithm Type (0062,0008)
		 *
		 * @return {*}
		 */


		segmentationSegments() {
			let segmentationSegments = [];
			let segmentSequence = this._dataSet.elements.x00620002;

			if (!segmentSequence) {
				return segmentationSegments;
			}

			for (let i = 0; i < segmentSequence.items.length; i++) {
				let recommendedDisplayCIELab = this._recommendedDisplayCIELab(segmentSequence.items[i]);

				let segmentationCode = this._segmentationCode(segmentSequence.items[i]);

				let segmentNumber = segmentSequence.items[i].dataSet.uint16('x00620004');
				let segmentLabel = segmentSequence.items[i].dataSet.string('x00620005');
				let segmentAlgorithmType = segmentSequence.items[i].dataSet.string('x00620008');
				segmentationSegments.push({
					recommendedDisplayCIELab,
					segmentationCodeDesignator: segmentationCode['segmentationCodeDesignator'],
					segmentationCodeValue: segmentationCode['segmentationCodeValue'],
					segmentationCodeMeaning: segmentationCode['segmentationCodeMeaning'],
					segmentNumber,
					segmentLabel,
					segmentAlgorithmType
				});
			}

			return segmentationSegments;
		}
		/**
		 * Segmentation code
		 * -> Code designator (0008,0102)
		 * -> Code value (0008,0200)
		 * -> Code Meaning Type (0008,0104)
		 *
		 * @param {*} segment
		 *
		 * @return {*}
		 */


		_segmentationCode(segment) {
			let segmentationCodeDesignator = 'unknown';
			let segmentationCodeValue = 'unknown';
			let segmentationCodeMeaning = 'unknown';
			let element = segment.dataSet.elements.x00082218;

			if (element && element.items && element.items.length > 0) {
				segmentationCodeDesignator = element.items[0].dataSet.string('x00080102');
				segmentationCodeValue = element.items[0].dataSet.string('x00080100');
				segmentationCodeMeaning = element.items[0].dataSet.string('x00080104');
			}

			return {
				segmentationCodeDesignator,
				segmentationCodeValue,
				segmentationCodeMeaning
			};
		}
		/**
		 * Recommended display CIELab
		 *
		 * @param {*} segment
		 *
		 * @return {*}
		 */


		_recommendedDisplayCIELab(segment) {
			if (!segment.dataSet.elements.x0062000d) {
				return null;
			}

			let offset = segment.dataSet.elements.x0062000d.dataOffset;
			let length = segment.dataSet.elements.x0062000d.length;
			let byteArray = segment.dataSet.byteArray.slice(offset, offset + length); // https://www.dabsoft.ch/dicom/3/C.10.7.1.1/

			let CIELabScaled = new Uint16Array(length / 2);

			for (let i = 0; i < length / 2; i++) {
				CIELabScaled[i] = (byteArray[2 * i + 1] << 8) + byteArray[2 * i];
			}

			let CIELabNormalized = [CIELabScaled[0] / 65535 * 100, CIELabScaled[1] / 65535 * 255 - 128, CIELabScaled[2] / 65535 * 255 - 128];
			return CIELabNormalized;
		}
		/**
		 * Raw dataset
		 * 
		 * @return {*}
		 */


		rawHeader() {
			return this._dataSet;
		}
		/**
		 * SOP Instance UID
		 *
		 * @param {*} frameIndex
		 *
		 * @return {*}
		 */


		sopInstanceUID(frameIndex = 0) {
			let sopInstanceUID = this._findStringEverywhere('x2005140f', 'x00080018', frameIndex);

			return sopInstanceUID;
		}
		/**
		 * Transfer syntax UID
		 *
		 * @return {*}
		 */


		transferSyntaxUID() {
			return this._dataSet.string('x00020010');
		}
		/**
		 * Study date
		 *
		 * @return {*}
		 */


		studyDate() {
			return this._dataSet.string('x00080020');
		}
		/**
		 * Study description
		 *
		 * @return {*}
		 */


		studyDescription() {
			return this._dataSet.string('x00081030');
		}
		/**
		 * Series date
		 *
		 * @return {*}
		 */


		seriesDate() {
			return this._dataSet.string('x00080021');
		}
		/**
		 * Series description
		 *
		 * @return {*}
		 */


		seriesDescription() {
			return this._dataSet.string('x0008103e');
		}
		/**
		 * Patient name
		 *
		 * @return {*}
		 */


		patientName() {
			return this._dataSet.string('x00100010');
		}
		/**
		 * Patient ID
		 *
		 * @return {*}
		 */


		patientID() {
			return this._dataSet.string('x00100020');
		}
		/**
		 * Patient birthdate
		 *
		 * @return {*}
		 */


		patientBirthdate() {
			return this._dataSet.string('x00100030');
		}
		/**
		 * Patient sex
		 *
		 * @return {*}
		 */


		patientSex() {
			return this._dataSet.string('x00100040');
		}
		/**
		 * Patient age
		 *
		 * @return {*}
		 */


		patientAge() {
			return this._dataSet.string('x00101010');
		}
		/**
		 * Photometric interpretation
		 *
		 * @return {*}
		 */


		photometricInterpretation() {
			return this._dataSet.string('x00280004');
		}

		planarConfiguration() {
			let planarConfiguration = this._dataSet.uint16('x00280006');

			if (typeof planarConfiguration === 'undefined') {
				planarConfiguration = null;
			}

			return planarConfiguration;
		}

		samplesPerPixel() {
			return this._dataSet.uint16('x00280002');
		}

		numberOfFrames() {
			let numberOfFrames = this._dataSet.intString('x00280008'); // need something smarter!


			if (typeof numberOfFrames === 'undefined') {
				numberOfFrames = null;
			}

			return numberOfFrames;
		}

		numberOfChannels() {
			let numberOfChannels = 1;
			let photometricInterpretation = this.photometricInterpretation();

			if (!(photometricInterpretation !== 'RGB' && photometricInterpretation !== 'PALETTE COLOR' && photometricInterpretation !== 'YBR_FULL' && photometricInterpretation !== 'YBR_FULL_422' && photometricInterpretation !== 'YBR_PARTIAL_422' && photometricInterpretation !== 'YBR_PARTIAL_420' && photometricInterpretation !== 'YBR_RCT')) {
				numberOfChannels = 3;
			} // make sure we return a number! (not a string!)


			return numberOfChannels;
		}

		invert() {
			let photometricInterpretation = this.photometricInterpretation();
			return photometricInterpretation === 'MONOCHROME1' ? true : false;
		}

		imageOrientation(frameIndex = 0) {
			// expect frame index to start at 0!
			let imageOrientation = this._findStringEverywhere('x00209116', 'x00200037', frameIndex); // format image orientation ('1\0\0\0\1\0') to array containing 6 numbers


			if (imageOrientation) {
				// make sure we return a number! (not a string!)
				// might not need to split (floatString + index)
				imageOrientation = imageOrientation.split('\\').map(CoreUtils.stringToNumber);
			}

			return imageOrientation;
		}

		referencedSegmentNumber(frameIndex = 0) {
			let referencedSegmentNumber = -1;

			let referencedSegmentNumberElement = this._findInGroupSequence('x52009230', 'x0062000a', frameIndex);

			if (referencedSegmentNumberElement !== null) {
				referencedSegmentNumber = referencedSegmentNumberElement.uint16('x0062000b');
			}

			return referencedSegmentNumber;
		}

		pixelAspectRatio() {
			let pixelAspectRatio = [this._dataSet.intString('x00280034', 0), this._dataSet.intString('x00280034', 1)]; // need something smarter!

			if (typeof pixelAspectRatio[0] === 'undefined') {
				pixelAspectRatio = null;
			} // make sure we return a number! (not a string!)


			return pixelAspectRatio;
		}

		imagePosition(frameIndex = 0) {
			let imagePosition = this._findStringEverywhere('x00209113', 'x00200032', frameIndex); // format image orientation ('1\0\0\0\1\0') to array containing 6 numbers


			if (imagePosition) {
				// make sure we return a number! (not a string!)
				imagePosition = imagePosition.split('\\').map(CoreUtils.stringToNumber);
			}

			return imagePosition;
		}

		instanceNumber(frameIndex = 0) {
			let instanceNumber = null; // first look for frame!
			// per frame functionnal group sequence

			let perFrameFunctionnalGroupSequence = this._dataSet.elements.x52009230;

			if (typeof perFrameFunctionnalGroupSequence !== 'undefined') {
				if (perFrameFunctionnalGroupSequence.items[frameIndex].dataSet.elements.x2005140f) {
					let planeOrientationSequence = perFrameFunctionnalGroupSequence.items[frameIndex].dataSet.elements.x2005140f.items[0].dataSet;
					instanceNumber = planeOrientationSequence.intString('x00200013');
				} else {
					instanceNumber = this._dataSet.intString('x00200013');

					if (typeof instanceNumber === 'undefined') {
						instanceNumber = null;
					}
				}
			} else {
				// should we default to undefined??
				// default orientation
				instanceNumber = this._dataSet.intString('x00200013');

				if (typeof instanceNumber === 'undefined') {
					instanceNumber = null;
				}
			}

			return instanceNumber;
		}

		pixelSpacing(frameIndex = 0) {
			// expect frame index to start at 0!
			let pixelSpacing = this._findStringEverywhere('x00289110', 'x00280030', frameIndex);

			if (pixelSpacing === null) {
				pixelSpacing = this._dataSet.string('x00181164');

				if (typeof pixelSpacing === 'undefined') {
					pixelSpacing = null;
				}
			}

			if (pixelSpacing) {
				const splittedSpacing = pixelSpacing.split('\\');

				if (splittedSpacing.length !== 2) {
					console.error(`DICOM spacing format is not supported (could not split string on "\\"): ${pixelSpacing}`);
					pixelSpacing = null;
				} else {
					pixelSpacing = splittedSpacing.map(CoreUtils.stringToNumber);
				}
			}

			return pixelSpacing;
		}

		ultrasoundRegions(frameIndex = 0) {
			const sequence = this._dataSet.elements['x00186011'];

			if (!sequence || !sequence.items) {
				return [];
			}

			const ultrasoundRegions = [];
			sequence.items.forEach(item => {
				ultrasoundRegions.push({
					x0: item.dataSet.uint32('x00186018'),
					y0: item.dataSet.uint32('x0018601a'),
					x1: item.dataSet.uint32('x0018601c'),
					y1: item.dataSet.uint32('x0018601e'),
					axisX: item.dataSet.int32('x00186020') || null,
					// optional
					axisY: item.dataSet.int32('x00186022') || null,
					// optional
					unitsX: this._getUnitsName(item.dataSet.uint16('x00186024')),
					unitsY: this._getUnitsName(item.dataSet.uint16('x00186026')),
					deltaX: item.dataSet.double('x0018602c'),
					deltaY: item.dataSet.double('x0018602e')
				});
			});
			return ultrasoundRegions;
		}

		frameTime(frameIndex = 0) {
			let frameIncrementPointer = this._dataSet.uint16('x00280009', 1);

			let frameRate = this._dataSet.intString('x00082144');

			let frameTime;

			if (typeof frameIncrementPointer === 'number') {
				frameIncrementPointer = frameIncrementPointer.toString(16);
				frameTime = this._dataSet.floatString('x0018' + frameIncrementPointer);
			}

			if (typeof frameTime === 'undefined' && typeof frameRate === 'number') {
				frameTime = 1000 / frameRate;
			}

			if (typeof frameTime === 'undefined') {
				frameTime = null;
			}

			return frameTime;
		}

		rows(frameIndex = 0) {
			let rows = this._dataSet.uint16('x00280010');

			if (typeof rows === 'undefined') {
				rows = null; // print warning at least...
			}

			return rows;
		}

		columns(frameIndex = 0) {
			let columns = this._dataSet.uint16('x00280011');

			if (typeof columns === 'undefined') {
				columns = null; // print warning at least...
			}

			return columns;
		}

		pixelType(frameIndex = 0) {
			// 0 integer, 1 float
			// dicom only support integers
			return 0;
		}

		pixelRepresentation(frameIndex = 0) {
			let pixelRepresentation = this._dataSet.uint16('x00280103');

			return pixelRepresentation;
		}

		pixelPaddingValue(frameIndex = 0) {
			let padding = this._dataSet.int16('x00280120');

			if (typeof padding === 'undefined') {
				padding = null;
			}

			return padding;
		}

		bitsAllocated(frameIndex = 0) {
			// expect frame index to start at 0!
			let bitsAllocated = this._dataSet.uint16('x00280100');

			return bitsAllocated;
		}

		highBit(frameIndex = 0) {
			// expect frame index to start at 0!
			let highBit = this._dataSet.uint16('x00280102');

			return highBit;
		}

		rescaleIntercept(frameIndex = 0) {
			return this._findFloatStringInFrameGroupSequence('x00289145', 'x00281052', frameIndex);
		}

		rescaleSlope(frameIndex = 0) {
			return this._findFloatStringInFrameGroupSequence('x00289145', 'x00281053', frameIndex);
		}

		windowCenter(frameIndex = 0) {
			return this._findFloatStringInFrameGroupSequence('x00289132', 'x00281050', frameIndex);
		}

		windowWidth(frameIndex = 0) {
			return this._findFloatStringInFrameGroupSequence('x00289132', 'x00281051', frameIndex);
		}

		sliceThickness(frameIndex = 0) {
			return this._findFloatStringInFrameGroupSequence('x00289110', 'x00180050', frameIndex);
		}

		spacingBetweenSlices(frameIndex = 0) {
			let spacing = this._dataSet.floatString('x00180088');

			if (typeof spacing === 'undefined') {
				spacing = null;
			}

			return spacing;
		}

		dimensionIndexValues(frameIndex = 0) {
			let dimensionIndexValues = null; // try to get it from enhanced MR images
			// per-frame functionnal group sequence

			let perFrameFunctionnalGroupSequence = this._dataSet.elements.x52009230;

			if (typeof perFrameFunctionnalGroupSequence !== 'undefined') {
				let frameContentSequence = perFrameFunctionnalGroupSequence.items[frameIndex].dataSet.elements.x00209111;

				if (frameContentSequence !== undefined && frameContentSequence !== null) {
					frameContentSequence = frameContentSequence.items[0].dataSet;
					let dimensionIndexValuesElt = frameContentSequence.elements.x00209157;

					if (dimensionIndexValuesElt !== undefined && dimensionIndexValuesElt !== null) {
						// /4 because UL
						let nbValues = dimensionIndexValuesElt.length / 4;
						dimensionIndexValues = [];

						for (let i = 0; i < nbValues; i++) {
							dimensionIndexValues.push(frameContentSequence.uint32('x00209157', i));
						}
					}
				}
			}

			return dimensionIndexValues;
		}

		inStackPositionNumber(frameIndex = 0) {
			let inStackPositionNumber = null; // try to get it from enhanced MR images
			// per-frame functionnal group sequence

			let perFrameFunctionnalGroupSequence = this._dataSet.elements.x52009230;

			if (typeof perFrameFunctionnalGroupSequence !== 'undefined') {
				// NOT A PHILIPS TRICK!
				let philipsPrivateSequence = perFrameFunctionnalGroupSequence.items[frameIndex].dataSet.elements.x00209111.items[0].dataSet;
				inStackPositionNumber = philipsPrivateSequence.uint32('x00209057');
			} else {
				inStackPositionNumber = null;
			}

			return inStackPositionNumber;
		}

		stackID(frameIndex = 0) {
			let stackID = null; // try to get it from enhanced MR images
			// per-frame functionnal group sequence

			let perFrameFunctionnalGroupSequence = this._dataSet.elements.x52009230;

			if (typeof perFrameFunctionnalGroupSequence !== 'undefined') {
				// NOT A PHILIPS TRICK!
				let philipsPrivateSequence = perFrameFunctionnalGroupSequence.items[frameIndex].dataSet.elements.x00209111.items[0].dataSet;
				stackID = philipsPrivateSequence.intString('x00209056');
			} else {
				stackID = null;
			}

			return stackID;
		}

		extractPixelData(frameIndex = 0) {
			// decompress
			let decompressedData = this._decodePixelData(frameIndex);

			let numberOfChannels = this.numberOfChannels();

			if (numberOfChannels > 1) {
				return this._convertColorSpace(decompressedData);
			} else {
				return decompressedData;
			}
		} //
		// private methods
		//


		_findInGroupSequence(sequence, subsequence, index) {
			let functionalGroupSequence = this._dataSet.elements[sequence];

			if (typeof functionalGroupSequence !== 'undefined') {
				let inSequence = functionalGroupSequence.items[index].dataSet.elements[subsequence];

				if (typeof inSequence !== 'undefined') {
					return inSequence.items[0].dataSet;
				}
			}

			return null;
		}

		_findStringInGroupSequence(sequence, subsequence, tag, index) {
			// index = 0 if shared!!!
			let dataSet = this._findInGroupSequence(sequence, subsequence, index);

			if (dataSet !== null) {
				return dataSet.string(tag);
			}

			return null;
		}

		_findStringInFrameGroupSequence(subsequence, tag, index) {
			return this._findStringInGroupSequence('x52009229', subsequence, tag, 0) || this._findStringInGroupSequence('x52009230', subsequence, tag, index);
		}

		_findStringEverywhere(subsequence, tag, index) {
			let targetString = this._findStringInFrameGroupSequence(subsequence, tag, index); // PET MODULE


			if (targetString === null) {
				const petModule = 'x00540022';
				targetString = this._findStringInSequence(petModule, tag);
			}

			if (targetString === null) {
				targetString = this._dataSet.string(tag);
			}

			if (typeof targetString === 'undefined') {
				targetString = null;
			}

			return targetString;
		}

		_findStringInSequence(sequenceTag, tag, index) {
			const sequence = this._dataSet.elements[sequenceTag];
			let targetString;

			if (sequence) {
				targetString = sequence.items[0].dataSet.string(tag);
			}

			if (typeof targetString === 'undefined') {
				targetString = null;
			}

			return targetString;
		}

		_findFloatStringInGroupSequence(sequence, subsequence, tag, index) {
			let dataInGroupSequence = this._dataSet.floatString(tag); // try to get it from enhanced MR images
			// per-frame functionnal group


			if (typeof dataInGroupSequence === 'undefined') {
				dataInGroupSequence = this._findInGroupSequence(sequence, subsequence, index);

				if (dataInGroupSequence !== null) {
					return dataInGroupSequence.floatString(tag);
				}
			}

			return dataInGroupSequence;
		}

		_findFloatStringInFrameGroupSequence(subsequence, tag, index) {
			return this._findFloatStringInGroupSequence('x52009229', subsequence, tag, 0) || this._findFloatStringInGroupSequence('x52009230', subsequence, tag, index);
		}

		_decodePixelData(frameIndex = 0) {
			// if compressed..?
			let transferSyntaxUID = this.transferSyntaxUID(); // find compression scheme

			if (transferSyntaxUID === '1.2.840.10008.1.2.4.90' || // JPEG 2000 Lossless
			transferSyntaxUID === '1.2.840.10008.1.2.4.91') {
				// JPEG 2000 Lossy
				return this._decodeJ2K(frameIndex);
			} else if (transferSyntaxUID === '1.2.840.10008.1.2.5' // decodeRLE
			) {
				return this._decodeRLE(frameIndex);
			} else if (transferSyntaxUID === '1.2.840.10008.1.2.4.57' || // JPEG Lossless, Nonhierarchical (Processes 14)
			transferSyntaxUID === '1.2.840.10008.1.2.4.70') {
				// JPEG Lossless, Nonhierarchical (Processes 14 [Selection 1])
				return this._decodeJPEGLossless(frameIndex);
			} else if (transferSyntaxUID === '1.2.840.10008.1.2.4.50' || // JPEG Baseline lossy process 1 (8 bit)
			transferSyntaxUID === '1.2.840.10008.1.2.4.51') {
				// JPEG Baseline lossy process 2 & 4 (12 bit)
				return this._decodeJPEGBaseline(frameIndex);
			} else if (transferSyntaxUID === '1.2.840.10008.1.2' || // Implicit VR Little Endian
			transferSyntaxUID === '1.2.840.10008.1.2.1') {
				// Explicit VR Little Endian
				return this._decodeUncompressed(frameIndex);
			} else if (transferSyntaxUID === '1.2.840.10008.1.2.2') {
				// Explicit VR Big Endian
				let frame = this._decodeUncompressed(frameIndex); // and sawp it!


				return this._swapFrame(frame);
			} else {
				throw {
					error: `no decoder for transfer syntax ${transferSyntaxUID}`
				};
			}
		} // github.com/chafey/cornerstoneWADOImageLoader/blob/master/src/imageLoader/wadouri/getEncapsulatedImageFrame.js


		framesAreFragmented() {
			const numberOfFrames = this._dataSet.intString('x00280008');

			const pixelDataElement = this._dataSet.elements.x7fe00010;
			return numberOfFrames !== pixelDataElement.fragments.length;
		}

		getEncapsulatedImageFrame(frameIndex) {
			if (this._dataSet.elements.x7fe00010 && this._dataSet.elements.x7fe00010.basicOffsetTable.length) {
				// Basic Offset Table is not empty
				return DicomParser__namespace.readEncapsulatedImageFrame(this._dataSet, this._dataSet.elements.x7fe00010, frameIndex);
			}

			if (this.framesAreFragmented()) {
				// Basic Offset Table is empty
				return DicomParser__namespace.readEncapsulatedImageFrame(this._dataSet, this._dataSet.elements.x7fe00010, frameIndex, DicomParser__namespace.createJPEGBasicOffsetTable(this._dataSet, this._dataSet.elements.x7fe00010));
			}

			return DicomParser__namespace.readEncapsulatedPixelDataFromFragments(this._dataSet, this._dataSet.elements.x7fe00010, frameIndex);
		} // used if OpenJPEG library isn't loaded (OHIF/image-JPEG2000 isn't supported and can't parse some images)


		_decodeJpx(frameIndex = 0) {
			const jpxImage = new Jpx(); // https://github.com/OHIF/image-JPEG2000/issues/6
			// It currently returns either Int16 or Uint16 based on whether the codestream is signed or not.

			jpxImage.parse(this.getEncapsulatedImageFrame(frameIndex));

			if (jpxImage.componentsCount !== 1) {
				throw new Error('JPEG2000 decoder returned a componentCount of ${componentsCount}, when 1 is expected');
			}

			if (jpxImage.tiles.length !== 1) {
				throw new Error('JPEG2000 decoder returned a tileCount of ${tileCount}, when 1 is expected');
			}

			return jpxImage.tiles[0].items;
		}

		_decodeOpenJPEG(frameIndex = 0) {
			const encodedPixelData = this.getEncapsulatedImageFrame(frameIndex);
			const bytesPerPixel = this.bitsAllocated(frameIndex) <= 8 ? 1 : 2;
			const signed = this.pixelRepresentation(frameIndex) === 1;

			const dataPtr = openJPEG._malloc(encodedPixelData.length);

			openJPEG.writeArrayToMemory(encodedPixelData, dataPtr); // create param outpout

			const imagePtrPtr = openJPEG._malloc(4);

			const imageSizePtr = openJPEG._malloc(4);

			const imageSizeXPtr = openJPEG._malloc(4);

			const imageSizeYPtr = openJPEG._malloc(4);

			const imageSizeCompPtr = openJPEG._malloc(4);

			const ret = openJPEG.ccall('jp2_decode', 'number', ['number', 'number', 'number', 'number', 'number', 'number', 'number'], [dataPtr, encodedPixelData.length, imagePtrPtr, imageSizePtr, imageSizeXPtr, imageSizeYPtr, imageSizeCompPtr]);
			const imagePtr = openJPEG.getValue(imagePtrPtr, '*');

			if (ret !== 0) {
				console.log('[opj_decode] decoding failed!');

				openJPEG._free(dataPtr);

				openJPEG._free(imagePtr);

				openJPEG._free(imageSizeXPtr);

				openJPEG._free(imageSizeYPtr);

				openJPEG._free(imageSizePtr);

				openJPEG._free(imageSizeCompPtr);

				return;
			} // Copy the data from the EMSCRIPTEN heap into the correct type array


			const length = openJPEG.getValue(imageSizeXPtr, 'i32') * openJPEG.getValue(imageSizeYPtr, 'i32') * openJPEG.getValue(imageSizeCompPtr, 'i32');
			const src32 = new Int32Array(openJPEG.HEAP32.buffer, imagePtr, length);
			let pixelData;

			if (bytesPerPixel === 1) {
				if (Uint8Array.from) {
					pixelData = Uint8Array.from(src32);
				} else {
					pixelData = new Uint8Array(length);

					for (let i = 0; i < length; i++) {
						pixelData[i] = src32[i];
					}
				}
			} else if (signed) {
				if (Int16Array.from) {
					pixelData = Int16Array.from(src32);
				} else {
					pixelData = new Int16Array(length);

					for (let i = 0; i < length; i++) {
						pixelData[i] = src32[i];
					}
				}
			} else if (Uint16Array.from) {
				pixelData = Uint16Array.from(src32);
			} else {
				pixelData = new Uint16Array(length);

				for (let i = 0; i < length; i++) {
					pixelData[i] = src32[i];
				}
			}

			openJPEG._free(dataPtr);

			openJPEG._free(imagePtrPtr);

			openJPEG._free(imagePtr);

			openJPEG._free(imageSizePtr);

			openJPEG._free(imageSizeXPtr);

			openJPEG._free(imageSizeYPtr);

			openJPEG._free(imageSizeCompPtr);

			return pixelData;
		} // from cornerstone


		_decodeJ2K(frameIndex = 0) {
			if (typeof OpenJPEG__namespace === 'undefined') {
				// OpenJPEG decoder not loaded
				return this._decodeJpx(frameIndex);
			}

			if (!openJPEG) {
				openJPEG = OpenJPEG__namespace.encode({
					dynamic: true
				});

				if (!openJPEG || !openJPEG._jp2_decode) {
					// OpenJPEG failed to initialize
					return this._decodeJpx(frameIndex);
				}
			}

			return this._decodeOpenJPEG(frameIndex);
		}

		_decodeRLE(frameIndex = 0) {
			const bitsAllocated = this.bitsAllocated(frameIndex);
			const planarConfiguration = this.planarConfiguration();
			const columns = this.columns();
			const rows = this.rows();
			const samplesPerPixel = this.samplesPerPixel(frameIndex);
			const pixelRepresentation = this.pixelRepresentation(frameIndex); // format data for the RLE decoder

			const imageFrame = {
				pixelRepresentation,
				bitsAllocated,
				planarConfiguration,
				columns,
				rows,
				samplesPerPixel
			};
			const pixelData = DicomParser__namespace.readEncapsulatedPixelDataFromFragments(this._dataSet, this._dataSet.elements.x7fe00010, frameIndex);
			const decoded = RLEDecoder(imageFrame, pixelData);
			return decoded.pixelData;
		} // from cornerstone


		_decodeJPEGLossless(frameIndex = 0) {
			let encodedPixelData = this.getEncapsulatedImageFrame(frameIndex);
			let pixelRepresentation = this.pixelRepresentation(frameIndex);
			let bitsAllocated = this.bitsAllocated(frameIndex);
			let byteOutput = bitsAllocated <= 8 ? 1 : 2;
			let decoder = new Jpeg__namespace.lossless.Decoder();
			let decompressedData = decoder.decode(encodedPixelData.buffer, encodedPixelData.byteOffset, encodedPixelData.length, byteOutput);

			if (pixelRepresentation === 0) {
				if (byteOutput === 2) {
					return new Uint16Array(decompressedData.buffer);
				} else {
					// untested!
					return new Uint8Array(decompressedData.buffer);
				}
			} else {
				return new Int16Array(decompressedData.buffer);
			}
		}

		_decodeJPEGBaseline(frameIndex = 0) {
			let encodedPixelData = this.getEncapsulatedImageFrame(frameIndex);
			let rows = this.rows(frameIndex);
			let columns = this.columns(frameIndex);
			let bitsAllocated = this.bitsAllocated(frameIndex);
			let jpegBaseline = new JpegBaseline();
			jpegBaseline.parse(encodedPixelData);

			if (bitsAllocated === 8) {
				return jpegBaseline.getData(columns, rows);
			} else if (bitsAllocated === 16) {
				return jpegBaseline.getData16(columns, rows);
			}
		}

		_decodeUncompressed(frameIndex = 0) {
			let pixelRepresentation = this.pixelRepresentation(frameIndex);
			let bitsAllocated = this.bitsAllocated(frameIndex);
			let pixelDataElement = this._dataSet.elements.x7fe00010;
			let pixelDataOffset = pixelDataElement.dataOffset;
			let numberOfChannels = this.numberOfChannels();
			let numPixels = this.rows(frameIndex) * this.columns(frameIndex) * numberOfChannels;
			let frameOffset = 0;
			let buffer = this._dataSet.byteArray.buffer;

			if (pixelRepresentation === 0 && bitsAllocated === 8) {
				// unsigned 8 bit
				frameOffset = pixelDataOffset + frameIndex * numPixels;
				return new Uint8Array(buffer, frameOffset, numPixels);
			} else if (pixelRepresentation === 0 && bitsAllocated === 16) {
				// unsigned 16 bit
				frameOffset = pixelDataOffset + frameIndex * numPixels * 2;
				return new Uint16Array(buffer, frameOffset, numPixels);
			} else if (pixelRepresentation === 1 && bitsAllocated === 16) {
				// signed 16 bit
				frameOffset = pixelDataOffset + frameIndex * numPixels * 2;
				return new Int16Array(buffer, frameOffset, numPixels);
			} else if (pixelRepresentation === 0 && bitsAllocated === 32) {
				// unsigned 32 bit
				frameOffset = pixelDataOffset + frameIndex * numPixels * 4;
				return new Uint32Array(buffer, frameOffset, numPixels);
			} else if (pixelRepresentation === 0 && bitsAllocated === 1) {
				let newBuffer = new ArrayBuffer(numPixels);
				let newArray = new Uint8Array(newBuffer);
				frameOffset = pixelDataOffset + frameIndex * numPixels;
				let index = 0;
				let bitStart = frameIndex * numPixels;
				let bitEnd = frameIndex * numPixels + numPixels;
				let byteStart = Math.floor(bitStart / 8);
				let bitStartOffset = bitStart - byteStart * 8;
				let byteEnd = Math.ceil(bitEnd / 8);
				let targetBuffer = new Uint8Array(buffer, pixelDataOffset);

				for (let i = byteStart; i <= byteEnd; i++) {
					while (bitStartOffset < 8) {
						switch (bitStartOffset) {
							case 0:
								newArray[index] = targetBuffer[i] & 0x0001;
								break;

							case 1:
								newArray[index] = targetBuffer[i] >>> 1 & 0x0001;
								break;

							case 2:
								newArray[index] = targetBuffer[i] >>> 2 & 0x0001;
								break;

							case 3:
								newArray[index] = targetBuffer[i] >>> 3 & 0x0001;
								break;

							case 4:
								newArray[index] = targetBuffer[i] >>> 4 & 0x0001;
								break;

							case 5:
								newArray[index] = targetBuffer[i] >>> 5 & 0x0001;
								break;

							case 6:
								newArray[index] = targetBuffer[i] >>> 6 & 0x0001;
								break;

							case 7:
								newArray[index] = targetBuffer[i] >>> 7 & 0x0001;
								break;
						}

						bitStartOffset++;
						index++; // if return..

						if (index >= numPixels) {
							return newArray;
						}
					}

					bitStartOffset = 0;
				}
			}
		}

		_interpretAsRGB(photometricInterpretation) {
			const rgbLikeTypes = ['RGB', 'YBR_RCT', 'YBR_ICT', 'YBR_FULL_422'];
			return rgbLikeTypes.indexOf(photometricInterpretation) !== -1;
		}

		_convertColorSpace(uncompressedData) {
			let rgbData = null;
			let photometricInterpretation = this.photometricInterpretation();
			let planarConfiguration = this.planarConfiguration();

			if (planarConfiguration === null) {
				planarConfiguration = 0;
				console.log('Planar Configuration was not set and was defaulted to	0');
			}

			const interpretAsRGB = this._interpretAsRGB(photometricInterpretation);

			if (interpretAsRGB && planarConfiguration === 0) {
				// ALL GOOD, ALREADY ORDERED
				// planar or non planar planarConfiguration
				rgbData = uncompressedData;
			} else if (interpretAsRGB && planarConfiguration === 1) {
				if (uncompressedData instanceof Int8Array) {
					rgbData = new Int8Array(uncompressedData.length);
				} else if (uncompressedData instanceof Uint8Array) {
					rgbData = new Uint8Array(uncompressedData.length);
				} else if (uncompressedData instanceof Int16Array) {
					rgbData = new Int16Array(uncompressedData.length);
				} else if (uncompressedData instanceof Uint16Array) {
					rgbData = new Uint16Array(uncompressedData.length);
				} else {
					const error = new Error(`unsuported typed array: ${uncompressedData}`);
					throw error;
				}

				let numPixels = uncompressedData.length / 3;
				let rgbaIndex = 0;
				let rIndex = 0;
				let gIndex = numPixels;
				let bIndex = numPixels * 2;

				for (let i = 0; i < numPixels; i++) {
					rgbData[rgbaIndex++] = uncompressedData[rIndex++]; // red

					rgbData[rgbaIndex++] = uncompressedData[gIndex++]; // green

					rgbData[rgbaIndex++] = uncompressedData[bIndex++]; // blue
				}
			} else if (photometricInterpretation === 'YBR_FULL') {
				if (uncompressedData instanceof Int8Array) {
					rgbData = new Int8Array(uncompressedData.length);
				} else if (uncompressedData instanceof Uint8Array) {
					rgbData = new Uint8Array(uncompressedData.length);
				} else if (uncompressedData instanceof Int16Array) {
					rgbData = new Int16Array(uncompressedData.length);
				} else if (uncompressedData instanceof Uint16Array) {
					rgbData = new Uint16Array(uncompressedData.length);
				} else {
					const error = new Error(`unsuported typed array: ${uncompressedData}`);
					throw error;
				} // https://github.com/chafey/cornerstoneWADOImageLoader/blob/master/src/decodeYBRFull.js


				let nPixels = uncompressedData.length / 3;
				let ybrIndex = 0;
				let rgbaIndex = 0;

				for (let i = 0; i < nPixels; i++) {
					let y = uncompressedData[ybrIndex++];
					let cb = uncompressedData[ybrIndex++];
					let cr = uncompressedData[ybrIndex++];
					rgbData[rgbaIndex++] = y + 1.402 * (cr - 128); // red

					rgbData[rgbaIndex++] = y - 0.34414 * (cb - 128) - 0.71414 * (cr - 128); // green

					rgbData[rgbaIndex++] = y + 1.772 * (cb - 128); // blue
					// rgbData[rgbaIndex++] = 255; //alpha
				}
			} else {
				const error = new Error(`photometric interpolation not supported: ${photometricInterpretation}`);
				throw error;
			}

			return rgbData;
		}
		/**
		 * Swap bytes in frame.
		 */


		_swapFrame(frame) {
			// swap bytes ( if 8bits (1byte), nothing to swap)
			let bitsAllocated = this.bitsAllocated();

			if (bitsAllocated === 16) {
				for (let i = 0; i < frame.length; i++) {
					frame[i] = this._swap16(frame[i]);
				}
			} else if (bitsAllocated === 32) {
				for (let i = 0; i < frame.length; i++) {
					frame[i] = this._swap32(frame[i]);
				}
			}

			return frame;
		}

		_getUnitsName(value) {
			const units = {
				0: 'none',
				1: 'percent',
				2: 'dB',
				3: 'cm',
				4: 'seconds',
				5: 'hertz',
				6: 'dB/seconds',
				7: 'cm/sec',
				8: 'cm2',
				9: 'cm2/sec',
				10: 'cm3',
				11: 'cm3/sec',
				12: 'degrees'
			};
			return units.hasOwnProperty(value) ? units[value] : 'none';
		}

	}

	/** * Imports ***/
	/**
	 * @module parsers/mhd
	 */

	class ParsersMHD extends ParsersVolume {
		constructor(data, id) {
			super();
			/**
			 * @member
			 * @type {arraybuffer}
			 */

			this._id = id;
			this._url = data.url;
			this._header = {};
			this._buffer = null;

			try {
				// parse header (mhd) data
				let lines = new TextDecoder().decode(data.mhdBuffer).split('\n');
				lines.forEach(line => {
					let keyvalue = line.split('=');

					if (keyvalue.length === 2) {
						this._header[keyvalue[0].trim()] = keyvalue[1].trim();
					}
				});
				this._header.DimSize = this._header.DimSize.split(' ');
				this._header.ElementSpacing = this._header.ElementSpacing.split(' ');
				this._header.TransformMatrix = this._header.TransformMatrix.split(' ');
				this._header.Offset = this._header.Offset.split(' '); //

				this._buffer = data.rawBuffer;
			} catch (error) {
				console.log('ooops... :(');
			}
		}

		rightHanded() {
			let anatomicalOrientation = this._header.AnatomicalOrientation;

			if (anatomicalOrientation === 'RAS' || anatomicalOrientation === 'RPI' || anatomicalOrientation === 'LPS' || anatomicalOrientation === 'LAI') {
				this._rightHanded = true;
			} else {
				this._rightHanded = false;
			}

			return this._rightHanded;
		}

		seriesInstanceUID() {
			// use filename + timestamp..?
			return this._url;
		}

		numberOfFrames() {
			return parseInt(this._header.DimSize[2], 10);
		}

		sopInstanceUID(frameIndex = 0) {
			return frameIndex;
		}

		rows(frameIndex = 0) {
			return parseInt(this._header.DimSize[1], 10);
		}

		columns(frameIndex = 0) {
			return parseInt(this._header.DimSize[0], 10);
		}

		pixelType(frameIndex = 0) {
			// 0 - int
			// 1 - float
			let type = 0;

			if (this._header.ElementType === 'MET_UFLOAT' || this._header.ElementType === 'MET_FLOAT') {
				type = 1;
			}

			return type;
		}

		bitsAllocated(frameIndex = 0) {
			let bitsAllocated = 1;

			if (this._header.ElementType === 'MET_UCHAR' || this._header.ElementType === 'MET_CHAR') {
				bitsAllocated = 8;
			} else if (this._header.ElementType === 'MET_USHORT' || this._header.ElementType === 'MET_SHORT') {
				bitsAllocated = 16;
			} else if (this._header.ElementType === 'MET_UINT' || this._header.ElementType === 'MET_INT' || this._header.ElementType === 'MET_UFLOAT' || this._header.ElementType === 'MET_FLOAT') {
				bitsAllocated = 32;
			}

			return bitsAllocated;
		}
		/**
		 * https://itk.org/Wiki/ITK/MetaIO/Documentation
		 * ElementSpacing[0] spacing between elements along X axis (i.e. column spacing)
		 * ElementSpacing[1] spacing between elements along Y axis (i.e. row spacing)
		 *
		 * @param {*} frameIndex
		 */


		pixelSpacing(frameIndex = 0) {
			let x = parseFloat(this._header.ElementSpacing[1], 10);
			let y = parseFloat(this._header.ElementSpacing[0], 10);
			let z = parseFloat(this._header.ElementSpacing[2], 10);
			return [x, y, z];
		}

		imageOrientation(frameIndex = 0) {
			let invertX = this._header.AnatomicalOrientation.match(/L/) ? -1 : 1;
			let invertY = this._header.AnatomicalOrientation.match(/P/) ? -1 : 1;
			let x = new three.Vector3(parseFloat(this._header.TransformMatrix[0]) * invertX, parseFloat(this._header.TransformMatrix[1]) * invertY, parseFloat(this._header.TransformMatrix[2]));
			x.normalize();
			let y = new three.Vector3(parseFloat(this._header.TransformMatrix[3]) * invertX, parseFloat(this._header.TransformMatrix[4]) * invertY, parseFloat(this._header.TransformMatrix[5]));
			y.normalize();
			return [x.x, x.y, x.z, y.x, y.y, y.z];
		}

		imagePosition(frameIndex = 0) {
			return [parseFloat(this._header.Offset[0]), parseFloat(this._header.Offset[1]), parseFloat(this._header.Offset[2])];
		}

		extractPixelData(frameIndex = 0) {
			return this._decompressUncompressed(frameIndex);
		}

		_decompressUncompressed(frameIndex = 0) {
			let buffer = this._buffer;
			let numberOfChannels = this.numberOfChannels();
			let numPixels = this.rows(frameIndex) * this.columns(frameIndex) * numberOfChannels;

			if (!this.rightHanded()) {
				frameIndex = this.numberOfFrames() - 1 - frameIndex;
			}

			let frameOffset = frameIndex * numPixels;

			if (this._header.ElementType === 'MET_CHAR') {
				return new Int8Array(buffer, frameOffset, numPixels);
			} else if (this._header.ElementType === 'MET_UCHAR') {
				return new Uint8Array(buffer, frameOffset, numPixels);
			} else if (this._header.ElementType === 'MET_SHORT') {
				frameOffset = frameOffset * 2;
				return new Int16Array(buffer, frameOffset, numPixels);
			} else if (this._header.ElementType === 'MET_USHORT') {
				frameOffset = frameOffset * 2;
				return new Uint16Array(buffer, frameOffset, numPixels);
			} else if (this._header.ElementType === 'MET_INT') {
				frameOffset = frameOffset * 4;
				return new Int32Array(buffer, frameOffset, numPixels);
			} else if (this._header.ElementType === 'MET_UINT') {
				frameOffset = frameOffset * 4;
				return new Uint32Array(buffer, frameOffset, numPixels);
			} else if (this._header.ElementType === 'MET_FLOAT') {
				frameOffset = frameOffset * 4;
				return new Float32Array(buffer, frameOffset, numPixels);
			}
		}

	}

	/** * Imports ***/
	/**
	 * @module parsers/nifti
	 */

	class ParsersNifti$1 extends ParsersVolume {
		constructor(data, id) {
			super();
			/**
			 * @member
			 * @type {arraybuffer}
			 */

			this._id = id;
			this._arrayBuffer = data.buffer;
			this._url = data.url;
			this._dataSet = null;
			this._niftiHeader = null;
			this._niftiImage = null;
			this._ordered = true;
			this._orderedData = null; //

			this._qfac = 1.0;

			if (NiftiReader__namespace.isNIFTI(this._arrayBuffer)) {
				this._dataSet = NiftiReader__namespace.readHeader(this._arrayBuffer);
				this._niftiImage = NiftiReader__namespace.readImage(this._dataSet, this._arrayBuffer);
			} else {
				const error = new Error('parsers.nifti could not parse the file');
				throw error;
			}
		}

		seriesInstanceUID() {
			// use filename + timestamp..?
			return this._url;
		}

		numberOfFrames() {
			return this._dataSet.dims[3];
		}

		numberOfChannels() {
			let numberOfChannels = 1; // can dims[0] >= 5 and not multi channels with RGB datatypecode?

			if (this._dataSet.dims[0] >= 5) {
				numberOfChannels = this._dataSet.dims[5];
				this._ordered = false;
			} else if (this._dataSet.datatypeCode === 128) {
				numberOfChannels = 3;
			} else if (this._dataSet.datatypeCode === 2304) {
				numberOfChannels = 4;
			}

			return numberOfChannels;
		}

		sopInstanceUID(frameIndex = 0) {
			return frameIndex;
		}

		rows(frameIndex = 0) {
			return this._dataSet.dims[2];
		}

		columns(frameIndex = 0) {
			return this._dataSet.dims[1];
		}

		pixelType(frameIndex = 0) {
			// papaya.volume.nifti.NIFTI_TYPE_UINT8					 = 2;
			// papaya.volume.nifti.NIFTI_TYPE_INT16					 = 4;
			// papaya.volume.nifti.NIFTI_TYPE_INT32					 = 8;
			// papaya.volume.nifti.NIFTI_TYPE_FLOAT32				= 16;
			// papaya.volume.nifti.NIFTI_TYPE_COMPLEX64			= 32;
			// papaya.volume.nifti.NIFTI_TYPE_FLOAT64				= 64;
			// papaya.volume.nifti.NIFTI_TYPE_RGB24				 = 128;
			// papaya.volume.nifti.NIFTI_TYPE_INT8					= 256;
			// papaya.volume.nifti.NIFTI_TYPE_UINT16				= 512;
			// papaya.volume.nifti.NIFTI_TYPE_UINT32				= 768;
			// papaya.volume.nifti.NIFTI_TYPE_INT64				= 1024;
			// papaya.volume.nifti.NIFTI_TYPE_UINT64			 = 1280;
			// papaya.volume.nifti.NIFTI_TYPE_FLOAT128		 = 1536;
			// papaya.volume.nifti.NIFTI_TYPE_COMPLEX128	 = 1792;
			// papaya.volume.nifti.NIFTI_TYPE_COMPLEX256	 = 2048;
			// 0 integer, 1 float
			let pixelType = 0;

			if (this._dataSet.datatypeCode === 16 || this._dataSet.datatypeCode === 64 || this._dataSet.datatypeCode === 1536) {
				pixelType = 1;
			}

			return pixelType;
		}

		bitsAllocated(frameIndex = 0) {
			return this._dataSet.numBitsPerVoxel;
		}

		pixelSpacing(frameIndex = 0) {
			return [this._dataSet.pixDims[1], this._dataSet.pixDims[2], this._dataSet.pixDims[3]];
		}

		sliceThickness() {
			// should be a string...
			return null; // this._dataSet.pixDims[3].toString();
		}

		imageOrientation(frameIndex = 0) {
			// http://nifti.nimh.nih.gov/pub/dist/src/niftilib/nifti1.h
			// http://nifti.nimh.nih.gov/pub/dist/src/niftilib/nifti1_io.c
			if (this._dataSet.qform_code > 0) {
				// METHOD 2 (used when qform_code > 0, which should be the "normal" case):
				// ---------------------------------------------------------------------
				// The (x,y,z) coordinates are given by the pixdim[] scales, a rotation
				// matrix, and a shift.	This method is intended to represent
				// "scanner-anatomical" coordinates, which are often embedded in the
				// image header (e.g., DICOM fields (0020,0032), (0020,0037), (0028,0030),
				// and (0018,0050)), and represent the nominal orientation and location of
				// the data.	This method can also be used to represent "aligned"
				// coordinates, which would typically result from some post-acquisition
				// alignment of the volume to a standard orientation (e.g., the same
				// subject on another day, or a rigid rotation to true anatomical
				// orientation from the tilted position of the subject in the scanner).
				// The formula for (x,y,z) in terms of header parameters and (i,j,k) is:
				//	 [ x ]	 [ R11 R12 R13 ] [				pixdim[1] * i ]	 [ qoffset_x ]
				//	 [ y ] = [ R21 R22 R23 ] [				pixdim[2] * j ] + [ qoffset_y ]
				//	 [ z ]	 [ R31 R32 R33 ] [ qfac * pixdim[3] * k ]	 [ qoffset_z ]
				// The qoffset_* shifts are in the NIFTI-1 header.	Note that the center
				// of the (i,j,k)=(0,0,0) voxel (first value in the dataset array) is
				// just (x,y,z)=(qoffset_x,qoffset_y,qoffset_z).
				// The rotation matrix R is calculated from the quatern_* parameters.
				// This calculation is described below.
				// The scaling factor qfac is either 1 or -1.	The rotation matrix R
				// defined by the quaternion parameters is "proper" (has determinant 1).
				// This may not fit the needs of the data; for example, if the image
				// grid is
				//	 i increases from Left-to-Right
				//	 j increases from Anterior-to-Posterior
				//	 k increases from Inferior-to-Superior
				// Then (i,j,k) is a left-handed triple.	In this example, if qfac=1,
				// the R matrix would have to be
				//	 [	1	 0	 0 ]
				//	 [	0	-1	 0 ]	which is "improper" (determinant = -1).
				//	 [	0	 0	 1 ]
				// If we set qfac=-1, then the R matrix would be
				//	 [	1	 0	 0 ]
				//	 [	0	-1	 0 ]	which is proper.
				//	 [	0	 0	-1 ]
				// This R matrix is represented by quaternion [a,b,c,d] = [0,1,0,0]
				// (which encodes a 180 degree rotation about the x-axis).
				// https://github.com/Kitware/ITK/blob/master/Modules/IO/NIFTI/src/itkNiftiImageIO.cxx
				let a = 0.0;
				let b = this._dataSet.quatern_b;
				let c = this._dataSet.quatern_c;
				let d = this._dataSet.quatern_d; // compute a

				a = 1.0 - (b * b + c * c + d * d);

				if (a < 0.0000001) {
					/* special case */
					a = 1.0 / Math.sqrt(b * b + c * c + d * d);
					b *= a;
					c *= a;
					d *= a;
					/* normalize (b,c,d) vector */

					a = 0.0;
					/* a = 0 ==> 180 degree rotation */
				} else {
					a = Math.sqrt(a);
					/* angle = 2*arccos(a) */
				}

				if (this._dataSet.pixDims[0] < 0.0) {
					this._rightHanded = false;
				}

				return [-(a * a + b * b - c * c - d * d), -2 * (b * c + a * d), 2 * (b * d - a * c), -2 * (b * c - a * d), -(a * a + c * c - b * b - d * d), 2 * (c * d + a * b)];
			} else if (this._dataSet.sform_code > 0) {
				// METHOD 3 (used when sform_code > 0):
				// -----------------------------------
				// The (x,y,z) coordinates are given by a general affine transformation
				// of the (i,j,k) indexes:
				//	 x = srow_x[0] * i + srow_x[1] * j + srow_x[2] * k + srow_x[3]
				//	 y = srow_y[0] * i + srow_y[1] * j + srow_y[2] * k + srow_y[3]
				//	 z = srow_z[0] * i + srow_z[1] * j + srow_z[2] * k + srow_z[3]
				// The srow_* vectors are in the NIFTI_1 header.	Note that no use is
				// made of pixdim[] in this method.
				const rowX = [-this._dataSet.affine[0][0], -this._dataSet.affine[0][1], this._dataSet.affine[0][2]];
				const rowY = [-this._dataSet.affine[1][0], -this._dataSet.affine[1][1], this._dataSet.affine[0][2]];
				return [...rowX, ...rowY];
			} else if (this._dataSet.qform_code === 0) ;

			return [1, 0, 0, 0, 1, 0];
		}

		imagePosition(frameIndex = 0) {
			// qoffset is RAS
			return [-this._dataSet.qoffset_x, -this._dataSet.qoffset_y, this._dataSet.qoffset_z];
		}

		dimensionIndexValues(frameIndex = 0) {
			return null;
		}

		instanceNumber(frameIndex = 0) {
			return frameIndex;
		}

		windowCenter(frameIndex = 0) {
			// calc min and calc max
			return null;
		}

		windowWidth(frameIndex = 0) {
			// calc min and calc max
			return null;
		}

		rescaleSlope(frameIndex = 0) {
			return this._dataSet.scl_slope;
		}

		rescaleIntercept(frameIndex = 0) {
			return this._dataSet.scl_inter;
		}

		extractPixelData(frameIndex = 0) {
			return this._decompressUncompressed(frameIndex);
		}

		_decompressUncompressed(frameIndex = 0) {
			// papaya.volume.nifti.NIFTI_TYPE_UINT8					 = 2;
			// papaya.volume.nifti.NIFTI_TYPE_INT16					 = 4;
			// papaya.volume.nifti.NIFTI_TYPE_INT32					 = 8;
			// papaya.volume.nifti.NIFTI_TYPE_FLOAT32				= 16;
			// papaya.volume.nifti.NIFTI_TYPE_COMPLEX64			= 32;
			// papaya.volume.nifti.NIFTI_TYPE_FLOAT64				= 64;
			// papaya.volume.nifti.NIFTI_TYPE_RGB24				 = 128;
			// papaya.volume.nifti.NIFTI_TYPE_INT8					= 256;
			// papaya.volume.nifti.NIFTI_TYPE_UINT16				= 512;
			// papaya.volume.nifti.NIFTI_TYPE_UINT32				= 768;
			// papaya.volume.nifti.NIFTI_TYPE_INT64				= 1024;
			// papaya.volume.nifti.NIFTI_TYPE_UINT64			 = 1280;
			// papaya.volume.nifti.NIFTI_TYPE_FLOAT128		 = 1536;
			// papaya.volume.nifti.NIFTI_TYPE_COMPLEX128	 = 1792;
			// papaya.volume.nifti.NIFTI_TYPE_COMPLEX256	 = 2048;
			let numberOfChannels = this.numberOfChannels();
			let numPixels = this.rows(frameIndex) * this.columns(frameIndex) * numberOfChannels; // if( !this.rightHanded() ){
			//	 frameIndex = this.numberOfFrames() - 1 - frameIndex;
			// }

			let frameOffset = frameIndex * numPixels;
			let buffer = this._niftiImage; // use bits allocated && pixel reprensentation too

			if (!this._ordered && this._orderedData === null) {
				// order then
				this._reorderData();
			}

			if (this._orderedData !== null) {
				// just a slice...
				return this._orderedData.slice(frameOffset, frameOffset + numPixels);
			} else if (this._dataSet.datatypeCode === 2) {
				// unsigned int 8 bit
				return new Uint8Array(buffer, frameOffset, numPixels);
			} else if (this._dataSet.datatypeCode === 256) {
				// signed int 8 bit
				return new Int8Array(buffer, frameOffset, numPixels);
			} else if (this._dataSet.datatypeCode === 512) {
				// unsigned int 16 bit
				frameOffset = frameOffset * 2;
				return new Uint16Array(buffer, frameOffset, numPixels);
			} else if (this._dataSet.datatypeCode === 4) {
				// signed int 16 bit
				frameOffset = frameOffset * 2;
				return new Int16Array(buffer, frameOffset, numPixels);
			} else if (this._dataSet.datatypeCode === 8) {
				// signed int 32 bit
				frameOffset = frameOffset * 4;
				return new Int32Array(buffer, frameOffset, numPixels);
			} else if (this._dataSet.datatypeCode === 16) {
				// signed float 32 bit
				frameOffset = frameOffset * 4;
				const data = new Float32Array(buffer, frameOffset, numPixels);

				for (let i = 0; i < data.length; i++) {
					if (data[i] === Infinity || data[i] === -Infinity) {
						data[i] = 0;
					}
				}

				return data;
			} else {
				console.warn(`Unknown data type: datatypeCode : ${this._dataSet.datatypeCode}`);
			}
		}

		_reorderData() {
			let numberOfChannels = this.numberOfChannels();
			let numPixels = this.rows() * this.columns() * numberOfChannels;
			let buffer = this._niftiImage;
			let totalNumPixels = numPixels * this.numberOfFrames();
			let tmp = null;
			this._orderedData = null;

			if (this._dataSet.datatypeCode === 2) {
				// unsigned 8 bit
				tmp = new Uint8Array(buffer, 0, totalNumPixels);
				this._orderedData = new Uint8Array(tmp.length);
			} else if (this._dataSet.datatypeCode === 256) {
				// signed 8 bit
				tmp = new Int8Array(buffer, 0, totalNumPixels);
				this._orderedData = new Int8Array(tmp.length);
			} else if (this._dataSet.datatypeCode === 512) {
				tmp = new Uint16Array(buffer, 0, totalNumPixels);
				this._orderedData = new Uint16Array(tmp.length);
			} else if (this._dataSet.datatypeCode === 4) {
				tmp = new Int16Array(buffer, 0, totalNumPixels);
				this._orderedData = new Int16Array(tmp.length);
			} else if (this._dataSet.datatypeCode === 16) {
				tmp = new Float32Array(buffer, 0, totalNumPixels);
				this._orderedData = new Float32Array(tmp.length);
			} // re-order pixels...


			let numPixels2 = tmp.length / 3;
			let rgbaIndex = 0;
			let rIndex = 0;
			let gIndex = numPixels2;
			let bIndex = numPixels2 * 2;

			for (let i = 0; i < numPixels2; i++) {
				this._orderedData[rgbaIndex++] = tmp[rIndex++]; // red

				this._orderedData[rgbaIndex++] = tmp[gIndex++]; // green

				this._orderedData[rgbaIndex++] = tmp[bIndex++]; // blue
			}

			this._ordered = true;
		}

	}

	/** * Imports ***/
	/**
	 * @module parsers/nifti
	 */

	class ParsersNifti extends ParsersVolume {
		/**
		 * Constructor
		 *
		 * @param {*} data
		 * @param {*} id
		 */
		constructor(data, id) {
			super();
			/**
			 * @member
			 * @type {arraybuffer}
			 */

			this._id = id;
			this._arrayBuffer = data.buffer;
			this._url = data.url;
			this._dataSet = null;
			this._unpackedData = null;

			try {
				this._dataSet = NrrdReader__namespace.parse(this._arrayBuffer);
			} catch (error) {
				console.log('ooops... :(');
			}
		}
		/**
		 * Is the data right-handed
		 *
		 * @return {*}
		 */


		rightHanded() {
			if (this._dataSet.space.match(/^right-anterior-superior/) || this._dataSet.space.match(/^left-posterior-superior/)) {
				this._rightHanded = true;
			} else {
				this._rightHanded = false;
			}

			return this._rightHanded;
		}
		/**
		 * Series instance UID
		 *
		 * @return {*}
		 */


		seriesInstanceUID() {
			// use filename + timestamp..?
			return this._url;
		}
		/**
		 * Number of frames
		 *
		 * @return {*}
		 */


		numberOfFrames() {
			return this._dataSet.sizes[2];
		}
		/**
		 * Number of channels
		 *
		 * @return {*}
		 */


		numberOfChannels() {
			return 1;
		}
		/**
		 * SOP instance UID
		 *
		 * @param {*} frameIndex
		 *
		 * @return {*}
		 */


		sopInstanceUID(frameIndex = 0) {
			return frameIndex;
		}
		/**
		 * Rows
		 *
		 * @param {*} frameIndex
		 *
		 * @return {*}
		 */


		rows(frameIndex = 0) {
			return this._dataSet.sizes[1];
		}
		/**
		 * Columns
		 *
		 * @param {*} frameIndex
		 *
		 * @return {*}
		 */


		columns(frameIndex = 0) {
			return this._dataSet.sizes[0];
		}
		/**
		 * Pixel type
		 *
		 * @param {*} frameIndex
		 *
		 * @return {*}
		 */


		pixelType(frameIndex = 0) {
			// 0 - int
			// 1 - float
			let pixelType = 0;

			if (this._dataSet.type === 'float') {
				pixelType = 1;
			}

			return pixelType;
		}
		/**
		 * Bits allocated
		 *
		 * @param {*} frameIndex
		 *
		 * @return {*}
		 */


		bitsAllocated(frameIndex = 0) {
			let bitsAllocated = 1;

			if (this._dataSet.type === 'int8' || this._dataSet.type === 'uint8' || this._dataSet.type === 'char') {
				bitsAllocated = 8;
			} else if (this._dataSet.type === 'int16' || this._dataSet.type === 'uint16' || this._dataSet.type === 'short') {
				bitsAllocated = 16;
			} else if (this._dataSet.type === 'int32' || this._dataSet.type === 'uint32' || this._dataSet.type === 'float') {
				bitsAllocated = 32;
			}

			return bitsAllocated;
		}
		/**
		 * Pixel spacing
		 *
		 * @param {*} frameIndex
		 *
		 * @return {*}
		 */


		pixelSpacing(frameIndex = 0) {
			const x = new three.Vector3(this._dataSet.spaceDirections[0][0], this._dataSet.spaceDirections[0][1], this._dataSet.spaceDirections[0][2]);
			const y = new three.Vector3(this._dataSet.spaceDirections[1][0], this._dataSet.spaceDirections[1][1], this._dataSet.spaceDirections[1][2]);
			const z = new three.Vector3(this._dataSet.spaceDirections[2][0], this._dataSet.spaceDirections[2][1], this._dataSet.spaceDirections[2][2]);
			return [x.length(), y.length(), z.length()];
		}
		/**
		 * Image orientation
		 *
		 * @param {*} frameIndex
		 *
		 * @return {*}
		 */


		imageOrientation(frameIndex = 0) {
			let invertX = this._dataSet.space.match(/right/) ? -1 : 1;
			let invertY = this._dataSet.space.match(/anterior/) ? -1 : 1;
			let x = new three.Vector3(this._dataSet.spaceDirections[0][0] * invertX, this._dataSet.spaceDirections[0][1] * invertY, this._dataSet.spaceDirections[0][2]);
			x.normalize();
			let y = new three.Vector3(this._dataSet.spaceDirections[1][0] * invertX, this._dataSet.spaceDirections[1][1] * invertY, this._dataSet.spaceDirections[1][2]);
			y.normalize();
			return [x.x, x.y, x.z, y.x, y.y, y.z];
		}
		/**
		 * Image position
		 *
		 * @param {*} frameIndex
		 *
		 * @return {*}
		 */


		imagePosition(frameIndex = 0) {
			return [this._dataSet.spaceOrigin[0], this._dataSet.spaceOrigin[1], this._dataSet.spaceOrigin[2]];
		}
		/**
		 * Extract pixel data ffrom array buffer
		 *
		 * @param {*} frameIndex
		 *
		 * @return {*}
		 */


		extractPixelData(frameIndex = 0) {
			return this._decompressUncompressed(frameIndex);
		}
		/**
		 * Decompress data from uncompressed array buffer
		 *
		 * @param {*} frameIndex
		 *
		 * @return {*}
		 */


		_decompressUncompressed(frameIndex = 0) {
			let buffer = this._dataSet.buffer;
			const numberOfChannels = this.numberOfChannels();
			const numPixels = this.rows(frameIndex) * this.columns(frameIndex) * numberOfChannels;

			if (!this.rightHanded()) {
				frameIndex = this.numberOfFrames() - 1 - frameIndex;
			}

			let frameOffset = frameIndex * numPixels; // unpack data if needed

			if (this._unpackedData === null && this._dataSet.encoding === 'gzip') {
				let unpackedData = pako__namespace.inflate(this._dataSet.buffer);
				this._unpackedData = unpackedData.buffer;
				buffer = this._unpackedData;
			} else if (this._dataSet.encoding === 'gzip') {
				buffer = this._unpackedData;
			}

			if (this._dataSet.type === 'int8' || this._dataSet.type === 'char') {
				return new Int8Array(buffer, frameOffset, numPixels);
			} else if (this._dataSet.type === 'uint8') {
				return new Uint8Array(buffer, frameOffset, numPixels);
			} else if (this._dataSet.type === 'int16' || this._dataSet.type === 'short') {
				frameOffset = frameOffset * 2;
				return new Int16Array(buffer, frameOffset, numPixels);
			} else if (this._dataSet.type === 'uint16') {
				frameOffset = frameOffset * 2;
				return new Uint16Array(buffer, frameOffset, numPixels);
			} else if (this._dataSet.type === 'int32') {
				frameOffset = frameOffset * 4;
				return new Int32Array(buffer, frameOffset, numPixels);
			} else if (this._dataSet.type === 'uint32') {
				frameOffset = frameOffset * 4;
				return new Uint32Array(buffer, frameOffset, numPixels);
			} else if (this._dataSet.type === 'float') {
				frameOffset = frameOffset * 4;
				return new Float32Array(buffer, frameOffset, numPixels);
			}
		}

	}

	/** * Imports ***/
	/**
	 * @module parsers/mgh
	 */

	class ParsersMgh extends ParsersVolume {
		constructor(data, id) {
			super();
			/**
			 * @member
			 * @type {arraybuffer}
			 */

			this._id = id;
			this._url = data.url;
			this._buffer = null;
			this._bufferPos = 0;
			this._dataPos = 0;
			this._pixelData = null; // Default MGH Header as described at:
			// https://surfer.nmr.mgh.harvard.edu/fswiki/FsTutorial/MghFormat
			// Image "header" with default values

			this._version = 1;
			this._width = 0;
			this._height = 0;
			this._depth = 0;
			this._nframes = 0;
			this._type = ParsersMgh.MRI_UCHAR; // 0-UCHAR, 4-SHORT, 1-INT, 3-FLOAT

			this._dof = 0;
			this._goodRASFlag = 0; // True: Use directional cosines, false assume CORONAL

			this._spacingXYZ = [1, 1, 1];
			this._Xras = [-1, 0, 0];
			this._Yras = [0, 0, -1];
			this._Zras = [0, 1, 0];
			this._Cras = [0, 0, 0]; // Image "footer"

			this._tr = 0; // ms

			this._flipAngle = 0; // radians

			this._te = 0; // ms

			this._ti = 0; // ms

			this._fov = 0; // from doc: IGNORE THIS FIELD (data is inconsistent)

			this._tags = []; // Will then contain variable length char strings
			// Other misc

			this._origin = [0, 0, 0];
			this._imageOrient = [0, 0, 0, 0, 0, 0]; // Read header
			// ArrayBuffer in data.buffer may need endian swap

			this._buffer = data.buffer;
			this._version = this._readInt();
			this._swapEndian = false;

			if (this._version == 1) ; else if (this._version == 16777216) {
				this._swapEndian = true;
				this._version = this._swap32(this._version);
			} else {
				const error = new Error('MGH/MGZ parser: Unknown Endian.	Version reports: ' + this._version);
				throw error;
			}

			this._width = this._readInt();
			this._height = this._readInt();
			this._depth = this._readInt(); // AMI calls this frames

			this._nframes = this._readInt();
			this._type = this._readInt();
			this._dof = this._readInt();
			this._goodRASFlag = this._readShort();
			this._spacingXYZ = this._readFloat(3);
			this._Xras = this._readFloat(3);
			this._Yras = this._readFloat(3);
			this._Zras = this._readFloat(3);
			this._Cras = this._readFloat(3);
			this._bufferPos = 284;
			let dataSize = this._width * this._height * this._depth * this._nframes;
			this._width * this._height * this._depth;

			switch (this._type) {
				case ParsersMgh.MRI_UCHAR:
					this._pixelData = this._readUChar(dataSize);
					break;

				case ParsersMgh.MRI_INT:
					this._pixelData = this._readInt(dataSize);
					break;

				case ParsersMgh.MRI_FLOAT:
					this._pixelData = this._readFloat(dataSize);
					break;

				case ParsersMgh.MRI_SHORT:
					this._pixelData = this._readShort(dataSize);
					break;

				default:
					throw Error('MGH/MGZ parser: Unknown _type.	_type reports: ' + this._type);
			}

			this._tr = this._readFloat(1);
			this._flipAngle = this._readFloat(1);
			this._te = this._readFloat(1);
			this._ti = this._readFloat(1);
			this._fov = this._readFloat(1);
			let enc = new TextDecoder();

			let t = this._tagReadStart();

			while (t[0] != undefined) {
				let tagType = t[0];
				let tagLen = t[1];
				let tagValue = undefined;

				switch (tagType) {
					case ParsersMgh.TAG_OLD_MGH_XFORM:
					case ParsersMgh.TAG_MGH_XFORM:
						tagValue = this._readChar(tagLen);
						break;

					default:
						tagValue = this._readChar(tagLen);
				}

				tagValue = enc.decode(tagValue);

				this._tags.push({
					tagType: tagType,
					tagValue: tagValue
				}); // read for next loop


				t = this._tagReadStart();
			} // detect if we are in a right handed coordinate system


			const first = new three.Vector3().fromArray(this._Xras);
			const second = new three.Vector3().fromArray(this._Yras);
			const crossFirstSecond = new three.Vector3().crossVectors(first, second);
			const third = new three.Vector3().fromArray(this._Zras);

			if (crossFirstSecond.angleTo(third) > Math.PI / 2) {
				this._rightHanded = false;
			} // - sign to move to LPS space


			this._imageOrient = [-this._Xras[0], -this._Xras[1], this._Xras[2], -this._Yras[0], -this._Yras[1], this._Yras[2]]; // Calculate origin

			let fcx = this._width / 2.0;
			let fcy = this._height / 2.0;
			let fcz = this._depth / 2.0;

			for (let ui = 0; ui < 3; ++ui) {
				this._origin[ui] = this._Cras[ui] - (this._Xras[ui] * this._spacingXYZ[0] * fcx + this._Yras[ui] * this._spacingXYZ[1] * fcy + this._Zras[ui] * this._spacingXYZ[2] * fcz);
			} // - sign to move to LPS space


			this._origin = [-this._origin[0], -this._origin[1], this._origin[2]];
		}

		seriesInstanceUID() {
			// use filename + timestamp..?
			return this._url;
		}

		numberOfFrames() {
			// AMI calls Z component frames, not T (_nframes)
			return this._depth;
		}

		sopInstanceUID(frameIndex = 0) {
			return frameIndex;
		}

		rows(frameIndex = 0) {
			return this._width;
		}

		columns(frameIndex = 0) {
			return this._height;
		}

		pixelType(frameIndex = 0) {
			// Return: 0 integer, 1 float
			switch (this._type) {
				case ParsersMgh.MRI_UCHAR:
				case ParsersMgh.MRI_INT:
				case ParsersMgh.MRI_SHORT:
					return 0;

				case ParsersMgh.MRI_FLOAT:
					return 1;

				default:
					throw Error('MGH/MGZ parser: Unknown _type.	_type reports: ' + this._type);
			}
		}

		bitsAllocated(frameIndex = 0) {
			switch (this._type) {
				case ParsersMgh.MRI_UCHAR:
					return 8;

				case ParsersMgh.MRI_SHORT:
					return 16;

				case ParsersMgh.MRI_INT:
				case ParsersMgh.MRI_FLOAT:
					return 32;

				default:
					throw Error('MGH/MGZ parser: Unknown _type.	_type reports: ' + this._type);
			}
		}

		pixelSpacing(frameIndex = 0) {
			return this._spacingXYZ;
		}

		imageOrientation(frameIndex = 0) {
			return this._imageOrient;
		}

		imagePosition(frameIndex = 0) {
			return this._origin;
		}

		extractPixelData(frameIndex = 0) {
			let sliceSize = this._width * this._height;
			return this._pixelData.slice(frameIndex * sliceSize, (frameIndex + 1) * sliceSize);
		} // signed int32


		_readInt(len = 1) {
			let tempBuff = new DataView(this._buffer.slice(this._bufferPos, this._bufferPos + len * 4));
			this._bufferPos += len * 4;
			let v = undefined;

			if (len == 1) {
				v = tempBuff.getInt32(0, this._swapEndian);
			} else {
				v = new Int32Array(len);

				for (let i = 0; i < len; i++) {
					v[i] = tempBuff.getInt32(i * 4, this._swapEndian);
				}
			}

			return v;
		} // signed int16


		_readShort(len = 1) {
			let tempBuff = new DataView(this._buffer.slice(this._bufferPos, this._bufferPos + len * 2));
			this._bufferPos += len * 2;
			let v = undefined;

			if (len == 1) {
				v = tempBuff.getInt16(0, this._swapEndian);
			} else {
				v = new Int16Array(len);

				for (let i = 0; i < len; i++) {
					v[i] = tempBuff.getInt16(i * 2, this._swapEndian);
				}
			}

			return v;
		} // signed int64


		_readLong(len = 1) {
			let tempBuff = new DataView(this._buffer.slice(this._bufferPos, this._bufferPos + len * 8));
			this._bufferPos += len * 8;
			let v = new Uint16Array(len);

			for (let i = 0; i < len; i++) {
				/* DataView doesn't have Int64.
				 * This work around based off Scalajs
				 * (https://github.com/scala-js/scala-js/blob/master/library/src/main/scala/scala/scalajs/js/typedarray/DataViewExt.scala)
				 * v[i]=tempBuff.getInt64(i*8,this._swapEndian);
				 */
				let shiftHigh = 0;
				let shiftLow = 0;

				if (this._swapendian) {
					shiftHigh = 4;
				} else {
					shiftLow = 4;
				}

				let high = tempBuff.getInt32(i * 8 + shiftHigh, this._swapEndian);
				let low = tempBuff.getInt32(i * 8 + shiftLow, this._swapEndian);

				if (high != 0) {
					console.log('Unable to read Int64 with high word: ' + high + 'low word: ' + low);
					low = undefined;
				}

				v[i] = low;
			}

			if (len == 0) {
				return undefined;
			} else if (len == 1) {
				return v[0];
			} else {
				return v;
			}
		} // signed int8


		_readChar(len = 1) {
			let tempBuff = new DataView(this._buffer.slice(this._bufferPos, this._bufferPos + len));
			this._bufferPos += len;
			let v = undefined;

			if (len == 1) {
				v = tempBuff.getInt8(0, this._swapEndian);
			} else {
				v = new Int8Array(len);

				for (let i = 0; i < len; i++) {
					v[i] = tempBuff.getInt8(i, this._swapEndian);
				}
			}

			return v;
		} // unsigned int8


		_readUChar(len = 1) {
			let tempBuff = new DataView(this._buffer.slice(this._bufferPos, this._bufferPos + len));
			this._bufferPos += len;
			let v = undefined;

			if (len == 1) {
				v = tempBuff.getUint8(0, this._swapEndian);
			} else {
				v = new Uint8Array(len);

				for (let i = 0; i < len; i++) {
					v[i] = tempBuff.getUint8(i, this._swapEndian);
				}
			}

			return v;
		} // float32


		_readFloat(len = 1) {
			let tempBuff = new DataView(this._buffer.slice(this._bufferPos, this._bufferPos + len * 4));
			this._bufferPos += len * 4;
			let v = undefined;

			if (len == 1) {
				v = tempBuff.getFloat32(0, this._swapEndian);
			} else {
				v = new Float32Array(len);

				for (let i = 0; i < len; i++) {
					v[i] = tempBuff.getFloat32(i * 4, this._swapEndian);
				}
			}

			return v;
		}

		_tagReadStart() {
			if (this._bufferPos >= this._buffer.byteLength) {
				return [undefined, undefined];
			}

			let tagType = this._readInt();

			let tagLen = undefined;

			switch (tagType) {
				case ParsersMgh.TAG_OLD_MGH_XFORM:
					tagLen = this._readInt();
					tagLen -= 1;
					break;

				case ParsersMgh.TAG_OLD_SURF_GEOM:
				case ParsersMgh.TAG_OLD_USEREALRAS:
				case ParsersMgh.TAG_OLD_COLORTABLE:
					tagLen = 0;
					break;

				default:
					tagLen = this._readLong();
			}

			if (tagLen == undefined) {
				tagType = undefined;
			}

			return [tagType, tagLen];
		}

	} // https://github.com/freesurfer/freesurfer/
	// See include/mri.h

	ParsersMgh.MRI_UCHAR = 0;
	ParsersMgh.MRI_INT = 1;
	ParsersMgh.MRI_LONG = 2;
	ParsersMgh.MRI_FLOAT = 3;
	ParsersMgh.MRI_SHORT = 4;
	ParsersMgh.MRI_BITMAP = 5;
	ParsersMgh.MRI_TENSOR = 6;
	ParsersMgh.MRI_FLOAT_COMPLEX = 7;
	ParsersMgh.MRI_DOUBLE_COMPLEX = 8;
	ParsersMgh.MRI_RGB = 9; // https://github.com/freesurfer/freesurfer/
	// See include/tags.h

	ParsersMgh.TAG_OLD_COLORTABLE = 1;
	ParsersMgh.TAG_OLD_USEREALRAS = 2;
	ParsersMgh.TAG_CMDLINE = 3;
	ParsersMgh.TAG_USEREALRAS = 4;
	ParsersMgh.TAG_COLORTABLE = 5;
	ParsersMgh.TAG_GCAMORPH_GEOM = 10;
	ParsersMgh.TAG_GCAMORPH_TYPE = 11;
	ParsersMgh.TAG_GCAMORPH_LABELS = 12;
	ParsersMgh.TAG_OLD_SURF_GEOM = 20;
	ParsersMgh.TAG_SURF_GEOM = 21;
	ParsersMgh.TAG_OLD_MGH_XFORM = 30;
	ParsersMgh.TAG_MGH_XFORM = 31;
	ParsersMgh.TAG_GROUP_AVG_SURFACE_AREA = 32;
	ParsersMgh.TAG_AUTO_ALIGN = 33;
	ParsersMgh.TAG_SCALAR_DOUBLE = 40;
	ParsersMgh.TAG_PEDIR = 41;
	ParsersMgh.TAG_MRI_FRAME = 42;
	ParsersMgh.TAG_FIELDSTRENGTH = 43;

	/** * Imports ***/
	const PAKO = require('pako');
	/**
	 *
	 * It is typically used to load a DICOM image. Use loading manager for
	 * advanced usage, such as multiple files handling.
	 *
	 * Demo: {@link https://fnndsc.github.io/vjs#loader_dicom}
	 *
	 * @module loaders/volumes
	 * @example
	 * var files = ['/data/dcm/fruit'];
	 *
	 * // Instantiate a dicom loader
	 * var lDicomoader = new dicom();
	 *
	 * // load a resource
	 * loader.load(
	 *	 // resource URL
	 *	 files[0],
	 *	 // Function when resource is loaded
	 *	 function(object) {
	 *		 //scene.add( object );
	 *		 console.log(object);
	 *	 }
	 * );
	 */

	class LoadersVolumes extends LoadersBase {
		/**
		 * Parse response.
		 * response is formated as:
		 *		{
		 *			url: 'resource url',
		 *			buffer: xmlresponse,
		 *		}
		 * @param {object} response - response
		 * @return {promise} promise
		 */
		parse(response) {
			// emit 'parse-start' event
			this.emit('parse-start', {
				file: response.url,
				time: new Date()
			}); // give a chance to the UI to update because
			// after the rendering will be blocked with intensive JS
			// will be removed after eventer set up

			if (this._progressBar) {
				this._progressBar.update(0, 100, 'parse', response.url);
			}

			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve(new Promise((resolve, reject) => {
						let data = response;

						if (!Array.isArray(data)) {
							data = [data];
						}

						data.forEach(dataset => {
							this._preprocess(dataset);
						});

						if (data.length === 1) {
							data = data[0];
						} else {
							// if raw/mhd pair
							let mhdFile = data.filter(this._filterByExtension.bind(null, 'MHD'));
							let rawFile = data.filter(this._filterByExtension.bind(null, 'RAW'));

							if (data.length === 2 && mhdFile.length === 1 && rawFile.length === 1) {
								data.url = mhdFile[0].url;
								data.extension = mhdFile[0].extension;
								data.mhdBuffer = mhdFile[0].buffer;
								data.rawBuffer = rawFile[0].buffer;
							}
						}

						let Parser = this._parser(data.extension);

						if (!Parser) {
							// emit 'parse-error' event
							this.emit('parse-error', {
								file: response.url,
								time: new Date(),
								error: data.filename + 'can not be parsed.'
							});
							reject(data.filename + ' can not be parsed.');
						} // check extension


						let volumeParser = null;

						try {
							volumeParser = new Parser(data, 0);
						} catch (e) {
							console.warn(e); // emit 'parse-error' event

							this.emit('parse-error', {
								file: response.url,
								time: new Date(),
								error: e
							});
							reject(e);
						} // create a series


						let series = new ModelsSeries();
						series.rawHeader = volumeParser.rawHeader(); // global information

						series.seriesInstanceUID = volumeParser.seriesInstanceUID();
						series.transferSyntaxUID = volumeParser.transferSyntaxUID();
						series.seriesDate = volumeParser.seriesDate();
						series.seriesDescription = volumeParser.seriesDescription();
						series.studyDate = volumeParser.studyDate();
						series.studyDescription = volumeParser.studyDescription();
						series.numberOfFrames = volumeParser.numberOfFrames();

						if (!series.numberOfFrames) {
							series.numberOfFrames = 1;
						}

						series.numberOfChannels = volumeParser.numberOfChannels();
						series.modality = volumeParser.modality(); // if it is a segmentation, attach extra information

						if (series.modality === 'SEG') {
							// colors
							// labels
							// etc.
							series.segmentationType = volumeParser.segmentationType();
							series.segmentationSegments = volumeParser.segmentationSegments();
						} // patient information


						series.patientID = volumeParser.patientID();
						series.patientName = volumeParser.patientName();
						series.patientAge = volumeParser.patientAge();
						series.patientBirthdate = volumeParser.patientBirthdate();
						series.patientSex = volumeParser.patientSex(); // just create 1 dummy stack for now

						let stack = new ModelsStack();
						stack.numberOfChannels = volumeParser.numberOfChannels();
						stack.pixelRepresentation = volumeParser.pixelRepresentation();
						stack.pixelType = volumeParser.pixelType();
						stack.invert = volumeParser.invert();
						stack.spacingBetweenSlices = volumeParser.spacingBetweenSlices();
						stack.modality = series.modality; // if it is a segmentation, attach extra information

						if (stack.modality === 'SEG') {
							// colors
							// labels
							// etc.
							stack.segmentationType = series.segmentationType;
							stack.segmentationSegments = series.segmentationSegments;
						}

						series.stack.push(stack); // recursive call for each frame
						// better than for loop to be able
						// to update dom with "progress" callback

						setTimeout(this.parseFrameClosure(series, stack, response.url, 0, volumeParser, resolve, reject), 0);
					}));
				}, 10);
			});
		}

		parseFrameClosure(series, stack, url, i, dataParser, resolve, reject) {
			return () => {
				this.parseFrame(series, stack, url, i, dataParser, resolve, reject);
			};
		}
		/**
		 * recursive parse frame
		 * @param {ModelsSeries} series - data series
		 * @param {ModelsStack} stack - data stack
		 * @param {string} url - resource url
		 * @param {number} i - frame index
		 * @param {parser} dataParser - selected parser
		 * @param {promise.resolve} resolve - promise resolve args
		 * @param {promise.reject} reject - promise reject args
		 */


		parseFrame(series, stack, url, i, dataParser, resolve, reject) {
			let frame = new ModelsFrame();
			frame.sopInstanceUID = dataParser.sopInstanceUID(i);
			frame.url = url;
			frame.index = i;
			frame.invert = stack.invert;
			frame.frameTime = dataParser.frameTime(i);
			frame.ultrasoundRegions = dataParser.ultrasoundRegions(i);
			frame.rows = dataParser.rows(i);
			frame.columns = dataParser.columns(i);
			frame.numberOfChannels = stack.numberOfChannels;
			frame.pixelPaddingValue = dataParser.pixelPaddingValue(i);
			frame.pixelRepresentation = stack.pixelRepresentation;
			frame.pixelType = stack.pixelType;
			frame.pixelData = dataParser.extractPixelData(i);
			frame.pixelSpacing = dataParser.pixelSpacing(i);
			frame.spacingBetweenSlices = dataParser.spacingBetweenSlices(i);
			frame.sliceThickness = dataParser.sliceThickness(i);
			frame.imageOrientation = dataParser.imageOrientation(i);
			frame.rightHanded = dataParser.rightHanded();
			stack.rightHanded = frame.rightHanded;

			if (frame.imageOrientation === null) {
				frame.imageOrientation = [1, 0, 0, 0, 1, 0];
			}

			frame.imagePosition = dataParser.imagePosition(i);
			/*
			null ImagePosition should not be handle here
			if (frame.imagePosition === null) {
				frame.imagePosition = [0, 0, i];
			}*/

			frame.dimensionIndexValues = dataParser.dimensionIndexValues(i);
			frame.bitsAllocated = dataParser.bitsAllocated(i);
			frame.instanceNumber = dataParser.instanceNumber(i);
			frame.windowCenter = dataParser.windowCenter(i);
			frame.windowWidth = dataParser.windowWidth(i);
			frame.rescaleSlope = dataParser.rescaleSlope(i);
			frame.rescaleIntercept = dataParser.rescaleIntercept(i); // should pass frame index for consistency...

			frame.minMax = dataParser.minMaxPixelData(frame.pixelData); // if series.mo

			if (series.modality === 'SEG') {
				frame.referencedSegmentNumber = dataParser.referencedSegmentNumber(i);
			}

			stack.frame.push(frame); // update status

			this._parsed = i + 1;
			this._totalParsed = series.numberOfFrames; // will be removed after eventer set up

			if (this._progressBar) {
				this._progressBar.update(this._parsed, this._totalParsed, 'parse', url);
			} // emit 'parsing' event


			this.emit('parsing', {
				file: url,
				total: this._totalParsed,
				parsed: this._parsed,
				time: new Date()
			});

			if (this._parsed === this._totalParsed) {
				// emit 'parse-success' event
				this.emit('parse-success', {
					file: url,
					total: this._totalParsed,
					parsed: this._parsed,
					time: new Date()
				});
				resolve(series);
			} else {
				setTimeout(this.parseFrameClosure(series, stack, url, this._parsed, dataParser, resolve, reject), 0);
			}
		}
		/**
		 * Return parser given an extension
		 * @param {string} extension - extension
		 * @return {parser} selected parser
		 */


		_parser(extension) {
			let Parser = null;

			switch (extension.toUpperCase()) {
				case 'NII':
				case 'NII_':
					Parser = ParsersNifti$1;
					break;

				case 'DCM':
				case 'DIC':
				case 'DICOM':
				case 'IMA':
				case '':
					Parser = ParsersDicom;
					break;

				case 'MHD':
					Parser = ParsersMHD;
					break;

				case 'NRRD':
					Parser = ParsersNifti;
					break;

				case 'MGH':
				case 'MGZ':
					Parser = ParsersMgh;
					break;

				default:
					console.warn('unsupported extension: ' + extension);
					return false;
			}

			return Parser;
		}
		/**
		 * Pre-process data to be parsed (find data type and de-compress)
		 * @param {*} data
		 */


		_preprocess(data) {
			const parsedUrl = CoreUtils.parseUrl(data.url); // update data

			data.filename = parsedUrl.filename;
			data.extension = parsedUrl.extension;
			data.pathname = parsedUrl.pathname;
			data.query = parsedUrl.query; // unzip if extension is '.gz'

			if (data.extension === 'gz') {
				data.gzcompressed = true;
				data.extension = data.filename.split('.gz').shift().split('.').pop();
			} else if (data.extension === 'mgz') {
				data.gzcompressed = true;
				data.extension = 'mgh';
			} else if (data.extension === 'zraw') {
				data.gzcompressed = true;
				data.extension = 'raw';
			} else {
				data.gzcompressed = false;
			}

			if (data.gzcompressed) {
				let decompressedData = PAKO.inflate(data.buffer);
				data.buffer = decompressedData.buffer;
			}
		}
		/**
		 * Filter data by extension
		 * @param {*} extension
		 * @param {*} item
		 * @returns Boolean
		 */


		_filterByExtension(extension, item) {
			if (item.extension.toUpperCase() === extension.toUpperCase()) {
				return true;
			}

			return false;
		}

	}

	/**
	 * @module models/voxel
	 */
	class ModelsVoxel {
		constructor() {
			this._id = -1;
			this._worldCoordinates = null;
			this._dataCoordinates = null;
			this._screenCoordinates = null;
			this._value = null;
		}

		set worldCoordinates(worldCoordinates) {
			this._worldCoordinates = worldCoordinates;
		}

		get worldCoordinates() {
			return this._worldCoordinates;
		}

		set dataCoordinates(dataCoordinates) {
			this._dataCoordinates = dataCoordinates;
		}

		get dataCoordinates() {
			return this._dataCoordinates;
		}

		set screenCoordinates(screenCoordinates) {
			this._screenCoordinates = screenCoordinates;
		}

		get screenCoordinates() {
			return this._screenCoordinates;
		}

		set value(value) {
			this._value = value;
		}

		get value() {
			return this._value;
		}

		set id(id) {
			this._id = id;
		}

		get id() {
			return this._id;
		}

	}

	const segmentationFs = {
		0: {
			color: [0, 0, 0],
			opacity: 0,
			label: 'Unknown'
		},
		1: {
			color: [70, 130, 180],
			opacity: 1,
			label: 'Left-Cerebral-Exterior'
		},
		2: {
			color: [245, 245, 245],
			opacity: 1,
			label: 'Left-Cerebral-White-Matter'
		},
		3: {
			color: [205, 62, 78],
			opacity: 1,
			label: 'Left-Cerebral-Cortex'
		},
		4: {
			color: [120, 18, 134],
			opacity: 1,
			label: 'Left-Lateral-Ventricle'
		},
		5: {
			color: [196, 58, 250],
			opacity: 1,
			label: 'Left-Inf-Lat-Vent'
		},
		6: {
			color: [0, 148, 0],
			opacity: 1,
			label: 'Left-Cerebellum-Exterior'
		},
		7: {
			color: [220, 248, 164],
			opacity: 1,
			label: 'Left-Cerebellum-White-Matter'
		},
		8: {
			color: [230, 148, 34],
			opacity: 1,
			label: 'Left-Cerebellum-Cortex'
		},
		9: {
			color: [0, 118, 14],
			opacity: 1,
			label: 'Left-Thalamus'
		},
		10: {
			color: [0, 118, 14],
			opacity: 1,
			label: 'Left-Thalamus-Proper'
		},
		11: {
			color: [122, 186, 220],
			opacity: 1,
			label: 'Left-Caudate'
		},
		12: {
			color: [236, 13, 176],
			opacity: 1,
			label: 'Left-Putamen'
		},
		13: {
			color: [12, 48, 255],
			opacity: 1,
			label: 'Left-Pallidum'
		},
		14: {
			color: [204, 182, 142],
			opacity: 1,
			label: '3rd-Ventricle'
		},
		15: {
			color: [42, 204, 164],
			opacity: 1,
			label: '4th-Ventricle'
		},
		16: {
			color: [119, 159, 176],
			opacity: 1,
			label: 'Brain-Stem'
		},
		17: {
			color: [220, 216, 20],
			opacity: 1,
			label: 'Left-Hippocampus'
		},
		18: {
			color: [103, 255, 255],
			opacity: 1,
			label: 'Left-Amygdala'
		},
		19: {
			color: [80, 196, 98],
			opacity: 1,
			label: 'Left-Insula'
		},
		20: {
			color: [60, 58, 210],
			opacity: 1,
			label: 'Left-Operculum'
		},
		21: {
			color: [60, 58, 210],
			opacity: 1,
			label: 'Line-1'
		},
		22: {
			color: [60, 58, 210],
			opacity: 1,
			label: 'Line-2'
		},
		23: {
			color: [60, 58, 210],
			opacity: 1,
			label: 'Line-3'
		},
		24: {
			color: [60, 60, 60],
			opacity: 1,
			label: 'CSF'
		},
		25: {
			color: [255, 165, 0],
			opacity: 1,
			label: 'Left-Lesion'
		},
		26: {
			color: [255, 165, 0],
			opacity: 1,
			label: 'Left-Accumbens-area'
		},
		27: {
			color: [0, 255, 127],
			opacity: 1,
			label: 'Left-Substancia-Nigra'
		},
		28: {
			color: [165, 42, 42],
			opacity: 1,
			label: 'Left-VentralDC'
		},
		29: {
			color: [135, 206, 235],
			opacity: 1,
			label: 'Left-undetermined'
		},
		30: {
			color: [160, 32, 240],
			opacity: 1,
			label: 'Left-vessel'
		},
		31: {
			color: [0, 200, 200],
			opacity: 1,
			label: 'Left-choroid-plexus'
		},
		32: {
			color: [100, 50, 100],
			opacity: 1,
			label: 'Left-F3orb'
		},
		33: {
			color: [135, 50, 74],
			opacity: 1,
			label: 'Left-lOg'
		},
		34: {
			color: [122, 135, 50],
			opacity: 1,
			label: 'Left-aOg'
		},
		35: {
			color: [51, 50, 135],
			opacity: 1,
			label: 'Left-mOg'
		},
		36: {
			color: [74, 155, 60],
			opacity: 1,
			label: 'Left-pOg'
		},
		37: {
			color: [120, 62, 43],
			opacity: 1,
			label: 'Left-Stellate'
		},
		38: {
			color: [74, 155, 60],
			opacity: 1,
			label: 'Left-Porg'
		},
		39: {
			color: [122, 135, 50],
			opacity: 1,
			label: 'Left-Aorg'
		},
		40: {
			color: [70, 130, 180],
			opacity: 1,
			label: 'Right-Cerebral-Exterior'
		},
		41: {
			color: [245, 245, 245],
			opacity: 1,
			label: 'Right-Cerebral-White-Matter'
		},
		42: {
			color: [205, 62, 78],
			opacity: 1,
			label: 'Right-Cerebral-Cortex'
		},
		43: {
			color: [120, 18, 134],
			opacity: 1,
			label: 'Right-Lateral-Ventricle'
		},
		44: {
			color: [196, 58, 250],
			opacity: 1,
			label: 'Right-Inf-Lat-Vent'
		},
		45: {
			color: [0, 148, 0],
			opacity: 1,
			label: 'Right-Cerebellum-Exterior'
		},
		46: {
			color: [220, 248, 164],
			opacity: 1,
			label: 'Right-Cerebellum-White-Matter'
		},
		47: {
			color: [230, 148, 34],
			opacity: 1,
			label: 'Right-Cerebellum-Cortex'
		},
		48: {
			color: [0, 118, 14],
			opacity: 1,
			label: 'Right-Thalamus'
		},
		49: {
			color: [0, 118, 14],
			opacity: 1,
			label: 'Right-Thalamus-Proper'
		},
		50: {
			color: [122, 186, 220],
			opacity: 1,
			label: 'Right-Caudate'
		},
		51: {
			color: [236, 13, 176],
			opacity: 1,
			label: 'Right-Putamen'
		},
		52: {
			color: [13, 48, 255],
			opacity: 1,
			label: 'Right-Pallidum'
		},
		53: {
			color: [220, 216, 20],
			opacity: 1,
			label: 'Right-Hippocampus'
		},
		54: {
			color: [103, 255, 255],
			opacity: 1,
			label: 'Right-Amygdala'
		},
		55: {
			color: [80, 196, 98],
			opacity: 1,
			label: 'Right-Insula'
		},
		56: {
			color: [60, 58, 210],
			opacity: 1,
			label: 'Right-Operculum'
		},
		57: {
			color: [255, 165, 0],
			opacity: 1,
			label: 'Right-Lesion'
		},
		58: {
			color: [255, 165, 0],
			opacity: 1,
			label: 'Right-Accumbens-area'
		},
		59: {
			color: [0, 255, 127],
			opacity: 1,
			label: 'Right-Substancia-Nigra'
		},
		60: {
			color: [165, 42, 42],
			opacity: 1,
			label: 'Right-VentralDC'
		},
		61: {
			color: [135, 206, 235],
			opacity: 1,
			label: 'Right-undetermined'
		},
		62: {
			color: [160, 32, 240],
			opacity: 1,
			label: 'Right-vessel'
		},
		63: {
			color: [0, 200, 221],
			opacity: 1,
			label: 'Right-choroid-plexus'
		},
		64: {
			color: [100, 50, 100],
			opacity: 1,
			label: 'Right-F3orb'
		},
		65: {
			color: [135, 50, 74],
			opacity: 1,
			label: 'Right-lOg'
		},
		66: {
			color: [122, 135, 50],
			opacity: 1,
			label: 'Right-aOg'
		},
		67: {
			color: [51, 50, 135],
			opacity: 1,
			label: 'Right-mOg'
		},
		68: {
			color: [74, 155, 60],
			opacity: 1,
			label: 'Right-pOg'
		},
		69: {
			color: [120, 62, 43],
			opacity: 1,
			label: 'Right-Stellate'
		},
		70: {
			color: [74, 155, 60],
			opacity: 1,
			label: 'Right-Porg'
		},
		71: {
			color: [122, 135, 50],
			opacity: 1,
			label: 'Right-Aorg'
		},
		72: {
			color: [120, 190, 150],
			opacity: 1,
			label: '5th-Ventricle'
		},
		73: {
			color: [122, 135, 50],
			opacity: 1,
			label: 'Left-Interior'
		},
		74: {
			color: [122, 135, 50],
			opacity: 1,
			label: 'Right-Interior'
		},
		77: {
			color: [200, 70, 255],
			opacity: 1,
			label: 'WM-hypointensities'
		},
		78: {
			color: [255, 148, 10],
			opacity: 1,
			label: 'Left-WM-hypointensities'
		},
		79: {
			color: [255, 148, 10],
			opacity: 1,
			label: 'Right-WM-hypointensities'
		},
		80: {
			color: [164, 108, 226],
			opacity: 1,
			label: 'non-WM-hypointensities'
		},
		81: {
			color: [164, 108, 226],
			opacity: 1,
			label: 'Left-non-WM-hypointensities'
		},
		82: {
			color: [164, 108, 226],
			opacity: 1,
			label: 'Right-non-WM-hypointensities'
		},
		83: {
			color: [255, 218, 185],
			opacity: 1,
			label: 'Left-F1'
		},
		84: {
			color: [255, 218, 185],
			opacity: 1,
			label: 'Right-F1'
		},
		85: {
			color: [234, 169, 30],
			opacity: 1,
			label: 'Optic-Chiasm'
		},
		192: {
			color: [250, 255, 50],
			opacity: 1,
			label: 'Corpus_Callosum'
		},
		86: {
			color: [200, 120, 255],
			opacity: 1,
			label: 'Left_future_WMSA'
		},
		87: {
			color: [200, 121, 255],
			opacity: 1,
			label: 'Right_future_WMSA'
		},
		88: {
			color: [200, 122, 255],
			opacity: 1,
			label: 'future_WMSA'
		},
		96: {
			color: [205, 10, 125],
			opacity: 1,
			label: 'Left-Amygdala-Anterior'
		},
		97: {
			color: [205, 10, 125],
			opacity: 1,
			label: 'Right-Amygdala-Anterior'
		},
		98: {
			color: [160, 32, 240],
			opacity: 1,
			label: 'Dura'
		},
		100: {
			color: [124, 140, 178],
			opacity: 1,
			label: 'Left-wm-intensity-abnormality'
		},
		101: {
			color: [125, 140, 178],
			opacity: 1,
			label: 'Left-caudate-intensity-abnormality'
		},
		102: {
			color: [126, 140, 178],
			opacity: 1,
			label: 'Left-putamen-intensity-abnormality'
		},
		103: {
			color: [127, 140, 178],
			opacity: 1,
			label: 'Left-accumbens-intensity-abnormality'
		},
		104: {
			color: [124, 141, 178],
			opacity: 1,
			label: 'Left-pallidum-intensity-abnormality'
		},
		105: {
			color: [124, 142, 178],
			opacity: 1,
			label: 'Left-amygdala-intensity-abnormality'
		},
		106: {
			color: [124, 143, 178],
			opacity: 1,
			label: 'Left-hippocampus-intensity-abnormality'
		},
		107: {
			color: [124, 144, 178],
			opacity: 1,
			label: 'Left-thalamus-intensity-abnormality'
		},
		108: {
			color: [124, 140, 179],
			opacity: 1,
			label: 'Left-VDC-intensity-abnormality'
		},
		109: {
			color: [124, 140, 178],
			opacity: 1,
			label: 'Right-wm-intensity-abnormality'
		},
		110: {
			color: [125, 140, 178],
			opacity: 1,
			label: 'Right-caudate-intensity-abnormality'
		},
		111: {
			color: [126, 140, 178],
			opacity: 1,
			label: 'Right-putamen-intensity-abnormality'
		},
		112: {
			color: [127, 140, 178],
			opacity: 1,
			label: 'Right-accumbens-intensity-abnormality'
		},
		113: {
			color: [124, 141, 178],
			opacity: 1,
			label: 'Right-pallidum-intensity-abnormality'
		},
		114: {
			color: [124, 142, 178],
			opacity: 1,
			label: 'Right-amygdala-intensity-abnormality'
		},
		115: {
			color: [124, 143, 178],
			opacity: 1,
			label: 'Right-hippocampus-intensity-abnormality'
		},
		116: {
			color: [124, 144, 178],
			opacity: 1,
			label: 'Right-thalamus-intensity-abnormality'
		},
		117: {
			color: [124, 140, 179],
			opacity: 1,
			label: 'Right-VDC-intensity-abnormality'
		},
		118: {
			color: [255, 20, 147],
			opacity: 1,
			label: 'Epidermis'
		},
		119: {
			color: [205, 179, 139],
			opacity: 1,
			label: 'Conn-Tissue'
		},
		120: {
			color: [238, 238, 209],
			opacity: 1,
			label: 'SC-Fat-Muscle'
		},
		121: {
			color: [200, 200, 200],
			opacity: 1,
			label: 'Cranium'
		},
		122: {
			color: [74, 255, 74],
			opacity: 1,
			label: 'CSF-SA'
		},
		123: {
			color: [238, 0, 0],
			opacity: 1,
			label: 'Muscle'
		},
		124: {
			color: [0, 0, 139],
			opacity: 1,
			label: 'Ear'
		},
		125: {
			color: [173, 255, 47],
			opacity: 1,
			label: 'Adipose'
		},
		126: {
			color: [133, 203, 229],
			opacity: 1,
			label: 'Spinal-Cord'
		},
		127: {
			color: [26, 237, 57],
			opacity: 1,
			label: 'Soft-Tissue'
		},
		128: {
			color: [34, 139, 34],
			opacity: 1,
			label: 'Nerve'
		},
		129: {
			color: [30, 144, 255],
			opacity: 1,
			label: 'Bone'
		},
		130: {
			color: [147, 19, 173],
			opacity: 1,
			label: 'Air'
		},
		131: {
			color: [238, 59, 59],
			opacity: 1,
			label: 'Orbital-Fat'
		},
		132: {
			color: [221, 39, 200],
			opacity: 1,
			label: 'Tongue'
		},
		133: {
			color: [238, 174, 238],
			opacity: 1,
			label: 'Nasal-Structures'
		},
		134: {
			color: [255, 0, 0],
			opacity: 1,
			label: 'Globe'
		},
		135: {
			color: [72, 61, 139],
			opacity: 1,
			label: 'Teeth'
		},
		136: {
			color: [21, 39, 132],
			opacity: 1,
			label: 'Left-Caudate-Putamen'
		},
		137: {
			color: [21, 39, 132],
			opacity: 1,
			label: 'Right-Caudate-Putamen'
		},
		138: {
			color: [65, 135, 20],
			opacity: 1,
			label: 'Left-Claustrum'
		},
		139: {
			color: [65, 135, 20],
			opacity: 1,
			label: 'Right-Claustrum'
		},
		140: {
			color: [134, 4, 160],
			opacity: 1,
			label: 'Cornea'
		},
		142: {
			color: [221, 226, 68],
			opacity: 1,
			label: 'Diploe'
		},
		143: {
			color: [255, 255, 254],
			opacity: 1,
			label: 'Vitreous-Humor'
		},
		144: {
			color: [52, 209, 226],
			opacity: 1,
			label: 'Lens'
		},
		145: {
			color: [239, 160, 223],
			opacity: 1,
			label: 'Aqueous-Humor'
		},
		146: {
			color: [70, 130, 180],
			opacity: 1,
			label: 'Outer-Table'
		},
		147: {
			color: [70, 130, 181],
			opacity: 1,
			label: 'Inner-Table'
		},
		148: {
			color: [139, 121, 94],
			opacity: 1,
			label: 'Periosteum'
		},
		149: {
			color: [224, 224, 224],
			opacity: 1,
			label: 'Endosteum'
		},
		150: {
			color: [255, 0, 0],
			opacity: 1,
			label: 'R-C-S'
		},
		151: {
			color: [205, 205, 0],
			opacity: 1,
			label: 'Iris'
		},
		152: {
			color: [238, 238, 209],
			opacity: 1,
			label: 'SC-Adipose-Muscle'
		},
		153: {
			color: [139, 121, 94],
			opacity: 1,
			label: 'SC-Tissue'
		},
		154: {
			color: [238, 59, 59],
			opacity: 1,
			label: 'Orbital-Adipose'
		},
		155: {
			color: [238, 59, 59],
			opacity: 1,
			label: 'Left-IntCapsule-Ant'
		},
		156: {
			color: [238, 59, 59],
			opacity: 1,
			label: 'Right-IntCapsule-Ant'
		},
		157: {
			color: [62, 10, 205],
			opacity: 1,
			label: 'Left-IntCapsule-Pos'
		},
		158: {
			color: [62, 10, 205],
			opacity: 1,
			label: 'Right-IntCapsule-Pos'
		},
		159: {
			color: [0, 118, 14],
			opacity: 1,
			label: 'Left-Cerebral-WM-unmyelinated'
		},
		160: {
			color: [0, 118, 14],
			opacity: 1,
			label: 'Right-Cerebral-WM-unmyelinated'
		},
		161: {
			color: [220, 216, 21],
			opacity: 1,
			label: 'Left-Cerebral-WM-myelinated'
		},
		162: {
			color: [220, 216, 21],
			opacity: 1,
			label: 'Right-Cerebral-WM-myelinated'
		},
		163: {
			color: [122, 186, 220],
			opacity: 1,
			label: 'Left-Subcortical-Gray-Matter'
		},
		164: {
			color: [122, 186, 220],
			opacity: 1,
			label: 'Right-Subcortical-Gray-Matter'
		},
		165: {
			color: [120, 120, 120],
			opacity: 1,
			label: 'Skull'
		},
		166: {
			color: [14, 48, 255],
			opacity: 1,
			label: 'Posterior-fossa'
		},
		167: {
			color: [166, 42, 42],
			opacity: 1,
			label: 'Scalp'
		},
		168: {
			color: [121, 18, 134],
			opacity: 1,
			label: 'Hematoma'
		},
		169: {
			color: [236, 13, 127],
			opacity: 1,
			label: 'Left-Basal-Ganglia'
		},
		176: {
			color: [236, 13, 126],
			opacity: 1,
			label: 'Right-Basal-Ganglia'
		},
		170: {
			color: [119, 159, 176],
			opacity: 1,
			label: 'brainstem'
		},
		171: {
			color: [119, 0, 176],
			opacity: 1,
			label: 'DCG'
		},
		172: {
			color: [119, 100, 176],
			opacity: 1,
			label: 'Vermis'
		},
		173: {
			color: [242, 104, 76],
			opacity: 1,
			label: 'Midbrain'
		},
		174: {
			color: [206, 195, 58],
			opacity: 1,
			label: 'Pons'
		},
		175: {
			color: [119, 159, 176],
			opacity: 1,
			label: 'Medulla'
		},
		177: {
			color: [119, 50, 176],
			opacity: 1,
			label: 'Vermis-White-Matter'
		},
		178: {
			color: [142, 182, 0],
			opacity: 1,
			label: 'SCP'
		},
		179: {
			color: [19, 100, 176],
			opacity: 1,
			label: 'Floculus'
		},
		180: {
			color: [73, 61, 139],
			opacity: 1,
			label: 'Left-Cortical-Dysplasia'
		},
		181: {
			color: [73, 62, 139],
			opacity: 1,
			label: 'Right-Cortical-Dysplasia'
		},
		182: {
			color: [10, 100, 176],
			opacity: 1,
			label: 'CblumNodulus'
		},
		193: {
			color: [0, 196, 255],
			opacity: 1,
			label: 'Left-hippocampal_fissure'
		},
		194: {
			color: [255, 164, 164],
			opacity: 1,
			label: 'Left-CADG-head'
		},
		195: {
			color: [196, 196, 0],
			opacity: 1,
			label: 'Left-subiculum'
		},
		196: {
			color: [0, 100, 255],
			opacity: 1,
			label: 'Left-fimbria'
		},
		197: {
			color: [128, 196, 164],
			opacity: 1,
			label: 'Right-hippocampal_fissure'
		},
		198: {
			color: [0, 126, 75],
			opacity: 1,
			label: 'Right-CADG-head'
		},
		199: {
			color: [128, 96, 64],
			opacity: 1,
			label: 'Right-subiculum'
		},
		200: {
			color: [0, 50, 128],
			opacity: 1,
			label: 'Right-fimbria'
		},
		201: {
			color: [255, 204, 153],
			opacity: 1,
			label: 'alveus'
		},
		202: {
			color: [255, 128, 128],
			opacity: 1,
			label: 'perforant_pathway'
		},
		203: {
			color: [255, 255, 0],
			opacity: 1,
			label: 'parasubiculum'
		},
		204: {
			color: [64, 0, 64],
			opacity: 1,
			label: 'presubiculum'
		},
		205: {
			color: [0, 0, 255],
			opacity: 1,
			label: 'subiculum'
		},
		206: {
			color: [255, 0, 0],
			opacity: 1,
			label: 'CA1'
		},
		207: {
			color: [128, 128, 255],
			opacity: 1,
			label: 'CA2'
		},
		208: {
			color: [0, 128, 0],
			opacity: 1,
			label: 'CA3'
		},
		209: {
			color: [196, 160, 128],
			opacity: 1,
			label: 'CA4'
		},
		210: {
			color: [32, 200, 255],
			opacity: 1,
			label: 'GC-DG'
		},
		211: {
			color: [128, 255, 128],
			opacity: 1,
			label: 'HATA'
		},
		212: {
			color: [204, 153, 204],
			opacity: 1,
			label: 'fimbria'
		},
		213: {
			color: [121, 17, 136],
			opacity: 1,
			label: 'lateral_ventricle'
		},
		214: {
			color: [128, 0, 0],
			opacity: 1,
			label: 'molecular_layer_HP'
		},
		215: {
			color: [128, 32, 255],
			opacity: 1,
			label: 'hippocampal_fissure'
		},
		216: {
			color: [255, 204, 102],
			opacity: 1,
			label: 'entorhinal_cortex'
		},
		217: {
			color: [128, 128, 128],
			opacity: 1,
			label: 'molecular_layer_subiculum'
		},
		218: {
			color: [104, 255, 255],
			opacity: 1,
			label: 'Amygdala'
		},
		219: {
			color: [0, 226, 0],
			opacity: 1,
			label: 'Cerebral_White_Matter'
		},
		220: {
			color: [205, 63, 78],
			opacity: 1,
			label: 'Cerebral_Cortex'
		},
		221: {
			color: [197, 58, 250],
			opacity: 1,
			label: 'Inf_Lat_Vent'
		},
		222: {
			color: [33, 150, 250],
			opacity: 1,
			label: 'Perirhinal'
		},
		223: {
			color: [226, 0, 0],
			opacity: 1,
			label: 'Cerebral_White_Matter_Edge'
		},
		224: {
			color: [100, 100, 100],
			opacity: 1,
			label: 'Background'
		},
		225: {
			color: [197, 150, 250],
			opacity: 1,
			label: 'Ectorhinal'
		},
		226: {
			color: [170, 170, 255],
			opacity: 1,
			label: 'HP_tail'
		},
		250: {
			color: [255, 0, 0],
			opacity: 1,
			label: 'Fornix'
		},
		251: {
			color: [0, 0, 64],
			opacity: 1,
			label: 'CC_Posterior'
		},
		252: {
			color: [0, 0, 112],
			opacity: 1,
			label: 'CC_Mid_Posterior'
		},
		253: {
			color: [0, 0, 160],
			opacity: 1,
			label: 'CC_Central'
		},
		254: {
			color: [0, 0, 208],
			opacity: 1,
			label: 'CC_Mid_Anterior'
		},
		255: {
			color: [0, 0, 255],
			opacity: 1,
			label: 'CC_Anterior'
		},
		256: {
			color: [0, 0, 0],
			opacity: 1,
			label: 'Voxel-Unchanged'
		},
		257: {
			color: [60, 60, 60],
			opacity: 1,
			label: 'CSF-ExtraCerebral'
		},
		258: {
			color: [150, 150, 200],
			opacity: 1,
			label: 'Head-ExtraCerebral'
		},
		259: {
			color: [120, 120, 120],
			opacity: 1,
			label: 'SkullApprox'
		},
		260: {
			color: [119, 159, 176],
			opacity: 1,
			label: 'BoneOrAir'
		},
		261: {
			color: [120, 18, 134],
			opacity: 1,
			label: 'PossibleFluid'
		},
		262: {
			color: [119, 159, 176],
			opacity: 1,
			label: 'Sinus'
		},
		263: {
			color: [119, 159, 176],
			opacity: 1,
			label: 'Left-Eustachian'
		},
		264: {
			color: [119, 159, 176],
			opacity: 1,
			label: 'Right-Eustachian'
		},
		331: {
			color: [255, 0, 0],
			opacity: 1,
			label: 'Aorta'
		},
		332: {
			color: [255, 80, 0],
			opacity: 1,
			label: 'Left-Common-IliacA'
		},
		333: {
			color: [255, 160, 0],
			opacity: 1,
			label: 'Right-Common-IliacA'
		},
		334: {
			color: [255, 255, 0],
			opacity: 1,
			label: 'Left-External-IliacA'
		},
		335: {
			color: [0, 255, 0],
			opacity: 1,
			label: 'Right-External-IliacA'
		},
		336: {
			color: [255, 0, 160],
			opacity: 1,
			label: 'Left-Internal-IliacA'
		},
		337: {
			color: [255, 0, 255],
			opacity: 1,
			label: 'Right-Internal-IliacA'
		},
		338: {
			color: [255, 50, 80],
			opacity: 1,
			label: 'Left-Lateral-SacralA'
		},
		339: {
			color: [80, 255, 50],
			opacity: 1,
			label: 'Right-Lateral-SacralA'
		},
		340: {
			color: [160, 255, 50],
			opacity: 1,
			label: 'Left-ObturatorA'
		},
		341: {
			color: [160, 200, 255],
			opacity: 1,
			label: 'Right-ObturatorA'
		},
		342: {
			color: [0, 255, 160],
			opacity: 1,
			label: 'Left-Internal-PudendalA'
		},
		343: {
			color: [0, 0, 255],
			opacity: 1,
			label: 'Right-Internal-PudendalA'
		},
		344: {
			color: [80, 50, 255],
			opacity: 1,
			label: 'Left-UmbilicalA'
		},
		345: {
			color: [160, 0, 255],
			opacity: 1,
			label: 'Right-UmbilicalA'
		},
		346: {
			color: [255, 210, 0],
			opacity: 1,
			label: 'Left-Inf-RectalA'
		},
		347: {
			color: [0, 160, 255],
			opacity: 1,
			label: 'Right-Inf-RectalA'
		},
		348: {
			color: [255, 200, 80],
			opacity: 1,
			label: 'Left-Common-IliacV'
		},
		349: {
			color: [255, 200, 160],
			opacity: 1,
			label: 'Right-Common-IliacV'
		},
		350: {
			color: [255, 80, 200],
			opacity: 1,
			label: 'Left-External-IliacV'
		},
		351: {
			color: [255, 160, 200],
			opacity: 1,
			label: 'Right-External-IliacV'
		},
		352: {
			color: [30, 255, 80],
			opacity: 1,
			label: 'Left-Internal-IliacV'
		},
		353: {
			color: [80, 200, 255],
			opacity: 1,
			label: 'Right-Internal-IliacV'
		},
		354: {
			color: [80, 255, 200],
			opacity: 1,
			label: 'Left-ObturatorV'
		},
		355: {
			color: [195, 255, 200],
			opacity: 1,
			label: 'Right-ObturatorV'
		},
		356: {
			color: [120, 200, 20],
			opacity: 1,
			label: 'Left-Internal-PudendalV'
		},
		357: {
			color: [170, 10, 200],
			opacity: 1,
			label: 'Right-Internal-PudendalV'
		},
		358: {
			color: [20, 130, 180],
			opacity: 1,
			label: 'Pos-Lymph'
		},
		359: {
			color: [20, 180, 130],
			opacity: 1,
			label: 'Neg-Lymph'
		},
		400: {
			color: [206, 62, 78],
			opacity: 1,
			label: 'V1'
		},
		401: {
			color: [121, 18, 134],
			opacity: 1,
			label: 'V2'
		},
		402: {
			color: [199, 58, 250],
			opacity: 1,
			label: 'BA44'
		},
		403: {
			color: [1, 148, 0],
			opacity: 1,
			label: 'BA45'
		},
		404: {
			color: [221, 248, 164],
			opacity: 1,
			label: 'BA4a'
		},
		405: {
			color: [231, 148, 34],
			opacity: 1,
			label: 'BA4p'
		},
		406: {
			color: [1, 118, 14],
			opacity: 1,
			label: 'BA6'
		},
		407: {
			color: [120, 118, 14],
			opacity: 1,
			label: 'BA2'
		},
		408: {
			color: [123, 186, 221],
			opacity: 1,
			label: 'BA1_old'
		},
		409: {
			color: [238, 13, 177],
			opacity: 1,
			label: 'BAun2'
		},
		410: {
			color: [123, 186, 220],
			opacity: 1,
			label: 'BA1'
		},
		411: {
			color: [138, 13, 206],
			opacity: 1,
			label: 'BA2b'
		},
		412: {
			color: [238, 130, 176],
			opacity: 1,
			label: 'BA3a'
		},
		413: {
			color: [218, 230, 76],
			opacity: 1,
			label: 'BA3b'
		},
		414: {
			color: [38, 213, 176],
			opacity: 1,
			label: 'MT'
		},
		415: {
			color: [1, 225, 176],
			opacity: 1,
			label: 'AIPS_AIP_l'
		},
		416: {
			color: [1, 225, 176],
			opacity: 1,
			label: 'AIPS_AIP_r'
		},
		417: {
			color: [200, 2, 100],
			opacity: 1,
			label: 'AIPS_VIP_l'
		},
		418: {
			color: [200, 2, 100],
			opacity: 1,
			label: 'AIPS_VIP_r'
		},
		419: {
			color: [5, 200, 90],
			opacity: 1,
			label: 'IPL_PFcm_l'
		},
		420: {
			color: [5, 200, 90],
			opacity: 1,
			label: 'IPL_PFcm_r'
		},
		421: {
			color: [100, 5, 200],
			opacity: 1,
			label: 'IPL_PF_l'
		},
		422: {
			color: [25, 255, 100],
			opacity: 1,
			label: 'IPL_PFm_l'
		},
		423: {
			color: [25, 255, 100],
			opacity: 1,
			label: 'IPL_PFm_r'
		},
		424: {
			color: [230, 7, 100],
			opacity: 1,
			label: 'IPL_PFop_l'
		},
		425: {
			color: [230, 7, 100],
			opacity: 1,
			label: 'IPL_PFop_r'
		},
		426: {
			color: [100, 5, 200],
			opacity: 1,
			label: 'IPL_PF_r'
		},
		427: {
			color: [150, 10, 200],
			opacity: 1,
			label: 'IPL_PFt_l'
		},
		428: {
			color: [150, 10, 200],
			opacity: 1,
			label: 'IPL_PFt_r'
		},
		429: {
			color: [175, 10, 176],
			opacity: 1,
			label: 'IPL_PGa_l'
		},
		430: {
			color: [175, 10, 176],
			opacity: 1,
			label: 'IPL_PGa_r'
		},
		431: {
			color: [10, 100, 255],
			opacity: 1,
			label: 'IPL_PGp_l'
		},
		432: {
			color: [10, 100, 255],
			opacity: 1,
			label: 'IPL_PGp_r'
		},
		433: {
			color: [150, 45, 70],
			opacity: 1,
			label: 'Visual_V3d_l'
		},
		434: {
			color: [150, 45, 70],
			opacity: 1,
			label: 'Visual_V3d_r'
		},
		435: {
			color: [45, 200, 15],
			opacity: 1,
			label: 'Visual_V4_l'
		},
		436: {
			color: [45, 200, 15],
			opacity: 1,
			label: 'Visual_V4_r'
		},
		437: {
			color: [227, 45, 100],
			opacity: 1,
			label: 'Visual_V5_b'
		},
		438: {
			color: [227, 45, 100],
			opacity: 1,
			label: 'Visual_VP_l'
		},
		439: {
			color: [227, 45, 100],
			opacity: 1,
			label: 'Visual_VP_r'
		},
		498: {
			color: [143, 188, 143],
			opacity: 1,
			label: 'wmsa'
		},
		499: {
			color: [255, 248, 220],
			opacity: 1,
			label: 'other_wmsa'
		},
		500: {
			color: [17, 85, 136],
			opacity: 1,
			label: 'right_CA2_3'
		},
		501: {
			color: [119, 187, 102],
			opacity: 1,
			label: 'right_alveus'
		},
		502: {
			color: [204, 68, 34],
			opacity: 1,
			label: 'right_CA1'
		},
		503: {
			color: [204, 0, 255],
			opacity: 1,
			label: 'right_fimbria'
		},
		504: {
			color: [221, 187, 17],
			opacity: 1,
			label: 'right_presubiculum'
		},
		505: {
			color: [153, 221, 238],
			opacity: 1,
			label: 'right_hippocampal_fissure'
		},
		506: {
			color: [51, 17, 17],
			opacity: 1,
			label: 'right_CA4_DG'
		},
		507: {
			color: [0, 119, 85],
			opacity: 1,
			label: 'right_subiculum'
		},
		508: {
			color: [20, 100, 200],
			opacity: 1,
			label: 'right_fornix'
		},
		550: {
			color: [17, 85, 137],
			opacity: 1,
			label: 'left_CA2_3'
		},
		551: {
			color: [119, 187, 103],
			opacity: 1,
			label: 'left_alveus'
		},
		552: {
			color: [204, 68, 35],
			opacity: 1,
			label: 'left_CA1'
		},
		553: {
			color: [204, 0, 254],
			opacity: 1,
			label: 'left_fimbria'
		},
		554: {
			color: [221, 187, 16],
			opacity: 1,
			label: 'left_presubiculum'
		},
		555: {
			color: [153, 221, 239],
			opacity: 1,
			label: 'left_hippocampal_fissure'
		},
		556: {
			color: [51, 17, 18],
			opacity: 1,
			label: 'left_CA4_DG'
		},
		557: {
			color: [0, 119, 86],
			opacity: 1,
			label: 'left_subiculum'
		},
		558: {
			color: [20, 100, 201],
			opacity: 1,
			label: 'left_fornix'
		},
		600: {
			color: [254, 254, 254],
			opacity: 1,
			label: 'Tumor'
		},
		601: {
			color: [70, 130, 180],
			opacity: 1,
			label: 'Cbm_Left_I_IV'
		},
		602: {
			color: [245, 245, 245],
			opacity: 1,
			label: 'Cbm_Right_I_IV'
		},
		603: {
			color: [205, 62, 78],
			opacity: 1,
			label: 'Cbm_Left_V'
		},
		604: {
			color: [120, 18, 134],
			opacity: 1,
			label: 'Cbm_Right_V'
		},
		605: {
			color: [196, 58, 250],
			opacity: 1,
			label: 'Cbm_Left_VI'
		},
		606: {
			color: [0, 148, 0],
			opacity: 1,
			label: 'Cbm_Vermis_VI'
		},
		607: {
			color: [220, 248, 164],
			opacity: 1,
			label: 'Cbm_Right_VI'
		},
		608: {
			color: [230, 148, 34],
			opacity: 1,
			label: 'Cbm_Left_CrusI'
		},
		609: {
			color: [0, 118, 14],
			opacity: 1,
			label: 'Cbm_Vermis_CrusI'
		},
		610: {
			color: [0, 118, 14],
			opacity: 1,
			label: 'Cbm_Right_CrusI'
		},
		611: {
			color: [122, 186, 220],
			opacity: 1,
			label: 'Cbm_Left_CrusII'
		},
		612: {
			color: [236, 13, 176],
			opacity: 1,
			label: 'Cbm_Vermis_CrusII'
		},
		613: {
			color: [12, 48, 255],
			opacity: 1,
			label: 'Cbm_Right_CrusII'
		},
		614: {
			color: [204, 182, 142],
			opacity: 1,
			label: 'Cbm_Left_VIIb'
		},
		615: {
			color: [42, 204, 164],
			opacity: 1,
			label: 'Cbm_Vermis_VIIb'
		},
		616: {
			color: [119, 159, 176],
			opacity: 1,
			label: 'Cbm_Right_VIIb'
		},
		617: {
			color: [220, 216, 20],
			opacity: 1,
			label: 'Cbm_Left_VIIIa'
		},
		618: {
			color: [103, 255, 255],
			opacity: 1,
			label: 'Cbm_Vermis_VIIIa'
		},
		619: {
			color: [80, 196, 98],
			opacity: 1,
			label: 'Cbm_Right_VIIIa'
		},
		620: {
			color: [60, 58, 210],
			opacity: 1,
			label: 'Cbm_Left_VIIIb'
		},
		621: {
			color: [60, 58, 210],
			opacity: 1,
			label: 'Cbm_Vermis_VIIIb'
		},
		622: {
			color: [60, 58, 210],
			opacity: 1,
			label: 'Cbm_Right_VIIIb'
		},
		623: {
			color: [60, 58, 210],
			opacity: 1,
			label: 'Cbm_Left_IX'
		},
		624: {
			color: [60, 60, 60],
			opacity: 1,
			label: 'Cbm_Vermis_IX'
		},
		625: {
			color: [255, 165, 0],
			opacity: 1,
			label: 'Cbm_Right_IX'
		},
		626: {
			color: [255, 165, 0],
			opacity: 1,
			label: 'Cbm_Left_X'
		},
		627: {
			color: [0, 255, 127],
			opacity: 1,
			label: 'Cbm_Vermis_X'
		},
		628: {
			color: [165, 42, 42],
			opacity: 1,
			label: 'Cbm_Right_X'
		},
		640: {
			color: [204, 0, 0],
			opacity: 1,
			label: 'Cbm_Right_I_V_med'
		},
		641: {
			color: [255, 0, 0],
			opacity: 1,
			label: 'Cbm_Right_I_V_mid'
		},
		642: {
			color: [0, 0, 255],
			opacity: 1,
			label: 'Cbm_Right_VI_med'
		},
		643: {
			color: [30, 144, 255],
			opacity: 1,
			label: 'Cbm_Right_VI_mid'
		},
		644: {
			color: [100, 212, 237],
			opacity: 1,
			label: 'Cbm_Right_VI_lat'
		},
		645: {
			color: [218, 165, 32],
			opacity: 1,
			label: 'Cbm_Right_CrusI_med'
		},
		646: {
			color: [255, 215, 0],
			opacity: 1,
			label: 'Cbm_Right_CrusI_mid'
		},
		647: {
			color: [255, 255, 166],
			opacity: 1,
			label: 'Cbm_Right_CrusI_lat'
		},
		648: {
			color: [153, 0, 204],
			opacity: 1,
			label: 'Cbm_Right_CrusII_med'
		},
		649: {
			color: [153, 141, 209],
			opacity: 1,
			label: 'Cbm_Right_CrusII_mid'
		},
		650: {
			color: [204, 204, 255],
			opacity: 1,
			label: 'Cbm_Right_CrusII_lat'
		},
		651: {
			color: [31, 212, 194],
			opacity: 1,
			label: 'Cbm_Right_7med'
		},
		652: {
			color: [3, 255, 237],
			opacity: 1,
			label: 'Cbm_Right_7mid'
		},
		653: {
			color: [204, 255, 255],
			opacity: 1,
			label: 'Cbm_Right_7lat'
		},
		654: {
			color: [86, 74, 147],
			opacity: 1,
			label: 'Cbm_Right_8med'
		},
		655: {
			color: [114, 114, 190],
			opacity: 1,
			label: 'Cbm_Right_8mid'
		},
		656: {
			color: [184, 178, 255],
			opacity: 1,
			label: 'Cbm_Right_8lat'
		},
		657: {
			color: [126, 138, 37],
			opacity: 1,
			label: 'Cbm_Right_PUNs'
		},
		658: {
			color: [189, 197, 117],
			opacity: 1,
			label: 'Cbm_Right_TONs'
		},
		659: {
			color: [240, 230, 140],
			opacity: 1,
			label: 'Cbm_Right_FLOs'
		},
		660: {
			color: [204, 0, 0],
			opacity: 1,
			label: 'Cbm_Left_I_V_med'
		},
		661: {
			color: [255, 0, 0],
			opacity: 1,
			label: 'Cbm_Left_I_V_mid'
		},
		662: {
			color: [0, 0, 255],
			opacity: 1,
			label: 'Cbm_Left_VI_med'
		},
		663: {
			color: [30, 144, 255],
			opacity: 1,
			label: 'Cbm_Left_VI_mid'
		},
		664: {
			color: [100, 212, 237],
			opacity: 1,
			label: 'Cbm_Left_VI_lat'
		},
		665: {
			color: [218, 165, 32],
			opacity: 1,
			label: 'Cbm_Left_CrusI_med'
		},
		666: {
			color: [255, 215, 0],
			opacity: 1,
			label: 'Cbm_Left_CrusI_mid'
		},
		667: {
			color: [255, 255, 166],
			opacity: 1,
			label: 'Cbm_Left_CrusI_lat'
		},
		668: {
			color: [153, 0, 204],
			opacity: 1,
			label: 'Cbm_Left_CrusII_med'
		},
		669: {
			color: [153, 141, 209],
			opacity: 1,
			label: 'Cbm_Left_CrusII_mid'
		},
		670: {
			color: [204, 204, 255],
			opacity: 1,
			label: 'Cbm_Left_CrusII_lat'
		},
		671: {
			color: [31, 212, 194],
			opacity: 1,
			label: 'Cbm_Left_7med'
		},
		672: {
			color: [3, 255, 237],
			opacity: 1,
			label: 'Cbm_Left_7mid'
		},
		673: {
			color: [204, 255, 255],
			opacity: 1,
			label: 'Cbm_Left_7lat'
		},
		674: {
			color: [86, 74, 147],
			opacity: 1,
			label: 'Cbm_Left_8med'
		},
		675: {
			color: [114, 114, 190],
			opacity: 1,
			label: 'Cbm_Left_8mid'
		},
		676: {
			color: [184, 178, 255],
			opacity: 1,
			label: 'Cbm_Left_8lat'
		},
		677: {
			color: [126, 138, 37],
			opacity: 1,
			label: 'Cbm_Left_PUNs'
		},
		678: {
			color: [189, 197, 117],
			opacity: 1,
			label: 'Cbm_Left_TONs'
		},
		679: {
			color: [240, 230, 140],
			opacity: 1,
			label: 'Cbm_Left_FLOs'
		},
		690: {
			color: [122, 135, 50],
			opacity: 1,
			label: 'CbmWM_Gyri_Left'
		},
		691: {
			color: [122, 135, 50],
			opacity: 1,
			label: 'CbmWM_Gyri_Right'
		},
		701: {
			color: [120, 18, 134],
			opacity: 1,
			label: 'CSF-FSL-FAST'
		},
		702: {
			color: [205, 62, 78],
			opacity: 1,
			label: 'GrayMatter-FSL-FAST'
		},
		703: {
			color: [0, 225, 0],
			opacity: 1,
			label: 'WhiteMatter-FSL-FAST'
		},
		999: {
			color: [255, 100, 100],
			opacity: 1,
			label: 'SUSPICIOUS'
		},
		1000: {
			color: [25, 5, 25],
			opacity: 1,
			label: 'ctx-lh-unknown'
		},
		1001: {
			color: [25, 100, 40],
			opacity: 1,
			label: 'ctx-lh-bankssts'
		},
		1002: {
			color: [125, 100, 160],
			opacity: 1,
			label: 'ctx-lh-caudalanteriorcingulate'
		},
		1003: {
			color: [100, 25, 0],
			opacity: 1,
			label: 'ctx-lh-caudalmiddlefrontal'
		},
		1004: {
			color: [120, 70, 50],
			opacity: 1,
			label: 'ctx-lh-corpuscallosum'
		},
		1005: {
			color: [220, 20, 100],
			opacity: 1,
			label: 'ctx-lh-cuneus'
		},
		1006: {
			color: [220, 20, 10],
			opacity: 1,
			label: 'ctx-lh-entorhinal'
		},
		1007: {
			color: [180, 220, 140],
			opacity: 1,
			label: 'ctx-lh-fusiform'
		},
		1008: {
			color: [220, 60, 220],
			opacity: 1,
			label: 'ctx-lh-inferiorparietal'
		},
		1009: {
			color: [180, 40, 120],
			opacity: 1,
			label: 'ctx-lh-inferiortemporal'
		},
		1010: {
			color: [140, 20, 140],
			opacity: 1,
			label: 'ctx-lh-isthmuscingulate'
		},
		1011: {
			color: [20, 30, 140],
			opacity: 1,
			label: 'ctx-lh-lateraloccipital'
		},
		1012: {
			color: [35, 75, 50],
			opacity: 1,
			label: 'ctx-lh-lateralorbitofrontal'
		},
		1013: {
			color: [225, 140, 140],
			opacity: 1,
			label: 'ctx-lh-lingual'
		},
		1014: {
			color: [200, 35, 75],
			opacity: 1,
			label: 'ctx-lh-medialorbitofrontal'
		},
		1015: {
			color: [160, 100, 50],
			opacity: 1,
			label: 'ctx-lh-middletemporal'
		},
		1016: {
			color: [20, 220, 60],
			opacity: 1,
			label: 'ctx-lh-parahippocampal'
		},
		1017: {
			color: [60, 220, 60],
			opacity: 1,
			label: 'ctx-lh-paracentral'
		},
		1018: {
			color: [220, 180, 140],
			opacity: 1,
			label: 'ctx-lh-parsopercularis'
		},
		1019: {
			color: [20, 100, 50],
			opacity: 1,
			label: 'ctx-lh-parsorbitalis'
		},
		1020: {
			color: [220, 60, 20],
			opacity: 1,
			label: 'ctx-lh-parstriangularis'
		},
		1021: {
			color: [120, 100, 60],
			opacity: 1,
			label: 'ctx-lh-pericalcarine'
		},
		1022: {
			color: [220, 20, 20],
			opacity: 1,
			label: 'ctx-lh-postcentral'
		},
		1023: {
			color: [220, 180, 220],
			opacity: 1,
			label: 'ctx-lh-posteriorcingulate'
		},
		1024: {
			color: [60, 20, 220],
			opacity: 1,
			label: 'ctx-lh-precentral'
		},
		1025: {
			color: [160, 140, 180],
			opacity: 1,
			label: 'ctx-lh-precuneus'
		},
		1026: {
			color: [80, 20, 140],
			opacity: 1,
			label: 'ctx-lh-rostralanteriorcingulate'
		},
		1027: {
			color: [75, 50, 125],
			opacity: 1,
			label: 'ctx-lh-rostralmiddlefrontal'
		},
		1028: {
			color: [20, 220, 160],
			opacity: 1,
			label: 'ctx-lh-superiorfrontal'
		},
		1029: {
			color: [20, 180, 140],
			opacity: 1,
			label: 'ctx-lh-superiorparietal'
		},
		1030: {
			color: [140, 220, 220],
			opacity: 1,
			label: 'ctx-lh-superiortemporal'
		},
		1031: {
			color: [80, 160, 20],
			opacity: 1,
			label: 'ctx-lh-supramarginal'
		},
		1032: {
			color: [100, 0, 100],
			opacity: 1,
			label: 'ctx-lh-frontalpole'
		},
		1033: {
			color: [70, 70, 70],
			opacity: 1,
			label: 'ctx-lh-temporalpole'
		},
		1034: {
			color: [150, 150, 200],
			opacity: 1,
			label: 'ctx-lh-transversetemporal'
		},
		1035: {
			color: [255, 192, 32],
			opacity: 1,
			label: 'ctx-lh-insula'
		},
		2000: {
			color: [25, 5, 25],
			opacity: 1,
			label: 'ctx-rh-unknown'
		},
		2001: {
			color: [25, 100, 40],
			opacity: 1,
			label: 'ctx-rh-bankssts'
		},
		2002: {
			color: [125, 100, 160],
			opacity: 1,
			label: 'ctx-rh-caudalanteriorcingulate'
		},
		2003: {
			color: [100, 25, 0],
			opacity: 1,
			label: 'ctx-rh-caudalmiddlefrontal'
		},
		2004: {
			color: [120, 70, 50],
			opacity: 1,
			label: 'ctx-rh-corpuscallosum'
		},
		2005: {
			color: [220, 20, 100],
			opacity: 1,
			label: 'ctx-rh-cuneus'
		},
		2006: {
			color: [220, 20, 10],
			opacity: 1,
			label: 'ctx-rh-entorhinal'
		},
		2007: {
			color: [180, 220, 140],
			opacity: 1,
			label: 'ctx-rh-fusiform'
		},
		2008: {
			color: [220, 60, 220],
			opacity: 1,
			label: 'ctx-rh-inferiorparietal'
		},
		2009: {
			color: [180, 40, 120],
			opacity: 1,
			label: 'ctx-rh-inferiortemporal'
		},
		2010: {
			color: [140, 20, 140],
			opacity: 1,
			label: 'ctx-rh-isthmuscingulate'
		},
		2011: {
			color: [20, 30, 140],
			opacity: 1,
			label: 'ctx-rh-lateraloccipital'
		},
		2012: {
			color: [35, 75, 50],
			opacity: 1,
			label: 'ctx-rh-lateralorbitofrontal'
		},
		2013: {
			color: [225, 140, 140],
			opacity: 1,
			label: 'ctx-rh-lingual'
		},
		2014: {
			color: [200, 35, 75],
			opacity: 1,
			label: 'ctx-rh-medialorbitofrontal'
		},
		2015: {
			color: [160, 100, 50],
			opacity: 1,
			label: 'ctx-rh-middletemporal'
		},
		2016: {
			color: [20, 220, 60],
			opacity: 1,
			label: 'ctx-rh-parahippocampal'
		},
		2017: {
			color: [60, 220, 60],
			opacity: 1,
			label: 'ctx-rh-paracentral'
		},
		2018: {
			color: [220, 180, 140],
			opacity: 1,
			label: 'ctx-rh-parsopercularis'
		},
		2019: {
			color: [20, 100, 50],
			opacity: 1,
			label: 'ctx-rh-parsorbitalis'
		},
		2020: {
			color: [220, 60, 20],
			opacity: 1,
			label: 'ctx-rh-parstriangularis'
		},
		2021: {
			color: [120, 100, 60],
			opacity: 1,
			label: 'ctx-rh-pericalcarine'
		},
		2022: {
			color: [220, 20, 20],
			opacity: 1,
			label: 'ctx-rh-postcentral'
		},
		2023: {
			color: [220, 180, 220],
			opacity: 1,
			label: 'ctx-rh-posteriorcingulate'
		},
		2024: {
			color: [60, 20, 220],
			opacity: 1,
			label: 'ctx-rh-precentral'
		},
		2025: {
			color: [160, 140, 180],
			opacity: 1,
			label: 'ctx-rh-precuneus'
		},
		2026: {
			color: [80, 20, 140],
			opacity: 1,
			label: 'ctx-rh-rostralanteriorcingulate'
		},
		2027: {
			color: [75, 50, 125],
			opacity: 1,
			label: 'ctx-rh-rostralmiddlefrontal'
		},
		2028: {
			color: [20, 220, 160],
			opacity: 1,
			label: 'ctx-rh-superiorfrontal'
		},
		2029: {
			color: [20, 180, 140],
			opacity: 1,
			label: 'ctx-rh-superiorparietal'
		},
		2030: {
			color: [140, 220, 220],
			opacity: 1,
			label: 'ctx-rh-superiortemporal'
		},
		2031: {
			color: [80, 160, 20],
			opacity: 1,
			label: 'ctx-rh-supramarginal'
		},
		2032: {
			color: [100, 0, 100],
			opacity: 1,
			label: 'ctx-rh-frontalpole'
		},
		2033: {
			color: [70, 70, 70],
			opacity: 1,
			label: 'ctx-rh-temporalpole'
		},
		2034: {
			color: [150, 150, 200],
			opacity: 1,
			label: 'ctx-rh-transversetemporal'
		},
		2035: {
			color: [255, 192, 32],
			opacity: 1,
			label: 'ctx-rh-insula'
		},
		3000: {
			color: [230, 250, 230],
			opacity: 1,
			label: 'wm-lh-unknown'
		},
		3001: {
			color: [230, 155, 215],
			opacity: 1,
			label: 'wm-lh-bankssts'
		},
		3002: {
			color: [130, 155, 95],
			opacity: 1,
			label: 'wm-lh-caudalanteriorcingulate'
		},
		3003: {
			color: [155, 230, 255],
			opacity: 1,
			label: 'wm-lh-caudalmiddlefrontal'
		},
		3004: {
			color: [135, 185, 205],
			opacity: 1,
			label: 'wm-lh-corpuscallosum'
		},
		3005: {
			color: [35, 235, 155],
			opacity: 1,
			label: 'wm-lh-cuneus'
		},
		3006: {
			color: [35, 235, 245],
			opacity: 1,
			label: 'wm-lh-entorhinal'
		},
		3007: {
			color: [75, 35, 115],
			opacity: 1,
			label: 'wm-lh-fusiform'
		},
		3008: {
			color: [35, 195, 35],
			opacity: 1,
			label: 'wm-lh-inferiorparietal'
		},
		3009: {
			color: [75, 215, 135],
			opacity: 1,
			label: 'wm-lh-inferiortemporal'
		},
		3010: {
			color: [115, 235, 115],
			opacity: 1,
			label: 'wm-lh-isthmuscingulate'
		},
		3011: {
			color: [235, 225, 115],
			opacity: 1,
			label: 'wm-lh-lateraloccipital'
		},
		3012: {
			color: [220, 180, 205],
			opacity: 1,
			label: 'wm-lh-lateralorbitofrontal'
		},
		3013: {
			color: [30, 115, 115],
			opacity: 1,
			label: 'wm-lh-lingual'
		},
		3014: {
			color: [55, 220, 180],
			opacity: 1,
			label: 'wm-lh-medialorbitofrontal'
		},
		3015: {
			color: [95, 155, 205],
			opacity: 1,
			label: 'wm-lh-middletemporal'
		},
		3016: {
			color: [235, 35, 195],
			opacity: 1,
			label: 'wm-lh-parahippocampal'
		},
		3017: {
			color: [195, 35, 195],
			opacity: 1,
			label: 'wm-lh-paracentral'
		},
		3018: {
			color: [35, 75, 115],
			opacity: 1,
			label: 'wm-lh-parsopercularis'
		},
		3019: {
			color: [235, 155, 205],
			opacity: 1,
			label: 'wm-lh-parsorbitalis'
		},
		3020: {
			color: [35, 195, 235],
			opacity: 1,
			label: 'wm-lh-parstriangularis'
		},
		3021: {
			color: [135, 155, 195],
			opacity: 1,
			label: 'wm-lh-pericalcarine'
		},
		3022: {
			color: [35, 235, 235],
			opacity: 1,
			label: 'wm-lh-postcentral'
		},
		3023: {
			color: [35, 75, 35],
			opacity: 1,
			label: 'wm-lh-posteriorcingulate'
		},
		3024: {
			color: [195, 235, 35],
			opacity: 1,
			label: 'wm-lh-precentral'
		},
		3025: {
			color: [95, 115, 75],
			opacity: 1,
			label: 'wm-lh-precuneus'
		},
		3026: {
			color: [175, 235, 115],
			opacity: 1,
			label: 'wm-lh-rostralanteriorcingulate'
		},
		3027: {
			color: [180, 205, 130],
			opacity: 1,
			label: 'wm-lh-rostralmiddlefrontal'
		},
		3028: {
			color: [235, 35, 95],
			opacity: 1,
			label: 'wm-lh-superiorfrontal'
		},
		3029: {
			color: [235, 75, 115],
			opacity: 1,
			label: 'wm-lh-superiorparietal'
		},
		3030: {
			color: [115, 35, 35],
			opacity: 1,
			label: 'wm-lh-superiortemporal'
		},
		3031: {
			color: [175, 95, 235],
			opacity: 1,
			label: 'wm-lh-supramarginal'
		},
		3032: {
			color: [155, 255, 155],
			opacity: 1,
			label: 'wm-lh-frontalpole'
		},
		3033: {
			color: [185, 185, 185],
			opacity: 1,
			label: 'wm-lh-temporalpole'
		},
		3034: {
			color: [105, 105, 55],
			opacity: 1,
			label: 'wm-lh-transversetemporal'
		},
		3035: {
			color: [20, 220, 160],
			opacity: 1,
			label: 'wm-lh-insula'
		},
		4000: {
			color: [230, 250, 230],
			opacity: 1,
			label: 'wm-rh-unknown'
		},
		4001: {
			color: [230, 155, 215],
			opacity: 1,
			label: 'wm-rh-bankssts'
		},
		4002: {
			color: [130, 155, 95],
			opacity: 1,
			label: 'wm-rh-caudalanteriorcingulate'
		},
		4003: {
			color: [155, 230, 255],
			opacity: 1,
			label: 'wm-rh-caudalmiddlefrontal'
		},
		4004: {
			color: [135, 185, 205],
			opacity: 1,
			label: 'wm-rh-corpuscallosum'
		},
		4005: {
			color: [35, 235, 155],
			opacity: 1,
			label: 'wm-rh-cuneus'
		},
		4006: {
			color: [35, 235, 245],
			opacity: 1,
			label: 'wm-rh-entorhinal'
		},
		4007: {
			color: [75, 35, 115],
			opacity: 1,
			label: 'wm-rh-fusiform'
		},
		4008: {
			color: [35, 195, 35],
			opacity: 1,
			label: 'wm-rh-inferiorparietal'
		},
		4009: {
			color: [75, 215, 135],
			opacity: 1,
			label: 'wm-rh-inferiortemporal'
		},
		4010: {
			color: [115, 235, 115],
			opacity: 1,
			label: 'wm-rh-isthmuscingulate'
		},
		4011: {
			color: [235, 225, 115],
			opacity: 1,
			label: 'wm-rh-lateraloccipital'
		},
		4012: {
			color: [220, 180, 205],
			opacity: 1,
			label: 'wm-rh-lateralorbitofrontal'
		},
		4013: {
			color: [30, 115, 115],
			opacity: 1,
			label: 'wm-rh-lingual'
		},
		4014: {
			color: [55, 220, 180],
			opacity: 1,
			label: 'wm-rh-medialorbitofrontal'
		},
		4015: {
			color: [95, 155, 205],
			opacity: 1,
			label: 'wm-rh-middletemporal'
		},
		4016: {
			color: [235, 35, 195],
			opacity: 1,
			label: 'wm-rh-parahippocampal'
		},
		4017: {
			color: [195, 35, 195],
			opacity: 1,
			label: 'wm-rh-paracentral'
		},
		4018: {
			color: [35, 75, 115],
			opacity: 1,
			label: 'wm-rh-parsopercularis'
		},
		4019: {
			color: [235, 155, 205],
			opacity: 1,
			label: 'wm-rh-parsorbitalis'
		},
		4020: {
			color: [35, 195, 235],
			opacity: 1,
			label: 'wm-rh-parstriangularis'
		},
		4021: {
			color: [135, 155, 195],
			opacity: 1,
			label: 'wm-rh-pericalcarine'
		},
		4022: {
			color: [35, 235, 235],
			opacity: 1,
			label: 'wm-rh-postcentral'
		},
		4023: {
			color: [35, 75, 35],
			opacity: 1,
			label: 'wm-rh-posteriorcingulate'
		},
		4024: {
			color: [195, 235, 35],
			opacity: 1,
			label: 'wm-rh-precentral'
		},
		4025: {
			color: [95, 115, 75],
			opacity: 1,
			label: 'wm-rh-precuneus'
		},
		4026: {
			color: [175, 235, 115],
			opacity: 1,
			label: 'wm-rh-rostralanteriorcingulate'
		},
		4027: {
			color: [180, 205, 130],
			opacity: 1,
			label: 'wm-rh-rostralmiddlefrontal'
		},
		4028: {
			color: [235, 35, 95],
			opacity: 1,
			label: 'wm-rh-superiorfrontal'
		},
		4029: {
			color: [235, 75, 115],
			opacity: 1,
			label: 'wm-rh-superiorparietal'
		},
		4030: {
			color: [115, 35, 35],
			opacity: 1,
			label: 'wm-rh-superiortemporal'
		},
		4031: {
			color: [175, 95, 235],
			opacity: 1,
			label: 'wm-rh-supramarginal'
		},
		4032: {
			color: [155, 255, 155],
			opacity: 1,
			label: 'wm-rh-frontalpole'
		},
		4033: {
			color: [185, 185, 185],
			opacity: 1,
			label: 'wm-rh-temporalpole'
		},
		4034: {
			color: [105, 105, 55],
			opacity: 1,
			label: 'wm-rh-transversetemporal'
		},
		4035: {
			color: [20, 220, 160],
			opacity: 1,
			label: 'wm-rh-insula'
		},
		3201: {
			color: [235, 35, 95],
			opacity: 1,
			label: 'wm-lh-frontal-lobe'
		},
		3203: {
			color: [35, 75, 35],
			opacity: 1,
			label: 'wm-lh-cingulate-lobe'
		},
		3204: {
			color: [135, 155, 195],
			opacity: 1,
			label: 'wm-lh-occiptal-lobe'
		},
		3205: {
			color: [115, 35, 35],
			opacity: 1,
			label: 'wm-lh-temporal-lobe'
		},
		3206: {
			color: [35, 195, 35],
			opacity: 1,
			label: 'wm-lh-parietal-lobe'
		},
		3207: {
			color: [20, 220, 160],
			opacity: 1,
			label: 'wm-lh-insula-lobe'
		},
		4201: {
			color: [235, 35, 95],
			opacity: 1,
			label: 'wm-rh-frontal-lobe'
		},
		4203: {
			color: [35, 75, 35],
			opacity: 1,
			label: 'wm-rh-cingulate-lobe'
		},
		4204: {
			color: [135, 155, 195],
			opacity: 1,
			label: 'wm-rh-occiptal-lobe'
		},
		4205: {
			color: [115, 35, 35],
			opacity: 1,
			label: 'wm-rh-temporal-lobe'
		},
		4206: {
			color: [35, 195, 35],
			opacity: 1,
			label: 'wm-rh-parietal-lobe'
		},
		4207: {
			color: [20, 220, 160],
			opacity: 1,
			label: 'wm-rh-insula-lobe'
		},
		1100: {
			color: [0, 0, 0],
			opacity: 1,
			label: 'ctx-lh-Unknown'
		},
		1101: {
			color: [50, 50, 50],
			opacity: 1,
			label: 'ctx-lh-Corpus_callosum'
		},
		1102: {
			color: [180, 20, 30],
			opacity: 1,
			label: 'ctx-lh-G_and_S_Insula_ONLY_AVERAGE'
		},
		1103: {
			color: [60, 25, 25],
			opacity: 1,
			label: 'ctx-lh-G_cingulate-Isthmus'
		},
		1104: {
			color: [25, 60, 60],
			opacity: 1,
			label: 'ctx-lh-G_cingulate-Main_part'
		},
		1200: {
			color: [25, 60, 61],
			opacity: 1,
			label: 'ctx-lh-G_cingulate-caudal_ACC'
		},
		1201: {
			color: [25, 90, 60],
			opacity: 1,
			label: 'ctx-lh-G_cingulate-rostral_ACC'
		},
		1202: {
			color: [25, 120, 60],
			opacity: 1,
			label: 'ctx-lh-G_cingulate-posterior'
		},
		1205: {
			color: [25, 150, 60],
			opacity: 1,
			label: 'ctx-lh-S_cingulate-caudal_ACC'
		},
		1206: {
			color: [25, 180, 60],
			opacity: 1,
			label: 'ctx-lh-S_cingulate-rostral_ACC'
		},
		1207: {
			color: [25, 210, 60],
			opacity: 1,
			label: 'ctx-lh-S_cingulate-posterior'
		},
		1210: {
			color: [25, 150, 90],
			opacity: 1,
			label: 'ctx-lh-S_pericallosal-caudal'
		},
		1211: {
			color: [25, 180, 90],
			opacity: 1,
			label: 'ctx-lh-S_pericallosal-rostral'
		},
		1212: {
			color: [25, 210, 90],
			opacity: 1,
			label: 'ctx-lh-S_pericallosal-posterior'
		},
		1105: {
			color: [180, 20, 20],
			opacity: 1,
			label: 'ctx-lh-G_cuneus'
		},
		1106: {
			color: [220, 20, 100],
			opacity: 1,
			label: 'ctx-lh-G_frontal_inf-Opercular_part'
		},
		1107: {
			color: [140, 60, 60],
			opacity: 1,
			label: 'ctx-lh-G_frontal_inf-Orbital_part'
		},
		1108: {
			color: [180, 220, 140],
			opacity: 1,
			label: 'ctx-lh-G_frontal_inf-Triangular_part'
		},
		1109: {
			color: [140, 100, 180],
			opacity: 1,
			label: 'ctx-lh-G_frontal_middle'
		},
		1110: {
			color: [180, 20, 140],
			opacity: 1,
			label: 'ctx-lh-G_frontal_superior'
		},
		1111: {
			color: [140, 20, 140],
			opacity: 1,
			label: 'ctx-lh-G_frontomarginal'
		},
		1112: {
			color: [21, 10, 10],
			opacity: 1,
			label: 'ctx-lh-G_insular_long'
		},
		1113: {
			color: [225, 140, 140],
			opacity: 1,
			label: 'ctx-lh-G_insular_short'
		},
		1114: {
			color: [23, 60, 180],
			opacity: 1,
			label: 'ctx-lh-G_and_S_occipital_inferior'
		},
		1115: {
			color: [180, 60, 180],
			opacity: 1,
			label: 'ctx-lh-G_occipital_middle'
		},
		1116: {
			color: [20, 220, 60],
			opacity: 1,
			label: 'ctx-lh-G_occipital_superior'
		},
		1117: {
			color: [60, 20, 140],
			opacity: 1,
			label: 'ctx-lh-G_occipit-temp_lat-Or_fusiform'
		},
		1118: {
			color: [220, 180, 140],
			opacity: 1,
			label: 'ctx-lh-G_occipit-temp_med-Lingual_part'
		},
		1119: {
			color: [65, 100, 20],
			opacity: 1,
			label: 'ctx-lh-G_occipit-temp_med-Parahippocampal_part'
		},
		1120: {
			color: [220, 60, 20],
			opacity: 1,
			label: 'ctx-lh-G_orbital'
		},
		1121: {
			color: [60, 100, 60],
			opacity: 1,
			label: 'ctx-lh-G_paracentral'
		},
		1122: {
			color: [20, 60, 220],
			opacity: 1,
			label: 'ctx-lh-G_parietal_inferior-Angular_part'
		},
		1123: {
			color: [100, 100, 60],
			opacity: 1,
			label: 'ctx-lh-G_parietal_inferior-Supramarginal_part'
		},
		1124: {
			color: [220, 180, 220],
			opacity: 1,
			label: 'ctx-lh-G_parietal_superior'
		},
		1125: {
			color: [20, 180, 140],
			opacity: 1,
			label: 'ctx-lh-G_postcentral'
		},
		1126: {
			color: [60, 140, 180],
			opacity: 1,
			label: 'ctx-lh-G_precentral'
		},
		1127: {
			color: [25, 20, 140],
			opacity: 1,
			label: 'ctx-lh-G_precuneus'
		},
		1128: {
			color: [20, 60, 100],
			opacity: 1,
			label: 'ctx-lh-G_rectus'
		},
		1129: {
			color: [60, 220, 20],
			opacity: 1,
			label: 'ctx-lh-G_subcallosal'
		},
		1130: {
			color: [60, 20, 220],
			opacity: 1,
			label: 'ctx-lh-G_subcentral'
		},
		1131: {
			color: [220, 220, 100],
			opacity: 1,
			label: 'ctx-lh-G_temporal_inferior'
		},
		1132: {
			color: [180, 60, 60],
			opacity: 1,
			label: 'ctx-lh-G_temporal_middle'
		},
		1133: {
			color: [60, 60, 220],
			opacity: 1,
			label: 'ctx-lh-G_temp_sup-G_temp_transv_and_interm_S'
		},
		1134: {
			color: [220, 60, 220],
			opacity: 1,
			label: 'ctx-lh-G_temp_sup-Lateral_aspect'
		},
		1135: {
			color: [65, 220, 60],
			opacity: 1,
			label: 'ctx-lh-G_temp_sup-Planum_polare'
		},
		1136: {
			color: [25, 140, 20],
			opacity: 1,
			label: 'ctx-lh-G_temp_sup-Planum_tempolare'
		},
		1137: {
			color: [13, 0, 250],
			opacity: 1,
			label: 'ctx-lh-G_and_S_transverse_frontopolar'
		},
		1138: {
			color: [61, 20, 220],
			opacity: 1,
			label: 'ctx-lh-Lat_Fissure-ant_sgt-ramus_horizontal'
		},
		1139: {
			color: [61, 20, 60],
			opacity: 1,
			label: 'ctx-lh-Lat_Fissure-ant_sgt-ramus_vertical'
		},
		1140: {
			color: [61, 60, 100],
			opacity: 1,
			label: 'ctx-lh-Lat_Fissure-post_sgt'
		},
		1141: {
			color: [25, 25, 25],
			opacity: 1,
			label: 'ctx-lh-Medial_wall'
		},
		1142: {
			color: [140, 20, 60],
			opacity: 1,
			label: 'ctx-lh-Pole_occipital'
		},
		1143: {
			color: [220, 180, 20],
			opacity: 1,
			label: 'ctx-lh-Pole_temporal'
		},
		1144: {
			color: [63, 180, 180],
			opacity: 1,
			label: 'ctx-lh-S_calcarine'
		},
		1145: {
			color: [221, 20, 10],
			opacity: 1,
			label: 'ctx-lh-S_central'
		},
		1146: {
			color: [21, 220, 20],
			opacity: 1,
			label: 'ctx-lh-S_central_insula'
		},
		1147: {
			color: [183, 100, 20],
			opacity: 1,
			label: 'ctx-lh-S_cingulate-Main_part_and_Intracingulate'
		},
		1148: {
			color: [221, 20, 100],
			opacity: 1,
			label: 'ctx-lh-S_cingulate-Marginalis_part'
		},
		1149: {
			color: [221, 60, 140],
			opacity: 1,
			label: 'ctx-lh-S_circular_insula_anterior'
		},
		1150: {
			color: [221, 20, 220],
			opacity: 1,
			label: 'ctx-lh-S_circular_insula_inferior'
		},
		1151: {
			color: [61, 220, 220],
			opacity: 1,
			label: 'ctx-lh-S_circular_insula_superior'
		},
		1152: {
			color: [100, 200, 200],
			opacity: 1,
			label: 'ctx-lh-S_collateral_transverse_ant'
		},
		1153: {
			color: [10, 200, 200],
			opacity: 1,
			label: 'ctx-lh-S_collateral_transverse_post'
		},
		1154: {
			color: [221, 220, 20],
			opacity: 1,
			label: 'ctx-lh-S_frontal_inferior'
		},
		1155: {
			color: [141, 20, 100],
			opacity: 1,
			label: 'ctx-lh-S_frontal_middle'
		},
		1156: {
			color: [61, 220, 100],
			opacity: 1,
			label: 'ctx-lh-S_frontal_superior'
		},
		1157: {
			color: [21, 220, 60],
			opacity: 1,
			label: 'ctx-lh-S_frontomarginal'
		},
		1158: {
			color: [141, 60, 20],
			opacity: 1,
			label: 'ctx-lh-S_intermedius_primus-Jensen'
		},
		1159: {
			color: [143, 20, 220],
			opacity: 1,
			label: 'ctx-lh-S_intraparietal-and_Parietal_transverse'
		},
		1160: {
			color: [61, 20, 180],
			opacity: 1,
			label: 'ctx-lh-S_occipital_anterior'
		},
		1161: {
			color: [101, 60, 220],
			opacity: 1,
			label: 'ctx-lh-S_occipital_middle_and_Lunatus'
		},
		1162: {
			color: [21, 20, 140],
			opacity: 1,
			label: 'ctx-lh-S_occipital_superior_and_transversalis'
		},
		1163: {
			color: [221, 140, 20],
			opacity: 1,
			label: 'ctx-lh-S_occipito-temporal_lateral'
		},
		1164: {
			color: [141, 100, 220],
			opacity: 1,
			label: 'ctx-lh-S_occipito-temporal_medial_and_S_Lingual'
		},
		1165: {
			color: [101, 20, 20],
			opacity: 1,
			label: 'ctx-lh-S_orbital-H_shapped'
		},
		1166: {
			color: [221, 100, 20],
			opacity: 1,
			label: 'ctx-lh-S_orbital_lateral'
		},
		1167: {
			color: [181, 200, 20],
			opacity: 1,
			label: 'ctx-lh-S_orbital_medial-Or_olfactory'
		},
		1168: {
			color: [21, 180, 140],
			opacity: 1,
			label: 'ctx-lh-S_paracentral'
		},
		1169: {
			color: [101, 100, 180],
			opacity: 1,
			label: 'ctx-lh-S_parieto_occipital'
		},
		1170: {
			color: [181, 220, 20],
			opacity: 1,
			label: 'ctx-lh-S_pericallosal'
		},
		1171: {
			color: [21, 140, 200],
			opacity: 1,
			label: 'ctx-lh-S_postcentral'
		},
		1172: {
			color: [21, 20, 240],
			opacity: 1,
			label: 'ctx-lh-S_precentral-Inferior-part'
		},
		1173: {
			color: [21, 20, 200],
			opacity: 1,
			label: 'ctx-lh-S_precentral-Superior-part'
		},
		1174: {
			color: [61, 180, 60],
			opacity: 1,
			label: 'ctx-lh-S_subcentral_ant'
		},
		1175: {
			color: [61, 180, 250],
			opacity: 1,
			label: 'ctx-lh-S_subcentral_post'
		},
		1176: {
			color: [21, 20, 60],
			opacity: 1,
			label: 'ctx-lh-S_suborbital'
		},
		1177: {
			color: [101, 60, 60],
			opacity: 1,
			label: 'ctx-lh-S_subparietal'
		},
		1178: {
			color: [21, 220, 220],
			opacity: 1,
			label: 'ctx-lh-S_supracingulate'
		},
		1179: {
			color: [21, 180, 180],
			opacity: 1,
			label: 'ctx-lh-S_temporal_inferior'
		},
		1180: {
			color: [223, 220, 60],
			opacity: 1,
			label: 'ctx-lh-S_temporal_superior'
		},
		1181: {
			color: [221, 60, 60],
			opacity: 1,
			label: 'ctx-lh-S_temporal_transverse'
		},
		2100: {
			color: [0, 0, 0],
			opacity: 1,
			label: 'ctx-rh-Unknown'
		},
		2101: {
			color: [50, 50, 50],
			opacity: 1,
			label: 'ctx-rh-Corpus_callosum'
		},
		2102: {
			color: [180, 20, 30],
			opacity: 1,
			label: 'ctx-rh-G_and_S_Insula_ONLY_AVERAGE'
		},
		2103: {
			color: [60, 25, 25],
			opacity: 1,
			label: 'ctx-rh-G_cingulate-Isthmus'
		},
		2104: {
			color: [25, 60, 60],
			opacity: 1,
			label: 'ctx-rh-G_cingulate-Main_part'
		},
		2105: {
			color: [180, 20, 20],
			opacity: 1,
			label: 'ctx-rh-G_cuneus'
		},
		2106: {
			color: [220, 20, 100],
			opacity: 1,
			label: 'ctx-rh-G_frontal_inf-Opercular_part'
		},
		2107: {
			color: [140, 60, 60],
			opacity: 1,
			label: 'ctx-rh-G_frontal_inf-Orbital_part'
		},
		2108: {
			color: [180, 220, 140],
			opacity: 1,
			label: 'ctx-rh-G_frontal_inf-Triangular_part'
		},
		2109: {
			color: [140, 100, 180],
			opacity: 1,
			label: 'ctx-rh-G_frontal_middle'
		},
		2110: {
			color: [180, 20, 140],
			opacity: 1,
			label: 'ctx-rh-G_frontal_superior'
		},
		2111: {
			color: [140, 20, 140],
			opacity: 1,
			label: 'ctx-rh-G_frontomarginal'
		},
		2112: {
			color: [21, 10, 10],
			opacity: 1,
			label: 'ctx-rh-G_insular_long'
		},
		2113: {
			color: [225, 140, 140],
			opacity: 1,
			label: 'ctx-rh-G_insular_short'
		},
		2114: {
			color: [23, 60, 180],
			opacity: 1,
			label: 'ctx-rh-G_and_S_occipital_inferior'
		},
		2115: {
			color: [180, 60, 180],
			opacity: 1,
			label: 'ctx-rh-G_occipital_middle'
		},
		2116: {
			color: [20, 220, 60],
			opacity: 1,
			label: 'ctx-rh-G_occipital_superior'
		},
		2117: {
			color: [60, 20, 140],
			opacity: 1,
			label: 'ctx-rh-G_occipit-temp_lat-Or_fusiform'
		},
		2118: {
			color: [220, 180, 140],
			opacity: 1,
			label: 'ctx-rh-G_occipit-temp_med-Lingual_part'
		},
		2119: {
			color: [65, 100, 20],
			opacity: 1,
			label: 'ctx-rh-G_occipit-temp_med-Parahippocampal_part'
		},
		2120: {
			color: [220, 60, 20],
			opacity: 1,
			label: 'ctx-rh-G_orbital'
		},
		2121: {
			color: [60, 100, 60],
			opacity: 1,
			label: 'ctx-rh-G_paracentral'
		},
		2122: {
			color: [20, 60, 220],
			opacity: 1,
			label: 'ctx-rh-G_parietal_inferior-Angular_part'
		},
		2123: {
			color: [100, 100, 60],
			opacity: 1,
			label: 'ctx-rh-G_parietal_inferior-Supramarginal_part'
		},
		2124: {
			color: [220, 180, 220],
			opacity: 1,
			label: 'ctx-rh-G_parietal_superior'
		},
		2125: {
			color: [20, 180, 140],
			opacity: 1,
			label: 'ctx-rh-G_postcentral'
		},
		2126: {
			color: [60, 140, 180],
			opacity: 1,
			label: 'ctx-rh-G_precentral'
		},
		2127: {
			color: [25, 20, 140],
			opacity: 1,
			label: 'ctx-rh-G_precuneus'
		},
		2128: {
			color: [20, 60, 100],
			opacity: 1,
			label: 'ctx-rh-G_rectus'
		},
		2129: {
			color: [60, 220, 20],
			opacity: 1,
			label: 'ctx-rh-G_subcallosal'
		},
		2130: {
			color: [60, 20, 220],
			opacity: 1,
			label: 'ctx-rh-G_subcentral'
		},
		2131: {
			color: [220, 220, 100],
			opacity: 1,
			label: 'ctx-rh-G_temporal_inferior'
		},
		2132: {
			color: [180, 60, 60],
			opacity: 1,
			label: 'ctx-rh-G_temporal_middle'
		},
		2133: {
			color: [60, 60, 220],
			opacity: 1,
			label: 'ctx-rh-G_temp_sup-G_temp_transv_and_interm_S'
		},
		2134: {
			color: [220, 60, 220],
			opacity: 1,
			label: 'ctx-rh-G_temp_sup-Lateral_aspect'
		},
		2135: {
			color: [65, 220, 60],
			opacity: 1,
			label: 'ctx-rh-G_temp_sup-Planum_polare'
		},
		2136: {
			color: [25, 140, 20],
			opacity: 1,
			label: 'ctx-rh-G_temp_sup-Planum_tempolare'
		},
		2137: {
			color: [13, 0, 250],
			opacity: 1,
			label: 'ctx-rh-G_and_S_transverse_frontopolar'
		},
		2138: {
			color: [61, 20, 220],
			opacity: 1,
			label: 'ctx-rh-Lat_Fissure-ant_sgt-ramus_horizontal'
		},
		2139: {
			color: [61, 20, 60],
			opacity: 1,
			label: 'ctx-rh-Lat_Fissure-ant_sgt-ramus_vertical'
		},
		2140: {
			color: [61, 60, 100],
			opacity: 1,
			label: 'ctx-rh-Lat_Fissure-post_sgt'
		},
		2141: {
			color: [25, 25, 25],
			opacity: 1,
			label: 'ctx-rh-Medial_wall'
		},
		2142: {
			color: [140, 20, 60],
			opacity: 1,
			label: 'ctx-rh-Pole_occipital'
		},
		2143: {
			color: [220, 180, 20],
			opacity: 1,
			label: 'ctx-rh-Pole_temporal'
		},
		2144: {
			color: [63, 180, 180],
			opacity: 1,
			label: 'ctx-rh-S_calcarine'
		},
		2145: {
			color: [221, 20, 10],
			opacity: 1,
			label: 'ctx-rh-S_central'
		},
		2146: {
			color: [21, 220, 20],
			opacity: 1,
			label: 'ctx-rh-S_central_insula'
		},
		2147: {
			color: [183, 100, 20],
			opacity: 1,
			label: 'ctx-rh-S_cingulate-Main_part_and_Intracingulate'
		},
		2148: {
			color: [221, 20, 100],
			opacity: 1,
			label: 'ctx-rh-S_cingulate-Marginalis_part'
		},
		2149: {
			color: [221, 60, 140],
			opacity: 1,
			label: 'ctx-rh-S_circular_insula_anterior'
		},
		2150: {
			color: [221, 20, 220],
			opacity: 1,
			label: 'ctx-rh-S_circular_insula_inferior'
		},
		2151: {
			color: [61, 220, 220],
			opacity: 1,
			label: 'ctx-rh-S_circular_insula_superior'
		},
		2152: {
			color: [100, 200, 200],
			opacity: 1,
			label: 'ctx-rh-S_collateral_transverse_ant'
		},
		2153: {
			color: [10, 200, 200],
			opacity: 1,
			label: 'ctx-rh-S_collateral_transverse_post'
		},
		2154: {
			color: [221, 220, 20],
			opacity: 1,
			label: 'ctx-rh-S_frontal_inferior'
		},
		2155: {
			color: [141, 20, 100],
			opacity: 1,
			label: 'ctx-rh-S_frontal_middle'
		},
		2156: {
			color: [61, 220, 100],
			opacity: 1,
			label: 'ctx-rh-S_frontal_superior'
		},
		2157: {
			color: [21, 220, 60],
			opacity: 1,
			label: 'ctx-rh-S_frontomarginal'
		},
		2158: {
			color: [141, 60, 20],
			opacity: 1,
			label: 'ctx-rh-S_intermedius_primus-Jensen'
		},
		2159: {
			color: [143, 20, 220],
			opacity: 1,
			label: 'ctx-rh-S_intraparietal-and_Parietal_transverse'
		},
		2160: {
			color: [61, 20, 180],
			opacity: 1,
			label: 'ctx-rh-S_occipital_anterior'
		},
		2161: {
			color: [101, 60, 220],
			opacity: 1,
			label: 'ctx-rh-S_occipital_middle_and_Lunatus'
		},
		2162: {
			color: [21, 20, 140],
			opacity: 1,
			label: 'ctx-rh-S_occipital_superior_and_transversalis'
		},
		2163: {
			color: [221, 140, 20],
			opacity: 1,
			label: 'ctx-rh-S_occipito-temporal_lateral'
		},
		2164: {
			color: [141, 100, 220],
			opacity: 1,
			label: 'ctx-rh-S_occipito-temporal_medial_and_S_Lingual'
		},
		2165: {
			color: [101, 20, 20],
			opacity: 1,
			label: 'ctx-rh-S_orbital-H_shapped'
		},
		2166: {
			color: [221, 100, 20],
			opacity: 1,
			label: 'ctx-rh-S_orbital_lateral'
		},
		2167: {
			color: [181, 200, 20],
			opacity: 1,
			label: 'ctx-rh-S_orbital_medial-Or_olfactory'
		},
		2168: {
			color: [21, 180, 140],
			opacity: 1,
			label: 'ctx-rh-S_paracentral'
		},
		2169: {
			color: [101, 100, 180],
			opacity: 1,
			label: 'ctx-rh-S_parieto_occipital'
		},
		2170: {
			color: [181, 220, 20],
			opacity: 1,
			label: 'ctx-rh-S_pericallosal'
		},
		2171: {
			color: [21, 140, 200],
			opacity: 1,
			label: 'ctx-rh-S_postcentral'
		},
		2172: {
			color: [21, 20, 240],
			opacity: 1,
			label: 'ctx-rh-S_precentral-Inferior-part'
		},
		2173: {
			color: [21, 20, 200],
			opacity: 1,
			label: 'ctx-rh-S_precentral-Superior-part'
		},
		2174: {
			color: [61, 180, 60],
			opacity: 1,
			label: 'ctx-rh-S_subcentral_ant'
		},
		2175: {
			color: [61, 180, 250],
			opacity: 1,
			label: 'ctx-rh-S_subcentral_post'
		},
		2176: {
			color: [21, 20, 60],
			opacity: 1,
			label: 'ctx-rh-S_suborbital'
		},
		2177: {
			color: [101, 60, 60],
			opacity: 1,
			label: 'ctx-rh-S_subparietal'
		},
		2178: {
			color: [21, 220, 220],
			opacity: 1,
			label: 'ctx-rh-S_supracingulate'
		},
		2179: {
			color: [21, 180, 180],
			opacity: 1,
			label: 'ctx-rh-S_temporal_inferior'
		},
		2180: {
			color: [223, 220, 60],
			opacity: 1,
			label: 'ctx-rh-S_temporal_superior'
		},
		2181: {
			color: [221, 60, 60],
			opacity: 1,
			label: 'ctx-rh-S_temporal_transverse'
		},
		2200: {
			color: [25, 60, 61],
			opacity: 1,
			label: 'ctx-rh-G_cingulate-caudal_ACC'
		},
		2201: {
			color: [25, 90, 60],
			opacity: 1,
			label: 'ctx-rh-G_cingulate-rostral_ACC'
		},
		2202: {
			color: [25, 120, 60],
			opacity: 1,
			label: 'ctx-rh-G_cingulate-posterior'
		},
		2205: {
			color: [25, 150, 60],
			opacity: 1,
			label: 'ctx-rh-S_cingulate-caudal_ACC'
		},
		2206: {
			color: [25, 180, 60],
			opacity: 1,
			label: 'ctx-rh-S_cingulate-rostral_ACC'
		},
		2207: {
			color: [25, 210, 60],
			opacity: 1,
			label: 'ctx-rh-S_cingulate-posterior'
		},
		2210: {
			color: [25, 150, 90],
			opacity: 1,
			label: 'ctx-rh-S_pericallosal-caudal'
		},
		2211: {
			color: [25, 180, 90],
			opacity: 1,
			label: 'ctx-rh-S_pericallosal-rostral'
		},
		2212: {
			color: [25, 210, 90],
			opacity: 1,
			label: 'ctx-rh-S_pericallosal-posterior'
		},
		3100: {
			color: [0, 0, 0],
			opacity: 1,
			label: 'wm-lh-Unknown'
		},
		3101: {
			color: [50, 50, 50],
			opacity: 1,
			label: 'wm-lh-Corpus_callosum'
		},
		3102: {
			color: [180, 20, 30],
			opacity: 1,
			label: 'wm-lh-G_and_S_Insula_ONLY_AVERAGE'
		},
		3103: {
			color: [60, 25, 25],
			opacity: 1,
			label: 'wm-lh-G_cingulate-Isthmus'
		},
		3104: {
			color: [25, 60, 60],
			opacity: 1,
			label: 'wm-lh-G_cingulate-Main_part'
		},
		3105: {
			color: [180, 20, 20],
			opacity: 1,
			label: 'wm-lh-G_cuneus'
		},
		3106: {
			color: [220, 20, 100],
			opacity: 1,
			label: 'wm-lh-G_frontal_inf-Opercular_part'
		},
		3107: {
			color: [140, 60, 60],
			opacity: 1,
			label: 'wm-lh-G_frontal_inf-Orbital_part'
		},
		3108: {
			color: [180, 220, 140],
			opacity: 1,
			label: 'wm-lh-G_frontal_inf-Triangular_part'
		},
		3109: {
			color: [140, 100, 180],
			opacity: 1,
			label: 'wm-lh-G_frontal_middle'
		},
		3110: {
			color: [180, 20, 140],
			opacity: 1,
			label: 'wm-lh-G_frontal_superior'
		},
		3111: {
			color: [140, 20, 140],
			opacity: 1,
			label: 'wm-lh-G_frontomarginal'
		},
		3112: {
			color: [21, 10, 10],
			opacity: 1,
			label: 'wm-lh-G_insular_long'
		},
		3113: {
			color: [225, 140, 140],
			opacity: 1,
			label: 'wm-lh-G_insular_short'
		},
		3114: {
			color: [23, 60, 180],
			opacity: 1,
			label: 'wm-lh-G_and_S_occipital_inferior'
		},
		3115: {
			color: [180, 60, 180],
			opacity: 1,
			label: 'wm-lh-G_occipital_middle'
		},
		3116: {
			color: [20, 220, 60],
			opacity: 1,
			label: 'wm-lh-G_occipital_superior'
		},
		3117: {
			color: [60, 20, 140],
			opacity: 1,
			label: 'wm-lh-G_occipit-temp_lat-Or_fusiform'
		},
		3118: {
			color: [220, 180, 140],
			opacity: 1,
			label: 'wm-lh-G_occipit-temp_med-Lingual_part'
		},
		3119: {
			color: [65, 100, 20],
			opacity: 1,
			label: 'wm-lh-G_occipit-temp_med-Parahippocampal_part'
		},
		3120: {
			color: [220, 60, 20],
			opacity: 1,
			label: 'wm-lh-G_orbital'
		},
		3121: {
			color: [60, 100, 60],
			opacity: 1,
			label: 'wm-lh-G_paracentral'
		},
		3122: {
			color: [20, 60, 220],
			opacity: 1,
			label: 'wm-lh-G_parietal_inferior-Angular_part'
		},
		3123: {
			color: [100, 100, 60],
			opacity: 1,
			label: 'wm-lh-G_parietal_inferior-Supramarginal_part'
		},
		3124: {
			color: [220, 180, 220],
			opacity: 1,
			label: 'wm-lh-G_parietal_superior'
		},
		3125: {
			color: [20, 180, 140],
			opacity: 1,
			label: 'wm-lh-G_postcentral'
		},
		3126: {
			color: [60, 140, 180],
			opacity: 1,
			label: 'wm-lh-G_precentral'
		},
		3127: {
			color: [25, 20, 140],
			opacity: 1,
			label: 'wm-lh-G_precuneus'
		},
		3128: {
			color: [20, 60, 100],
			opacity: 1,
			label: 'wm-lh-G_rectus'
		},
		3129: {
			color: [60, 220, 20],
			opacity: 1,
			label: 'wm-lh-G_subcallosal'
		},
		3130: {
			color: [60, 20, 220],
			opacity: 1,
			label: 'wm-lh-G_subcentral'
		},
		3131: {
			color: [220, 220, 100],
			opacity: 1,
			label: 'wm-lh-G_temporal_inferior'
		},
		3132: {
			color: [180, 60, 60],
			opacity: 1,
			label: 'wm-lh-G_temporal_middle'
		},
		3133: {
			color: [60, 60, 220],
			opacity: 1,
			label: 'wm-lh-G_temp_sup-G_temp_transv_and_interm_S'
		},
		3134: {
			color: [220, 60, 220],
			opacity: 1,
			label: 'wm-lh-G_temp_sup-Lateral_aspect'
		},
		3135: {
			color: [65, 220, 60],
			opacity: 1,
			label: 'wm-lh-G_temp_sup-Planum_polare'
		},
		3136: {
			color: [25, 140, 20],
			opacity: 1,
			label: 'wm-lh-G_temp_sup-Planum_tempolare'
		},
		3137: {
			color: [13, 0, 250],
			opacity: 1,
			label: 'wm-lh-G_and_S_transverse_frontopolar'
		},
		3138: {
			color: [61, 20, 220],
			opacity: 1,
			label: 'wm-lh-Lat_Fissure-ant_sgt-ramus_horizontal'
		},
		3139: {
			color: [61, 20, 60],
			opacity: 1,
			label: 'wm-lh-Lat_Fissure-ant_sgt-ramus_vertical'
		},
		3140: {
			color: [61, 60, 100],
			opacity: 1,
			label: 'wm-lh-Lat_Fissure-post_sgt'
		},
		3141: {
			color: [25, 25, 25],
			opacity: 1,
			label: 'wm-lh-Medial_wall'
		},
		3142: {
			color: [140, 20, 60],
			opacity: 1,
			label: 'wm-lh-Pole_occipital'
		},
		3143: {
			color: [220, 180, 20],
			opacity: 1,
			label: 'wm-lh-Pole_temporal'
		},
		3144: {
			color: [63, 180, 180],
			opacity: 1,
			label: 'wm-lh-S_calcarine'
		},
		3145: {
			color: [221, 20, 10],
			opacity: 1,
			label: 'wm-lh-S_central'
		},
		3146: {
			color: [21, 220, 20],
			opacity: 1,
			label: 'wm-lh-S_central_insula'
		},
		3147: {
			color: [183, 100, 20],
			opacity: 1,
			label: 'wm-lh-S_cingulate-Main_part_and_Intracingulate'
		},
		3148: {
			color: [221, 20, 100],
			opacity: 1,
			label: 'wm-lh-S_cingulate-Marginalis_part'
		},
		3149: {
			color: [221, 60, 140],
			opacity: 1,
			label: 'wm-lh-S_circular_insula_anterior'
		},
		3150: {
			color: [221, 20, 220],
			opacity: 1,
			label: 'wm-lh-S_circular_insula_inferior'
		},
		3151: {
			color: [61, 220, 220],
			opacity: 1,
			label: 'wm-lh-S_circular_insula_superior'
		},
		3152: {
			color: [100, 200, 200],
			opacity: 1,
			label: 'wm-lh-S_collateral_transverse_ant'
		},
		3153: {
			color: [10, 200, 200],
			opacity: 1,
			label: 'wm-lh-S_collateral_transverse_post'
		},
		3154: {
			color: [221, 220, 20],
			opacity: 1,
			label: 'wm-lh-S_frontal_inferior'
		},
		3155: {
			color: [141, 20, 100],
			opacity: 1,
			label: 'wm-lh-S_frontal_middle'
		},
		3156: {
			color: [61, 220, 100],
			opacity: 1,
			label: 'wm-lh-S_frontal_superior'
		},
		3157: {
			color: [21, 220, 60],
			opacity: 1,
			label: 'wm-lh-S_frontomarginal'
		},
		3158: {
			color: [141, 60, 20],
			opacity: 1,
			label: 'wm-lh-S_intermedius_primus-Jensen'
		},
		3159: {
			color: [143, 20, 220],
			opacity: 1,
			label: 'wm-lh-S_intraparietal-and_Parietal_transverse'
		},
		3160: {
			color: [61, 20, 180],
			opacity: 1,
			label: 'wm-lh-S_occipital_anterior'
		},
		3161: {
			color: [101, 60, 220],
			opacity: 1,
			label: 'wm-lh-S_occipital_middle_and_Lunatus'
		},
		3162: {
			color: [21, 20, 140],
			opacity: 1,
			label: 'wm-lh-S_occipital_superior_and_transversalis'
		},
		3163: {
			color: [221, 140, 20],
			opacity: 1,
			label: 'wm-lh-S_occipito-temporal_lateral'
		},
		3164: {
			color: [141, 100, 220],
			opacity: 1,
			label: 'wm-lh-S_occipito-temporal_medial_and_S_Lingual'
		},
		3165: {
			color: [101, 20, 20],
			opacity: 1,
			label: 'wm-lh-S_orbital-H_shapped'
		},
		3166: {
			color: [221, 100, 20],
			opacity: 1,
			label: 'wm-lh-S_orbital_lateral'
		},
		3167: {
			color: [181, 200, 20],
			opacity: 1,
			label: 'wm-lh-S_orbital_medial-Or_olfactory'
		},
		3168: {
			color: [21, 180, 140],
			opacity: 1,
			label: 'wm-lh-S_paracentral'
		},
		3169: {
			color: [101, 100, 180],
			opacity: 1,
			label: 'wm-lh-S_parieto_occipital'
		},
		3170: {
			color: [181, 220, 20],
			opacity: 1,
			label: 'wm-lh-S_pericallosal'
		},
		3171: {
			color: [21, 140, 200],
			opacity: 1,
			label: 'wm-lh-S_postcentral'
		},
		3172: {
			color: [21, 20, 240],
			opacity: 1,
			label: 'wm-lh-S_precentral-Inferior-part'
		},
		3173: {
			color: [21, 20, 200],
			opacity: 1,
			label: 'wm-lh-S_precentral-Superior-part'
		},
		3174: {
			color: [61, 180, 60],
			opacity: 1,
			label: 'wm-lh-S_subcentral_ant'
		},
		3175: {
			color: [61, 180, 250],
			opacity: 1,
			label: 'wm-lh-S_subcentral_post'
		},
		3176: {
			color: [21, 20, 60],
			opacity: 1,
			label: 'wm-lh-S_suborbital'
		},
		3177: {
			color: [101, 60, 60],
			opacity: 1,
			label: 'wm-lh-S_subparietal'
		},
		3178: {
			color: [21, 220, 220],
			opacity: 1,
			label: 'wm-lh-S_supracingulate'
		},
		3179: {
			color: [21, 180, 180],
			opacity: 1,
			label: 'wm-lh-S_temporal_inferior'
		},
		3180: {
			color: [223, 220, 60],
			opacity: 1,
			label: 'wm-lh-S_temporal_superior'
		},
		3181: {
			color: [221, 60, 60],
			opacity: 1,
			label: 'wm-lh-S_temporal_transverse'
		},
		4100: {
			color: [0, 0, 0],
			opacity: 1,
			label: 'wm-rh-Unknown'
		},
		4101: {
			color: [50, 50, 50],
			opacity: 1,
			label: 'wm-rh-Corpus_callosum'
		},
		4102: {
			color: [180, 20, 30],
			opacity: 1,
			label: 'wm-rh-G_and_S_Insula_ONLY_AVERAGE'
		},
		4103: {
			color: [60, 25, 25],
			opacity: 1,
			label: 'wm-rh-G_cingulate-Isthmus'
		},
		4104: {
			color: [25, 60, 60],
			opacity: 1,
			label: 'wm-rh-G_cingulate-Main_part'
		},
		4105: {
			color: [180, 20, 20],
			opacity: 1,
			label: 'wm-rh-G_cuneus'
		},
		4106: {
			color: [220, 20, 100],
			opacity: 1,
			label: 'wm-rh-G_frontal_inf-Opercular_part'
		},
		4107: {
			color: [140, 60, 60],
			opacity: 1,
			label: 'wm-rh-G_frontal_inf-Orbital_part'
		},
		4108: {
			color: [180, 220, 140],
			opacity: 1,
			label: 'wm-rh-G_frontal_inf-Triangular_part'
		},
		4109: {
			color: [140, 100, 180],
			opacity: 1,
			label: 'wm-rh-G_frontal_middle'
		},
		4110: {
			color: [180, 20, 140],
			opacity: 1,
			label: 'wm-rh-G_frontal_superior'
		},
		4111: {
			color: [140, 20, 140],
			opacity: 1,
			label: 'wm-rh-G_frontomarginal'
		},
		4112: {
			color: [21, 10, 10],
			opacity: 1,
			label: 'wm-rh-G_insular_long'
		},
		4113: {
			color: [225, 140, 140],
			opacity: 1,
			label: 'wm-rh-G_insular_short'
		},
		4114: {
			color: [23, 60, 180],
			opacity: 1,
			label: 'wm-rh-G_and_S_occipital_inferior'
		},
		4115: {
			color: [180, 60, 180],
			opacity: 1,
			label: 'wm-rh-G_occipital_middle'
		},
		4116: {
			color: [20, 220, 60],
			opacity: 1,
			label: 'wm-rh-G_occipital_superior'
		},
		4117: {
			color: [60, 20, 140],
			opacity: 1,
			label: 'wm-rh-G_occipit-temp_lat-Or_fusiform'
		},
		4118: {
			color: [220, 180, 140],
			opacity: 1,
			label: 'wm-rh-G_occipit-temp_med-Lingual_part'
		},
		4119: {
			color: [65, 100, 20],
			opacity: 1,
			label: 'wm-rh-G_occipit-temp_med-Parahippocampal_part'
		},
		4120: {
			color: [220, 60, 20],
			opacity: 1,
			label: 'wm-rh-G_orbital'
		},
		4121: {
			color: [60, 100, 60],
			opacity: 1,
			label: 'wm-rh-G_paracentral'
		},
		4122: {
			color: [20, 60, 220],
			opacity: 1,
			label: 'wm-rh-G_parietal_inferior-Angular_part'
		},
		4123: {
			color: [100, 100, 60],
			opacity: 1,
			label: 'wm-rh-G_parietal_inferior-Supramarginal_part'
		},
		4124: {
			color: [220, 180, 220],
			opacity: 1,
			label: 'wm-rh-G_parietal_superior'
		},
		4125: {
			color: [20, 180, 140],
			opacity: 1,
			label: 'wm-rh-G_postcentral'
		},
		4126: {
			color: [60, 140, 180],
			opacity: 1,
			label: 'wm-rh-G_precentral'
		},
		4127: {
			color: [25, 20, 140],
			opacity: 1,
			label: 'wm-rh-G_precuneus'
		},
		4128: {
			color: [20, 60, 100],
			opacity: 1,
			label: 'wm-rh-G_rectus'
		},
		4129: {
			color: [60, 220, 20],
			opacity: 1,
			label: 'wm-rh-G_subcallosal'
		},
		4130: {
			color: [60, 20, 220],
			opacity: 1,
			label: 'wm-rh-G_subcentral'
		},
		4131: {
			color: [220, 220, 100],
			opacity: 1,
			label: 'wm-rh-G_temporal_inferior'
		},
		4132: {
			color: [180, 60, 60],
			opacity: 1,
			label: 'wm-rh-G_temporal_middle'
		},
		4133: {
			color: [60, 60, 220],
			opacity: 1,
			label: 'wm-rh-G_temp_sup-G_temp_transv_and_interm_S'
		},
		4134: {
			color: [220, 60, 220],
			opacity: 1,
			label: 'wm-rh-G_temp_sup-Lateral_aspect'
		},
		4135: {
			color: [65, 220, 60],
			opacity: 1,
			label: 'wm-rh-G_temp_sup-Planum_polare'
		},
		4136: {
			color: [25, 140, 20],
			opacity: 1,
			label: 'wm-rh-G_temp_sup-Planum_tempolare'
		},
		4137: {
			color: [13, 0, 250],
			opacity: 1,
			label: 'wm-rh-G_and_S_transverse_frontopolar'
		},
		4138: {
			color: [61, 20, 220],
			opacity: 1,
			label: 'wm-rh-Lat_Fissure-ant_sgt-ramus_horizontal'
		},
		4139: {
			color: [61, 20, 60],
			opacity: 1,
			label: 'wm-rh-Lat_Fissure-ant_sgt-ramus_vertical'
		},
		4140: {
			color: [61, 60, 100],
			opacity: 1,
			label: 'wm-rh-Lat_Fissure-post_sgt'
		},
		4141: {
			color: [25, 25, 25],
			opacity: 1,
			label: 'wm-rh-Medial_wall'
		},
		4142: {
			color: [140, 20, 60],
			opacity: 1,
			label: 'wm-rh-Pole_occipital'
		},
		4143: {
			color: [220, 180, 20],
			opacity: 1,
			label: 'wm-rh-Pole_temporal'
		},
		4144: {
			color: [63, 180, 180],
			opacity: 1,
			label: 'wm-rh-S_calcarine'
		},
		4145: {
			color: [221, 20, 10],
			opacity: 1,
			label: 'wm-rh-S_central'
		},
		4146: {
			color: [21, 220, 20],
			opacity: 1,
			label: 'wm-rh-S_central_insula'
		},
		4147: {
			color: [183, 100, 20],
			opacity: 1,
			label: 'wm-rh-S_cingulate-Main_part_and_Intracingulate'
		},
		4148: {
			color: [221, 20, 100],
			opacity: 1,
			label: 'wm-rh-S_cingulate-Marginalis_part'
		},
		4149: {
			color: [221, 60, 140],
			opacity: 1,
			label: 'wm-rh-S_circular_insula_anterior'
		},
		4150: {
			color: [221, 20, 220],
			opacity: 1,
			label: 'wm-rh-S_circular_insula_inferior'
		},
		4151: {
			color: [61, 220, 220],
			opacity: 1,
			label: 'wm-rh-S_circular_insula_superior'
		},
		4152: {
			color: [100, 200, 200],
			opacity: 1,
			label: 'wm-rh-S_collateral_transverse_ant'
		},
		4153: {
			color: [10, 200, 200],
			opacity: 1,
			label: 'wm-rh-S_collateral_transverse_post'
		},
		4154: {
			color: [221, 220, 20],
			opacity: 1,
			label: 'wm-rh-S_frontal_inferior'
		},
		4155: {
			color: [141, 20, 100],
			opacity: 1,
			label: 'wm-rh-S_frontal_middle'
		},
		4156: {
			color: [61, 220, 100],
			opacity: 1,
			label: 'wm-rh-S_frontal_superior'
		},
		4157: {
			color: [21, 220, 60],
			opacity: 1,
			label: 'wm-rh-S_frontomarginal'
		},
		4158: {
			color: [141, 60, 20],
			opacity: 1,
			label: 'wm-rh-S_intermedius_primus-Jensen'
		},
		4159: {
			color: [143, 20, 220],
			opacity: 1,
			label: 'wm-rh-S_intraparietal-and_Parietal_transverse'
		},
		4160: {
			color: [61, 20, 180],
			opacity: 1,
			label: 'wm-rh-S_occipital_anterior'
		},
		4161: {
			color: [101, 60, 220],
			opacity: 1,
			label: 'wm-rh-S_occipital_middle_and_Lunatus'
		},
		4162: {
			color: [21, 20, 140],
			opacity: 1,
			label: 'wm-rh-S_occipital_superior_and_transversalis'
		},
		4163: {
			color: [221, 140, 20],
			opacity: 1,
			label: 'wm-rh-S_occipito-temporal_lateral'
		},
		4164: {
			color: [141, 100, 220],
			opacity: 1,
			label: 'wm-rh-S_occipito-temporal_medial_and_S_Lingual'
		},
		4165: {
			color: [101, 20, 20],
			opacity: 1,
			label: 'wm-rh-S_orbital-H_shapped'
		},
		4166: {
			color: [221, 100, 20],
			opacity: 1,
			label: 'wm-rh-S_orbital_lateral'
		},
		4167: {
			color: [181, 200, 20],
			opacity: 1,
			label: 'wm-rh-S_orbital_medial-Or_olfactory'
		},
		4168: {
			color: [21, 180, 140],
			opacity: 1,
			label: 'wm-rh-S_paracentral'
		},
		4169: {
			color: [101, 100, 180],
			opacity: 1,
			label: 'wm-rh-S_parieto_occipital'
		},
		4170: {
			color: [181, 220, 20],
			opacity: 1,
			label: 'wm-rh-S_pericallosal'
		},
		4171: {
			color: [21, 140, 200],
			opacity: 1,
			label: 'wm-rh-S_postcentral'
		},
		4172: {
			color: [21, 20, 240],
			opacity: 1,
			label: 'wm-rh-S_precentral-Inferior-part'
		},
		4173: {
			color: [21, 20, 200],
			opacity: 1,
			label: 'wm-rh-S_precentral-Superior-part'
		},
		4174: {
			color: [61, 180, 60],
			opacity: 1,
			label: 'wm-rh-S_subcentral_ant'
		},
		4175: {
			color: [61, 180, 250],
			opacity: 1,
			label: 'wm-rh-S_subcentral_post'
		},
		4176: {
			color: [21, 20, 60],
			opacity: 1,
			label: 'wm-rh-S_suborbital'
		},
		4177: {
			color: [101, 60, 60],
			opacity: 1,
			label: 'wm-rh-S_subparietal'
		},
		4178: {
			color: [21, 220, 220],
			opacity: 1,
			label: 'wm-rh-S_supracingulate'
		},
		4179: {
			color: [21, 180, 180],
			opacity: 1,
			label: 'wm-rh-S_temporal_inferior'
		},
		4180: {
			color: [223, 220, 60],
			opacity: 1,
			label: 'wm-rh-S_temporal_superior'
		},
		4181: {
			color: [221, 60, 60],
			opacity: 1,
			label: 'wm-rh-S_temporal_transverse'
		},
		5001: {
			color: [20, 30, 40],
			opacity: 1,
			label: 'Left-UnsegmentedWhiteMatter'
		},
		5002: {
			color: [20, 30, 40],
			opacity: 1,
			label: 'Right-UnsegmentedWhiteMatter'
		},
		5100: {
			color: [204, 102, 102],
			opacity: 1,
			label: 'fmajor'
		},
		5101: {
			color: [204, 102, 102],
			opacity: 1,
			label: 'fminor'
		},
		5102: {
			color: [255, 255, 102],
			opacity: 1,
			label: 'lh.atr'
		},
		5103: {
			color: [153, 204, 0],
			opacity: 1,
			label: 'lh.cab'
		},
		5104: {
			color: [0, 153, 153],
			opacity: 1,
			label: 'lh.ccg'
		},
		5105: {
			color: [204, 153, 255],
			opacity: 1,
			label: 'lh.cst'
		},
		5106: {
			color: [255, 153, 51],
			opacity: 1,
			label: 'lh.ilf'
		},
		5107: {
			color: [204, 204, 204],
			opacity: 1,
			label: 'lh.slfp'
		},
		5108: {
			color: [153, 255, 255],
			opacity: 1,
			label: 'lh.slft'
		},
		5109: {
			color: [102, 153, 255],
			opacity: 1,
			label: 'lh.unc'
		},
		5110: {
			color: [255, 255, 102],
			opacity: 1,
			label: 'rh.atr'
		},
		5111: {
			color: [153, 204, 0],
			opacity: 1,
			label: 'rh.cab'
		},
		5112: {
			color: [0, 153, 153],
			opacity: 1,
			label: 'rh.ccg'
		},
		5113: {
			color: [204, 153, 255],
			opacity: 1,
			label: 'rh.cst'
		},
		5114: {
			color: [255, 153, 51],
			opacity: 1,
			label: 'rh.ilf'
		},
		5115: {
			color: [204, 204, 204],
			opacity: 1,
			label: 'rh.slfp'
		},
		5116: {
			color: [153, 255, 255],
			opacity: 1,
			label: 'rh.slft'
		},
		5117: {
			color: [102, 153, 255],
			opacity: 1,
			label: 'rh.unc'
		},
		5200: {
			color: [204, 102, 102],
			opacity: 1,
			label: 'CC-ForcepsMajor'
		},
		5201: {
			color: [204, 102, 102],
			opacity: 1,
			label: 'CC-ForcepsMinor'
		},
		5202: {
			color: [255, 255, 102],
			opacity: 1,
			label: 'LAntThalRadiation'
		},
		5203: {
			color: [153, 204, 0],
			opacity: 1,
			label: 'LCingulumAngBundle'
		},
		5204: {
			color: [0, 153, 153],
			opacity: 1,
			label: 'LCingulumCingGyrus'
		},
		5205: {
			color: [204, 153, 255],
			opacity: 1,
			label: 'LCorticospinalTract'
		},
		5206: {
			color: [255, 153, 51],
			opacity: 1,
			label: 'LInfLongFas'
		},
		5207: {
			color: [204, 204, 204],
			opacity: 1,
			label: 'LSupLongFasParietal'
		},
		5208: {
			color: [153, 255, 255],
			opacity: 1,
			label: 'LSupLongFasTemporal'
		},
		5209: {
			color: [102, 153, 255],
			opacity: 1,
			label: 'LUncinateFas'
		},
		5210: {
			color: [255, 255, 102],
			opacity: 1,
			label: 'RAntThalRadiation'
		},
		5211: {
			color: [153, 204, 0],
			opacity: 1,
			label: 'RCingulumAngBundle'
		},
		5212: {
			color: [0, 153, 153],
			opacity: 1,
			label: 'RCingulumCingGyrus'
		},
		5213: {
			color: [204, 153, 255],
			opacity: 1,
			label: 'RCorticospinalTract'
		},
		5214: {
			color: [255, 153, 51],
			opacity: 1,
			label: 'RInfLongFas'
		},
		5215: {
			color: [204, 204, 204],
			opacity: 1,
			label: 'RSupLongFasParietal'
		},
		5216: {
			color: [153, 255, 255],
			opacity: 1,
			label: 'RSupLongFasTemporal'
		},
		5217: {
			color: [102, 153, 255],
			opacity: 1,
			label: 'RUncinateFas'
		},
		6000: {
			color: [0, 255, 0],
			opacity: 1,
			label: 'CST-orig'
		},
		6001: {
			color: [255, 255, 0],
			opacity: 1,
			label: 'CST-hammer'
		},
		6002: {
			color: [0, 255, 255],
			opacity: 1,
			label: 'CST-CVS'
		},
		6003: {
			color: [0, 0, 255],
			opacity: 1,
			label: 'CST-flirt'
		},
		6010: {
			color: [236, 16, 231],
			opacity: 1,
			label: 'Left-SLF1'
		},
		6020: {
			color: [237, 18, 232],
			opacity: 1,
			label: 'Right-SLF1'
		},
		6030: {
			color: [236, 13, 227],
			opacity: 1,
			label: 'Left-SLF3'
		},
		6040: {
			color: [236, 17, 228],
			opacity: 1,
			label: 'Right-SLF3'
		},
		6050: {
			color: [1, 255, 1],
			opacity: 1,
			label: 'Left-CST'
		},
		6060: {
			color: [2, 255, 1],
			opacity: 1,
			label: 'Right-CST'
		},
		6070: {
			color: [236, 14, 230],
			opacity: 1,
			label: 'Left-SLF2'
		},
		6080: {
			color: [237, 14, 230],
			opacity: 1,
			label: 'Right-SLF2'
		},
		7001: {
			color: [72, 132, 181],
			opacity: 1,
			label: 'Lateral-nucleus'
		},
		7002: {
			color: [243, 243, 243],
			opacity: 1,
			label: 'Basolateral-nucleus'
		},
		7003: {
			color: [207, 63, 79],
			opacity: 1,
			label: 'Basal-nucleus'
		},
		7004: {
			color: [121, 20, 135],
			opacity: 1,
			label: 'Centromedial-nucleus'
		},
		7005: {
			color: [197, 60, 248],
			opacity: 1,
			label: 'Central-nucleus'
		},
		7006: {
			color: [2, 149, 2],
			opacity: 1,
			label: 'Medial-nucleus'
		},
		7007: {
			color: [221, 249, 166],
			opacity: 1,
			label: 'Cortical-nucleus'
		},
		7008: {
			color: [232, 146, 35],
			opacity: 1,
			label: 'Accessory-Basal-nucleus'
		},
		7009: {
			color: [20, 60, 120],
			opacity: 1,
			label: 'Corticoamygdaloid-transitio'
		},
		7010: {
			color: [250, 250, 0],
			opacity: 1,
			label: 'Anterior-amygdaloid-area-AAA'
		},
		7011: {
			color: [122, 187, 222],
			opacity: 1,
			label: 'Fusion-amygdala-HP-FAH'
		},
		7012: {
			color: [237, 12, 177],
			opacity: 1,
			label: 'Hippocampal-amygdala-transition-HATA'
		},
		7013: {
			color: [10, 49, 255],
			opacity: 1,
			label: 'Endopiriform-nucleus'
		},
		7014: {
			color: [205, 184, 144],
			opacity: 1,
			label: 'Lateral-nucleus-olfactory-tract'
		},
		7015: {
			color: [45, 205, 165],
			opacity: 1,
			label: 'Paralaminar-nucleus'
		},
		7016: {
			color: [117, 160, 175],
			opacity: 1,
			label: 'Intercalated-nucleus'
		},
		7017: {
			color: [221, 217, 21],
			opacity: 1,
			label: 'Prepiriform-cortex'
		},
		7018: {
			color: [20, 60, 120],
			opacity: 1,
			label: 'Periamygdaloid-cortex'
		},
		7019: {
			color: [141, 21, 100],
			opacity: 1,
			label: 'Envelope-Amygdala'
		},
		7020: {
			color: [225, 140, 141],
			opacity: 1,
			label: 'Extranuclear-Amydala'
		},
		7100: {
			color: [42, 201, 168],
			opacity: 1,
			label: 'Brainstem-inferior-colliculus'
		},
		7101: {
			color: [168, 104, 162],
			opacity: 1,
			label: 'Brainstem-cochlear-nucleus'
		},
		8001: {
			color: [74, 130, 181],
			opacity: 1,
			label: 'Thalamus-Anterior'
		},
		8002: {
			color: [242, 241, 240],
			opacity: 1,
			label: 'Thalamus-Ventral-anterior'
		},
		8003: {
			color: [206, 65, 78],
			opacity: 1,
			label: 'Thalamus-Lateral-dorsal'
		},
		8004: {
			color: [120, 21, 133],
			opacity: 1,
			label: 'Thalamus-Lateral-posterior'
		},
		8005: {
			color: [195, 61, 246],
			opacity: 1,
			label: 'Thalamus-Ventral-lateral'
		},
		8006: {
			color: [3, 147, 6],
			opacity: 1,
			label: 'Thalamus-Ventral-posterior-medial'
		},
		8007: {
			color: [220, 251, 163],
			opacity: 1,
			label: 'Thalamus-Ventral-posterior-lateral'
		},
		8008: {
			color: [232, 146, 33],
			opacity: 1,
			label: 'Thalamus-intralaminar'
		},
		8009: {
			color: [4, 114, 14],
			opacity: 1,
			label: 'Thalamus-centromedian'
		},
		8010: {
			color: [121, 184, 220],
			opacity: 1,
			label: 'Thalamus-mediodorsal'
		},
		8011: {
			color: [235, 11, 175],
			opacity: 1,
			label: 'Thalamus-medial'
		},
		8012: {
			color: [12, 46, 250],
			opacity: 1,
			label: 'Thalamus-pulvinar'
		},
		8013: {
			color: [203, 182, 143],
			opacity: 1,
			label: 'Thalamus-lateral-geniculate'
		},
		8014: {
			color: [42, 204, 167],
			opacity: 1,
			label: 'Thalamus-medial-geniculate'
		},
		9000: {
			color: [50, 100, 30],
			opacity: 1,
			label: 'ctx-lh-prefrontal'
		},
		9001: {
			color: [30, 100, 45],
			opacity: 1,
			label: 'ctx-lh-primary-motor'
		},
		9002: {
			color: [130, 100, 165],
			opacity: 1,
			label: 'ctx-lh-premotor'
		},
		9003: {
			color: [105, 25, 5],
			opacity: 1,
			label: 'ctx-lh-temporal'
		},
		9004: {
			color: [125, 70, 55],
			opacity: 1,
			label: 'ctx-lh-posterior-parietal'
		},
		9005: {
			color: [225, 20, 105],
			opacity: 1,
			label: 'ctx-lh-prim-sec-somatosensory'
		},
		9006: {
			color: [225, 20, 15],
			opacity: 1,
			label: 'ctx-lh-occipital'
		},
		9500: {
			color: [50, 200, 30],
			opacity: 1,
			label: 'ctx-rh-prefrontal'
		},
		9501: {
			color: [30, 150, 45],
			opacity: 1,
			label: 'ctx-rh-primary-motor'
		},
		9502: {
			color: [130, 150, 165],
			opacity: 1,
			label: 'ctx-rh-premotor'
		},
		9503: {
			color: [105, 75, 5],
			opacity: 1,
			label: 'ctx-rh-temporal'
		},
		9504: {
			color: [125, 120, 55],
			opacity: 1,
			label: 'ctx-rh-posterior-parietal'
		},
		9505: {
			color: [225, 70, 105],
			opacity: 1,
			label: 'ctx-rh-prim-sec-somatosensory'
		},
		9506: {
			color: [225, 70, 15],
			opacity: 1,
			label: 'ctx-rh-occipital'
		},
		11100: {
			color: [0, 0, 0],
			opacity: 1,
			label: 'ctx_lh_Unknown'
		},
		11101: {
			color: [23, 220, 60],
			opacity: 1,
			label: 'ctx_lh_G_and_S_frontomargin'
		},
		11102: {
			color: [23, 60, 180],
			opacity: 1,
			label: 'ctx_lh_G_and_S_occipital_inf'
		},
		11103: {
			color: [63, 100, 60],
			opacity: 1,
			label: 'ctx_lh_G_and_S_paracentral'
		},
		11104: {
			color: [63, 20, 220],
			opacity: 1,
			label: 'ctx_lh_G_and_S_subcentral'
		},
		11105: {
			color: [13, 0, 250],
			opacity: 1,
			label: 'ctx_lh_G_and_S_transv_frontopol'
		},
		11106: {
			color: [26, 60, 0],
			opacity: 1,
			label: 'ctx_lh_G_and_S_cingul-Ant'
		},
		11107: {
			color: [26, 60, 75],
			opacity: 1,
			label: 'ctx_lh_G_and_S_cingul-Mid-Ant'
		},
		11108: {
			color: [26, 60, 150],
			opacity: 1,
			label: 'ctx_lh_G_and_S_cingul-Mid-Post'
		},
		11109: {
			color: [25, 60, 250],
			opacity: 1,
			label: 'ctx_lh_G_cingul-Post-dorsal'
		},
		11110: {
			color: [60, 25, 25],
			opacity: 1,
			label: 'ctx_lh_G_cingul-Post-ventral'
		},
		11111: {
			color: [180, 20, 20],
			opacity: 1,
			label: 'ctx_lh_G_cuneus'
		},
		11112: {
			color: [220, 20, 100],
			opacity: 1,
			label: 'ctx_lh_G_front_inf-Opercular'
		},
		11113: {
			color: [140, 60, 60],
			opacity: 1,
			label: 'ctx_lh_G_front_inf-Orbital'
		},
		11114: {
			color: [180, 220, 140],
			opacity: 1,
			label: 'ctx_lh_G_front_inf-Triangul'
		},
		11115: {
			color: [140, 100, 180],
			opacity: 1,
			label: 'ctx_lh_G_front_middle'
		},
		11116: {
			color: [180, 20, 140],
			opacity: 1,
			label: 'ctx_lh_G_front_sup'
		},
		11117: {
			color: [23, 10, 10],
			opacity: 1,
			label: 'ctx_lh_G_Ins_lg_and_S_cent_ins'
		},
		11118: {
			color: [225, 140, 140],
			opacity: 1,
			label: 'ctx_lh_G_insular_short'
		},
		11119: {
			color: [180, 60, 180],
			opacity: 1,
			label: 'ctx_lh_G_occipital_middle'
		},
		11120: {
			color: [20, 220, 60],
			opacity: 1,
			label: 'ctx_lh_G_occipital_sup'
		},
		11121: {
			color: [60, 20, 140],
			opacity: 1,
			label: 'ctx_lh_G_oc-temp_lat-fusifor'
		},
		11122: {
			color: [220, 180, 140],
			opacity: 1,
			label: 'ctx_lh_G_oc-temp_med-Lingual'
		},
		11123: {
			color: [65, 100, 20],
			opacity: 1,
			label: 'ctx_lh_G_oc-temp_med-Parahip'
		},
		11124: {
			color: [220, 60, 20],
			opacity: 1,
			label: 'ctx_lh_G_orbital'
		},
		11125: {
			color: [20, 60, 220],
			opacity: 1,
			label: 'ctx_lh_G_pariet_inf-Angular'
		},
		11126: {
			color: [100, 100, 60],
			opacity: 1,
			label: 'ctx_lh_G_pariet_inf-Supramar'
		},
		11127: {
			color: [220, 180, 220],
			opacity: 1,
			label: 'ctx_lh_G_parietal_sup'
		},
		11128: {
			color: [20, 180, 140],
			opacity: 1,
			label: 'ctx_lh_G_postcentral'
		},
		11129: {
			color: [60, 140, 180],
			opacity: 1,
			label: 'ctx_lh_G_precentral'
		},
		11130: {
			color: [25, 20, 140],
			opacity: 1,
			label: 'ctx_lh_G_precuneus'
		},
		11131: {
			color: [20, 60, 100],
			opacity: 1,
			label: 'ctx_lh_G_rectus'
		},
		11132: {
			color: [60, 220, 20],
			opacity: 1,
			label: 'ctx_lh_G_subcallosal'
		},
		11133: {
			color: [60, 60, 220],
			opacity: 1,
			label: 'ctx_lh_G_temp_sup-G_T_transv'
		},
		11134: {
			color: [220, 60, 220],
			opacity: 1,
			label: 'ctx_lh_G_temp_sup-Lateral'
		},
		11135: {
			color: [65, 220, 60],
			opacity: 1,
			label: 'ctx_lh_G_temp_sup-Plan_polar'
		},
		11136: {
			color: [25, 140, 20],
			opacity: 1,
			label: 'ctx_lh_G_temp_sup-Plan_tempo'
		},
		11137: {
			color: [220, 220, 100],
			opacity: 1,
			label: 'ctx_lh_G_temporal_inf'
		},
		11138: {
			color: [180, 60, 60],
			opacity: 1,
			label: 'ctx_lh_G_temporal_middle'
		},
		11139: {
			color: [61, 20, 220],
			opacity: 1,
			label: 'ctx_lh_Lat_Fis-ant-Horizont'
		},
		11140: {
			color: [61, 20, 60],
			opacity: 1,
			label: 'ctx_lh_Lat_Fis-ant-Vertical'
		},
		11141: {
			color: [61, 60, 100],
			opacity: 1,
			label: 'ctx_lh_Lat_Fis-post'
		},
		11142: {
			color: [25, 25, 25],
			opacity: 1,
			label: 'ctx_lh_Medial_wall'
		},
		11143: {
			color: [140, 20, 60],
			opacity: 1,
			label: 'ctx_lh_Pole_occipital'
		},
		11144: {
			color: [220, 180, 20],
			opacity: 1,
			label: 'ctx_lh_Pole_temporal'
		},
		11145: {
			color: [63, 180, 180],
			opacity: 1,
			label: 'ctx_lh_S_calcarine'
		},
		11146: {
			color: [221, 20, 10],
			opacity: 1,
			label: 'ctx_lh_S_central'
		},
		11147: {
			color: [221, 20, 100],
			opacity: 1,
			label: 'ctx_lh_S_cingul-Marginalis'
		},
		11148: {
			color: [221, 60, 140],
			opacity: 1,
			label: 'ctx_lh_S_circular_insula_ant'
		},
		11149: {
			color: [221, 20, 220],
			opacity: 1,
			label: 'ctx_lh_S_circular_insula_inf'
		},
		11150: {
			color: [61, 220, 220],
			opacity: 1,
			label: 'ctx_lh_S_circular_insula_sup'
		},
		11151: {
			color: [100, 200, 200],
			opacity: 1,
			label: 'ctx_lh_S_collat_transv_ant'
		},
		11152: {
			color: [10, 200, 200],
			opacity: 1,
			label: 'ctx_lh_S_collat_transv_post'
		},
		11153: {
			color: [221, 220, 20],
			opacity: 1,
			label: 'ctx_lh_S_front_inf'
		},
		11154: {
			color: [141, 20, 100],
			opacity: 1,
			label: 'ctx_lh_S_front_middle'
		},
		11155: {
			color: [61, 220, 100],
			opacity: 1,
			label: 'ctx_lh_S_front_sup'
		},
		11156: {
			color: [141, 60, 20],
			opacity: 1,
			label: 'ctx_lh_S_interm_prim-Jensen'
		},
		11157: {
			color: [143, 20, 220],
			opacity: 1,
			label: 'ctx_lh_S_intrapariet_and_P_trans'
		},
		11158: {
			color: [101, 60, 220],
			opacity: 1,
			label: 'ctx_lh_S_oc_middle_and_Lunatus'
		},
		11159: {
			color: [21, 20, 140],
			opacity: 1,
			label: 'ctx_lh_S_oc_sup_and_transversal'
		},
		11160: {
			color: [61, 20, 180],
			opacity: 1,
			label: 'ctx_lh_S_occipital_ant'
		},
		11161: {
			color: [221, 140, 20],
			opacity: 1,
			label: 'ctx_lh_S_oc-temp_lat'
		},
		11162: {
			color: [141, 100, 220],
			opacity: 1,
			label: 'ctx_lh_S_oc-temp_med_and_Lingual'
		},
		11163: {
			color: [221, 100, 20],
			opacity: 1,
			label: 'ctx_lh_S_orbital_lateral'
		},
		11164: {
			color: [181, 200, 20],
			opacity: 1,
			label: 'ctx_lh_S_orbital_med-olfact'
		},
		11165: {
			color: [101, 20, 20],
			opacity: 1,
			label: 'ctx_lh_S_orbital-H_Shaped'
		},
		11166: {
			color: [101, 100, 180],
			opacity: 1,
			label: 'ctx_lh_S_parieto_occipital'
		},
		11167: {
			color: [181, 220, 20],
			opacity: 1,
			label: 'ctx_lh_S_pericallosal'
		},
		11168: {
			color: [21, 140, 200],
			opacity: 1,
			label: 'ctx_lh_S_postcentral'
		},
		11169: {
			color: [21, 20, 240],
			opacity: 1,
			label: 'ctx_lh_S_precentral-inf-part'
		},
		11170: {
			color: [21, 20, 200],
			opacity: 1,
			label: 'ctx_lh_S_precentral-sup-part'
		},
		11171: {
			color: [21, 20, 60],
			opacity: 1,
			label: 'ctx_lh_S_suborbital'
		},
		11172: {
			color: [101, 60, 60],
			opacity: 1,
			label: 'ctx_lh_S_subparietal'
		},
		11173: {
			color: [21, 180, 180],
			opacity: 1,
			label: 'ctx_lh_S_temporal_inf'
		},
		11174: {
			color: [223, 220, 60],
			opacity: 1,
			label: 'ctx_lh_S_temporal_sup'
		},
		11175: {
			color: [221, 60, 60],
			opacity: 1,
			label: 'ctx_lh_S_temporal_transverse'
		},
		12100: {
			color: [0, 0, 0],
			opacity: 1,
			label: 'ctx_rh_Unknown'
		},
		12101: {
			color: [23, 220, 60],
			opacity: 1,
			label: 'ctx_rh_G_and_S_frontomargin'
		},
		12102: {
			color: [23, 60, 180],
			opacity: 1,
			label: 'ctx_rh_G_and_S_occipital_inf'
		},
		12103: {
			color: [63, 100, 60],
			opacity: 1,
			label: 'ctx_rh_G_and_S_paracentral'
		},
		12104: {
			color: [63, 20, 220],
			opacity: 1,
			label: 'ctx_rh_G_and_S_subcentral'
		},
		12105: {
			color: [13, 0, 250],
			opacity: 1,
			label: 'ctx_rh_G_and_S_transv_frontopol'
		},
		12106: {
			color: [26, 60, 0],
			opacity: 1,
			label: 'ctx_rh_G_and_S_cingul-Ant'
		},
		12107: {
			color: [26, 60, 75],
			opacity: 1,
			label: 'ctx_rh_G_and_S_cingul-Mid-Ant'
		},
		12108: {
			color: [26, 60, 150],
			opacity: 1,
			label: 'ctx_rh_G_and_S_cingul-Mid-Post'
		},
		12109: {
			color: [25, 60, 250],
			opacity: 1,
			label: 'ctx_rh_G_cingul-Post-dorsal'
		},
		12110: {
			color: [60, 25, 25],
			opacity: 1,
			label: 'ctx_rh_G_cingul-Post-ventral'
		},
		12111: {
			color: [180, 20, 20],
			opacity: 1,
			label: 'ctx_rh_G_cuneus'
		},
		12112: {
			color: [220, 20, 100],
			opacity: 1,
			label: 'ctx_rh_G_front_inf-Opercular'
		},
		12113: {
			color: [140, 60, 60],
			opacity: 1,
			label: 'ctx_rh_G_front_inf-Orbital'
		},
		12114: {
			color: [180, 220, 140],
			opacity: 1,
			label: 'ctx_rh_G_front_inf-Triangul'
		},
		12115: {
			color: [140, 100, 180],
			opacity: 1,
			label: 'ctx_rh_G_front_middle'
		},
		12116: {
			color: [180, 20, 140],
			opacity: 1,
			label: 'ctx_rh_G_front_sup'
		},
		12117: {
			color: [23, 10, 10],
			opacity: 1,
			label: 'ctx_rh_G_Ins_lg_and_S_cent_ins'
		},
		12118: {
			color: [225, 140, 140],
			opacity: 1,
			label: 'ctx_rh_G_insular_short'
		},
		12119: {
			color: [180, 60, 180],
			opacity: 1,
			label: 'ctx_rh_G_occipital_middle'
		},
		12120: {
			color: [20, 220, 60],
			opacity: 1,
			label: 'ctx_rh_G_occipital_sup'
		},
		12121: {
			color: [60, 20, 140],
			opacity: 1,
			label: 'ctx_rh_G_oc-temp_lat-fusifor'
		},
		12122: {
			color: [220, 180, 140],
			opacity: 1,
			label: 'ctx_rh_G_oc-temp_med-Lingual'
		},
		12123: {
			color: [65, 100, 20],
			opacity: 1,
			label: 'ctx_rh_G_oc-temp_med-Parahip'
		},
		12124: {
			color: [220, 60, 20],
			opacity: 1,
			label: 'ctx_rh_G_orbital'
		},
		12125: {
			color: [20, 60, 220],
			opacity: 1,
			label: 'ctx_rh_G_pariet_inf-Angular'
		},
		12126: {
			color: [100, 100, 60],
			opacity: 1,
			label: 'ctx_rh_G_pariet_inf-Supramar'
		},
		12127: {
			color: [220, 180, 220],
			opacity: 1,
			label: 'ctx_rh_G_parietal_sup'
		},
		12128: {
			color: [20, 180, 140],
			opacity: 1,
			label: 'ctx_rh_G_postcentral'
		},
		12129: {
			color: [60, 140, 180],
			opacity: 1,
			label: 'ctx_rh_G_precentral'
		},
		12130: {
			color: [25, 20, 140],
			opacity: 1,
			label: 'ctx_rh_G_precuneus'
		},
		12131: {
			color: [20, 60, 100],
			opacity: 1,
			label: 'ctx_rh_G_rectus'
		},
		12132: {
			color: [60, 220, 20],
			opacity: 1,
			label: 'ctx_rh_G_subcallosal'
		},
		12133: {
			color: [60, 60, 220],
			opacity: 1,
			label: 'ctx_rh_G_temp_sup-G_T_transv'
		},
		12134: {
			color: [220, 60, 220],
			opacity: 1,
			label: 'ctx_rh_G_temp_sup-Lateral'
		},
		12135: {
			color: [65, 220, 60],
			opacity: 1,
			label: 'ctx_rh_G_temp_sup-Plan_polar'
		},
		12136: {
			color: [25, 140, 20],
			opacity: 1,
			label: 'ctx_rh_G_temp_sup-Plan_tempo'
		},
		12137: {
			color: [220, 220, 100],
			opacity: 1,
			label: 'ctx_rh_G_temporal_inf'
		},
		12138: {
			color: [180, 60, 60],
			opacity: 1,
			label: 'ctx_rh_G_temporal_middle'
		},
		12139: {
			color: [61, 20, 220],
			opacity: 1,
			label: 'ctx_rh_Lat_Fis-ant-Horizont'
		},
		12140: {
			color: [61, 20, 60],
			opacity: 1,
			label: 'ctx_rh_Lat_Fis-ant-Vertical'
		},
		12141: {
			color: [61, 60, 100],
			opacity: 1,
			label: 'ctx_rh_Lat_Fis-post'
		},
		12142: {
			color: [25, 25, 25],
			opacity: 1,
			label: 'ctx_rh_Medial_wall'
		},
		12143: {
			color: [140, 20, 60],
			opacity: 1,
			label: 'ctx_rh_Pole_occipital'
		},
		12144: {
			color: [220, 180, 20],
			opacity: 1,
			label: 'ctx_rh_Pole_temporal'
		},
		12145: {
			color: [63, 180, 180],
			opacity: 1,
			label: 'ctx_rh_S_calcarine'
		},
		12146: {
			color: [221, 20, 10],
			opacity: 1,
			label: 'ctx_rh_S_central'
		},
		12147: {
			color: [221, 20, 100],
			opacity: 1,
			label: 'ctx_rh_S_cingul-Marginalis'
		},
		12148: {
			color: [221, 60, 140],
			opacity: 1,
			label: 'ctx_rh_S_circular_insula_ant'
		},
		12149: {
			color: [221, 20, 220],
			opacity: 1,
			label: 'ctx_rh_S_circular_insula_inf'
		},
		12150: {
			color: [61, 220, 220],
			opacity: 1,
			label: 'ctx_rh_S_circular_insula_sup'
		},
		12151: {
			color: [100, 200, 200],
			opacity: 1,
			label: 'ctx_rh_S_collat_transv_ant'
		},
		12152: {
			color: [10, 200, 200],
			opacity: 1,
			label: 'ctx_rh_S_collat_transv_post'
		},
		12153: {
			color: [221, 220, 20],
			opacity: 1,
			label: 'ctx_rh_S_front_inf'
		},
		12154: {
			color: [141, 20, 100],
			opacity: 1,
			label: 'ctx_rh_S_front_middle'
		},
		12155: {
			color: [61, 220, 100],
			opacity: 1,
			label: 'ctx_rh_S_front_sup'
		},
		12156: {
			color: [141, 60, 20],
			opacity: 1,
			label: 'ctx_rh_S_interm_prim-Jensen'
		},
		12157: {
			color: [143, 20, 220],
			opacity: 1,
			label: 'ctx_rh_S_intrapariet_and_P_trans'
		},
		12158: {
			color: [101, 60, 220],
			opacity: 1,
			label: 'ctx_rh_S_oc_middle_and_Lunatus'
		},
		12159: {
			color: [21, 20, 140],
			opacity: 1,
			label: 'ctx_rh_S_oc_sup_and_transversal'
		},
		12160: {
			color: [61, 20, 180],
			opacity: 1,
			label: 'ctx_rh_S_occipital_ant'
		},
		12161: {
			color: [221, 140, 20],
			opacity: 1,
			label: 'ctx_rh_S_oc-temp_lat'
		},
		12162: {
			color: [141, 100, 220],
			opacity: 1,
			label: 'ctx_rh_S_oc-temp_med_and_Lingual'
		},
		12163: {
			color: [221, 100, 20],
			opacity: 1,
			label: 'ctx_rh_S_orbital_lateral'
		},
		12164: {
			color: [181, 200, 20],
			opacity: 1,
			label: 'ctx_rh_S_orbital_med-olfact'
		},
		12165: {
			color: [101, 20, 20],
			opacity: 1,
			label: 'ctx_rh_S_orbital-H_Shaped'
		},
		12166: {
			color: [101, 100, 180],
			opacity: 1,
			label: 'ctx_rh_S_parieto_occipital'
		},
		12167: {
			color: [181, 220, 20],
			opacity: 1,
			label: 'ctx_rh_S_pericallosal'
		},
		12168: {
			color: [21, 140, 200],
			opacity: 1,
			label: 'ctx_rh_S_postcentral'
		},
		12169: {
			color: [21, 20, 240],
			opacity: 1,
			label: 'ctx_rh_S_precentral-inf-part'
		},
		12170: {
			color: [21, 20, 200],
			opacity: 1,
			label: 'ctx_rh_S_precentral-sup-part'
		},
		12171: {
			color: [21, 20, 60],
			opacity: 1,
			label: 'ctx_rh_S_suborbital'
		},
		12172: {
			color: [101, 60, 60],
			opacity: 1,
			label: 'ctx_rh_S_subparietal'
		},
		12173: {
			color: [21, 180, 180],
			opacity: 1,
			label: 'ctx_rh_S_temporal_inf'
		},
		12174: {
			color: [223, 220, 60],
			opacity: 1,
			label: 'ctx_rh_S_temporal_sup'
		},
		12175: {
			color: [221, 60, 60],
			opacity: 1,
			label: 'ctx_rh_S_temporal_transverse'
		},
		13100: {
			color: [0, 0, 0],
			opacity: 1,
			label: 'wm_lh_Unknown'
		},
		13101: {
			color: [23, 220, 60],
			opacity: 1,
			label: 'wm_lh_G_and_S_frontomargin'
		},
		13102: {
			color: [23, 60, 180],
			opacity: 1,
			label: 'wm_lh_G_and_S_occipital_inf'
		},
		13103: {
			color: [63, 100, 60],
			opacity: 1,
			label: 'wm_lh_G_and_S_paracentral'
		},
		13104: {
			color: [63, 20, 220],
			opacity: 1,
			label: 'wm_lh_G_and_S_subcentral'
		},
		13105: {
			color: [13, 0, 250],
			opacity: 1,
			label: 'wm_lh_G_and_S_transv_frontopol'
		},
		13106: {
			color: [26, 60, 0],
			opacity: 1,
			label: 'wm_lh_G_and_S_cingul-Ant'
		},
		13107: {
			color: [26, 60, 75],
			opacity: 1,
			label: 'wm_lh_G_and_S_cingul-Mid-Ant'
		},
		13108: {
			color: [26, 60, 150],
			opacity: 1,
			label: 'wm_lh_G_and_S_cingul-Mid-Post'
		},
		13109: {
			color: [25, 60, 250],
			opacity: 1,
			label: 'wm_lh_G_cingul-Post-dorsal'
		},
		13110: {
			color: [60, 25, 25],
			opacity: 1,
			label: 'wm_lh_G_cingul-Post-ventral'
		},
		13111: {
			color: [180, 20, 20],
			opacity: 1,
			label: 'wm_lh_G_cuneus'
		},
		13112: {
			color: [220, 20, 100],
			opacity: 1,
			label: 'wm_lh_G_front_inf-Opercular'
		},
		13113: {
			color: [140, 60, 60],
			opacity: 1,
			label: 'wm_lh_G_front_inf-Orbital'
		},
		13114: {
			color: [180, 220, 140],
			opacity: 1,
			label: 'wm_lh_G_front_inf-Triangul'
		},
		13115: {
			color: [140, 100, 180],
			opacity: 1,
			label: 'wm_lh_G_front_middle'
		},
		13116: {
			color: [180, 20, 140],
			opacity: 1,
			label: 'wm_lh_G_front_sup'
		},
		13117: {
			color: [23, 10, 10],
			opacity: 1,
			label: 'wm_lh_G_Ins_lg_and_S_cent_ins'
		},
		13118: {
			color: [225, 140, 140],
			opacity: 1,
			label: 'wm_lh_G_insular_short'
		},
		13119: {
			color: [180, 60, 180],
			opacity: 1,
			label: 'wm_lh_G_occipital_middle'
		},
		13120: {
			color: [20, 220, 60],
			opacity: 1,
			label: 'wm_lh_G_occipital_sup'
		},
		13121: {
			color: [60, 20, 140],
			opacity: 1,
			label: 'wm_lh_G_oc-temp_lat-fusifor'
		},
		13122: {
			color: [220, 180, 140],
			opacity: 1,
			label: 'wm_lh_G_oc-temp_med-Lingual'
		},
		13123: {
			color: [65, 100, 20],
			opacity: 1,
			label: 'wm_lh_G_oc-temp_med-Parahip'
		},
		13124: {
			color: [220, 60, 20],
			opacity: 1,
			label: 'wm_lh_G_orbital'
		},
		13125: {
			color: [20, 60, 220],
			opacity: 1,
			label: 'wm_lh_G_pariet_inf-Angular'
		},
		13126: {
			color: [100, 100, 60],
			opacity: 1,
			label: 'wm_lh_G_pariet_inf-Supramar'
		},
		13127: {
			color: [220, 180, 220],
			opacity: 1,
			label: 'wm_lh_G_parietal_sup'
		},
		13128: {
			color: [20, 180, 140],
			opacity: 1,
			label: 'wm_lh_G_postcentral'
		},
		13129: {
			color: [60, 140, 180],
			opacity: 1,
			label: 'wm_lh_G_precentral'
		},
		13130: {
			color: [25, 20, 140],
			opacity: 1,
			label: 'wm_lh_G_precuneus'
		},
		13131: {
			color: [20, 60, 100],
			opacity: 1,
			label: 'wm_lh_G_rectus'
		},
		13132: {
			color: [60, 220, 20],
			opacity: 1,
			label: 'wm_lh_G_subcallosal'
		},
		13133: {
			color: [60, 60, 220],
			opacity: 1,
			label: 'wm_lh_G_temp_sup-G_T_transv'
		},
		13134: {
			color: [220, 60, 220],
			opacity: 1,
			label: 'wm_lh_G_temp_sup-Lateral'
		},
		13135: {
			color: [65, 220, 60],
			opacity: 1,
			label: 'wm_lh_G_temp_sup-Plan_polar'
		},
		13136: {
			color: [25, 140, 20],
			opacity: 1,
			label: 'wm_lh_G_temp_sup-Plan_tempo'
		},
		13137: {
			color: [220, 220, 100],
			opacity: 1,
			label: 'wm_lh_G_temporal_inf'
		},
		13138: {
			color: [180, 60, 60],
			opacity: 1,
			label: 'wm_lh_G_temporal_middle'
		},
		13139: {
			color: [61, 20, 220],
			opacity: 1,
			label: 'wm_lh_Lat_Fis-ant-Horizont'
		},
		13140: {
			color: [61, 20, 60],
			opacity: 1,
			label: 'wm_lh_Lat_Fis-ant-Vertical'
		},
		13141: {
			color: [61, 60, 100],
			opacity: 1,
			label: 'wm_lh_Lat_Fis-post'
		},
		13142: {
			color: [25, 25, 25],
			opacity: 1,
			label: 'wm_lh_Medial_wall'
		},
		13143: {
			color: [140, 20, 60],
			opacity: 1,
			label: 'wm_lh_Pole_occipital'
		},
		13144: {
			color: [220, 180, 20],
			opacity: 1,
			label: 'wm_lh_Pole_temporal'
		},
		13145: {
			color: [63, 180, 180],
			opacity: 1,
			label: 'wm_lh_S_calcarine'
		},
		13146: {
			color: [221, 20, 10],
			opacity: 1,
			label: 'wm_lh_S_central'
		},
		13147: {
			color: [221, 20, 100],
			opacity: 1,
			label: 'wm_lh_S_cingul-Marginalis'
		},
		13148: {
			color: [221, 60, 140],
			opacity: 1,
			label: 'wm_lh_S_circular_insula_ant'
		},
		13149: {
			color: [221, 20, 220],
			opacity: 1,
			label: 'wm_lh_S_circular_insula_inf'
		},
		13150: {
			color: [61, 220, 220],
			opacity: 1,
			label: 'wm_lh_S_circular_insula_sup'
		},
		13151: {
			color: [100, 200, 200],
			opacity: 1,
			label: 'wm_lh_S_collat_transv_ant'
		},
		13152: {
			color: [10, 200, 200],
			opacity: 1,
			label: 'wm_lh_S_collat_transv_post'
		},
		13153: {
			color: [221, 220, 20],
			opacity: 1,
			label: 'wm_lh_S_front_inf'
		},
		13154: {
			color: [141, 20, 100],
			opacity: 1,
			label: 'wm_lh_S_front_middle'
		},
		13155: {
			color: [61, 220, 100],
			opacity: 1,
			label: 'wm_lh_S_front_sup'
		},
		13156: {
			color: [141, 60, 20],
			opacity: 1,
			label: 'wm_lh_S_interm_prim-Jensen'
		},
		13157: {
			color: [143, 20, 220],
			opacity: 1,
			label: 'wm_lh_S_intrapariet_and_P_trans'
		},
		13158: {
			color: [101, 60, 220],
			opacity: 1,
			label: 'wm_lh_S_oc_middle_and_Lunatus'
		},
		13159: {
			color: [21, 20, 140],
			opacity: 1,
			label: 'wm_lh_S_oc_sup_and_transversal'
		},
		13160: {
			color: [61, 20, 180],
			opacity: 1,
			label: 'wm_lh_S_occipital_ant'
		},
		13161: {
			color: [221, 140, 20],
			opacity: 1,
			label: 'wm_lh_S_oc-temp_lat'
		},
		13162: {
			color: [141, 100, 220],
			opacity: 1,
			label: 'wm_lh_S_oc-temp_med_and_Lingual'
		},
		13163: {
			color: [221, 100, 20],
			opacity: 1,
			label: 'wm_lh_S_orbital_lateral'
		},
		13164: {
			color: [181, 200, 20],
			opacity: 1,
			label: 'wm_lh_S_orbital_med-olfact'
		},
		13165: {
			color: [101, 20, 20],
			opacity: 1,
			label: 'wm_lh_S_orbital-H_Shaped'
		},
		13166: {
			color: [101, 100, 180],
			opacity: 1,
			label: 'wm_lh_S_parieto_occipital'
		},
		13167: {
			color: [181, 220, 20],
			opacity: 1,
			label: 'wm_lh_S_pericallosal'
		},
		13168: {
			color: [21, 140, 200],
			opacity: 1,
			label: 'wm_lh_S_postcentral'
		},
		13169: {
			color: [21, 20, 240],
			opacity: 1,
			label: 'wm_lh_S_precentral-inf-part'
		},
		13170: {
			color: [21, 20, 200],
			opacity: 1,
			label: 'wm_lh_S_precentral-sup-part'
		},
		13171: {
			color: [21, 20, 60],
			opacity: 1,
			label: 'wm_lh_S_suborbital'
		},
		13172: {
			color: [101, 60, 60],
			opacity: 1,
			label: 'wm_lh_S_subparietal'
		},
		13173: {
			color: [21, 180, 180],
			opacity: 1,
			label: 'wm_lh_S_temporal_inf'
		},
		13174: {
			color: [223, 220, 60],
			opacity: 1,
			label: 'wm_lh_S_temporal_sup'
		},
		13175: {
			color: [221, 60, 60],
			opacity: 1,
			label: 'wm_lh_S_temporal_transverse'
		},
		14100: {
			color: [0, 0, 0],
			opacity: 1,
			label: 'wm_rh_Unknown'
		},
		14101: {
			color: [23, 220, 60],
			opacity: 1,
			label: 'wm_rh_G_and_S_frontomargin'
		},
		14102: {
			color: [23, 60, 180],
			opacity: 1,
			label: 'wm_rh_G_and_S_occipital_inf'
		},
		14103: {
			color: [63, 100, 60],
			opacity: 1,
			label: 'wm_rh_G_and_S_paracentral'
		},
		14104: {
			color: [63, 20, 220],
			opacity: 1,
			label: 'wm_rh_G_and_S_subcentral'
		},
		14105: {
			color: [13, 0, 250],
			opacity: 1,
			label: 'wm_rh_G_and_S_transv_frontopol'
		},
		14106: {
			color: [26, 60, 0],
			opacity: 1,
			label: 'wm_rh_G_and_S_cingul-Ant'
		},
		14107: {
			color: [26, 60, 75],
			opacity: 1,
			label: 'wm_rh_G_and_S_cingul-Mid-Ant'
		},
		14108: {
			color: [26, 60, 150],
			opacity: 1,
			label: 'wm_rh_G_and_S_cingul-Mid-Post'
		},
		14109: {
			color: [25, 60, 250],
			opacity: 1,
			label: 'wm_rh_G_cingul-Post-dorsal'
		},
		14110: {
			color: [60, 25, 25],
			opacity: 1,
			label: 'wm_rh_G_cingul-Post-ventral'
		},
		14111: {
			color: [180, 20, 20],
			opacity: 1,
			label: 'wm_rh_G_cuneus'
		},
		14112: {
			color: [220, 20, 100],
			opacity: 1,
			label: 'wm_rh_G_front_inf-Opercular'
		},
		14113: {
			color: [140, 60, 60],
			opacity: 1,
			label: 'wm_rh_G_front_inf-Orbital'
		},
		14114: {
			color: [180, 220, 140],
			opacity: 1,
			label: 'wm_rh_G_front_inf-Triangul'
		},
		14115: {
			color: [140, 100, 180],
			opacity: 1,
			label: 'wm_rh_G_front_middle'
		},
		14116: {
			color: [180, 20, 140],
			opacity: 1,
			label: 'wm_rh_G_front_sup'
		},
		14117: {
			color: [23, 10, 10],
			opacity: 1,
			label: 'wm_rh_G_Ins_lg_and_S_cent_ins'
		},
		14118: {
			color: [225, 140, 140],
			opacity: 1,
			label: 'wm_rh_G_insular_short'
		},
		14119: {
			color: [180, 60, 180],
			opacity: 1,
			label: 'wm_rh_G_occipital_middle'
		},
		14120: {
			color: [20, 220, 60],
			opacity: 1,
			label: 'wm_rh_G_occipital_sup'
		},
		14121: {
			color: [60, 20, 140],
			opacity: 1,
			label: 'wm_rh_G_oc-temp_lat-fusifor'
		},
		14122: {
			color: [220, 180, 140],
			opacity: 1,
			label: 'wm_rh_G_oc-temp_med-Lingual'
		},
		14123: {
			color: [65, 100, 20],
			opacity: 1,
			label: 'wm_rh_G_oc-temp_med-Parahip'
		},
		14124: {
			color: [220, 60, 20],
			opacity: 1,
			label: 'wm_rh_G_orbital'
		},
		14125: {
			color: [20, 60, 220],
			opacity: 1,
			label: 'wm_rh_G_pariet_inf-Angular'
		},
		14126: {
			color: [100, 100, 60],
			opacity: 1,
			label: 'wm_rh_G_pariet_inf-Supramar'
		},
		14127: {
			color: [220, 180, 220],
			opacity: 1,
			label: 'wm_rh_G_parietal_sup'
		},
		14128: {
			color: [20, 180, 140],
			opacity: 1,
			label: 'wm_rh_G_postcentral'
		},
		14129: {
			color: [60, 140, 180],
			opacity: 1,
			label: 'wm_rh_G_precentral'
		},
		14130: {
			color: [25, 20, 140],
			opacity: 1,
			label: 'wm_rh_G_precuneus'
		},
		14131: {
			color: [20, 60, 100],
			opacity: 1,
			label: 'wm_rh_G_rectus'
		},
		14132: {
			color: [60, 220, 20],
			opacity: 1,
			label: 'wm_rh_G_subcallosal'
		},
		14133: {
			color: [60, 60, 220],
			opacity: 1,
			label: 'wm_rh_G_temp_sup-G_T_transv'
		},
		14134: {
			color: [220, 60, 220],
			opacity: 1,
			label: 'wm_rh_G_temp_sup-Lateral'
		},
		14135: {
			color: [65, 220, 60],
			opacity: 1,
			label: 'wm_rh_G_temp_sup-Plan_polar'
		},
		14136: {
			color: [25, 140, 20],
			opacity: 1,
			label: 'wm_rh_G_temp_sup-Plan_tempo'
		},
		14137: {
			color: [220, 220, 100],
			opacity: 1,
			label: 'wm_rh_G_temporal_inf'
		},
		14138: {
			color: [180, 60, 60],
			opacity: 1,
			label: 'wm_rh_G_temporal_middle'
		},
		14139: {
			color: [61, 20, 220],
			opacity: 1,
			label: 'wm_rh_Lat_Fis-ant-Horizont'
		},
		14140: {
			color: [61, 20, 60],
			opacity: 1,
			label: 'wm_rh_Lat_Fis-ant-Vertical'
		},
		14141: {
			color: [61, 60, 100],
			opacity: 1,
			label: 'wm_rh_Lat_Fis-post'
		},
		14142: {
			color: [25, 25, 25],
			opacity: 1,
			label: 'wm_rh_Medial_wall'
		},
		14143: {
			color: [140, 20, 60],
			opacity: 1,
			label: 'wm_rh_Pole_occipital'
		},
		14144: {
			color: [220, 180, 20],
			opacity: 1,
			label: 'wm_rh_Pole_temporal'
		},
		14145: {
			color: [63, 180, 180],
			opacity: 1,
			label: 'wm_rh_S_calcarine'
		},
		14146: {
			color: [221, 20, 10],
			opacity: 1,
			label: 'wm_rh_S_central'
		},
		14147: {
			color: [221, 20, 100],
			opacity: 1,
			label: 'wm_rh_S_cingul-Marginalis'
		},
		14148: {
			color: [221, 60, 140],
			opacity: 1,
			label: 'wm_rh_S_circular_insula_ant'
		},
		14149: {
			color: [221, 20, 220],
			opacity: 1,
			label: 'wm_rh_S_circular_insula_inf'
		},
		14150: {
			color: [61, 220, 220],
			opacity: 1,
			label: 'wm_rh_S_circular_insula_sup'
		},
		14151: {
			color: [100, 200, 200],
			opacity: 1,
			label: 'wm_rh_S_collat_transv_ant'
		},
		14152: {
			color: [10, 200, 200],
			opacity: 1,
			label: 'wm_rh_S_collat_transv_post'
		},
		14153: {
			color: [221, 220, 20],
			opacity: 1,
			label: 'wm_rh_S_front_inf'
		},
		14154: {
			color: [141, 20, 100],
			opacity: 1,
			label: 'wm_rh_S_front_middle'
		},
		14155: {
			color: [61, 220, 100],
			opacity: 1,
			label: 'wm_rh_S_front_sup'
		},
		14156: {
			color: [141, 60, 20],
			opacity: 1,
			label: 'wm_rh_S_interm_prim-Jensen'
		},
		14157: {
			color: [143, 20, 220],
			opacity: 1,
			label: 'wm_rh_S_intrapariet_and_P_trans'
		},
		14158: {
			color: [101, 60, 220],
			opacity: 1,
			label: 'wm_rh_S_oc_middle_and_Lunatus'
		},
		14159: {
			color: [21, 20, 140],
			opacity: 1,
			label: 'wm_rh_S_oc_sup_and_transversal'
		},
		14160: {
			color: [61, 20, 180],
			opacity: 1,
			label: 'wm_rh_S_occipital_ant'
		},
		14161: {
			color: [221, 140, 20],
			opacity: 1,
			label: 'wm_rh_S_oc-temp_lat'
		},
		14162: {
			color: [141, 100, 220],
			opacity: 1,
			label: 'wm_rh_S_oc-temp_med_and_Lingual'
		},
		14163: {
			color: [221, 100, 20],
			opacity: 1,
			label: 'wm_rh_S_orbital_lateral'
		},
		14164: {
			color: [181, 200, 20],
			opacity: 1,
			label: 'wm_rh_S_orbital_med-olfact'
		},
		14165: {
			color: [101, 20, 20],
			opacity: 1,
			label: 'wm_rh_S_orbital-H_Shaped'
		},
		14166: {
			color: [101, 100, 180],
			opacity: 1,
			label: 'wm_rh_S_parieto_occipital'
		},
		14167: {
			color: [181, 220, 20],
			opacity: 1,
			label: 'wm_rh_S_pericallosal'
		},
		14168: {
			color: [21, 140, 200],
			opacity: 1,
			label: 'wm_rh_S_postcentral'
		},
		14169: {
			color: [21, 20, 240],
			opacity: 1,
			label: 'wm_rh_S_precentral-inf-part'
		},
		14170: {
			color: [21, 20, 200],
			opacity: 1,
			label: 'wm_rh_S_precentral-sup-part'
		},
		14171: {
			color: [21, 20, 60],
			opacity: 1,
			label: 'wm_rh_S_suborbital'
		},
		14172: {
			color: [101, 60, 60],
			opacity: 1,
			label: 'wm_rh_S_subparietal'
		},
		14173: {
			color: [21, 180, 180],
			opacity: 1,
			label: 'wm_rh_S_temporal_inf'
		},
		14174: {
			color: [223, 220, 60],
			opacity: 1,
			label: 'wm_rh_S_temporal_sup'
		},
		14175: {
			color: [221, 60, 60],
			opacity: 1,
			label: 'wm_rh_S_temporal_transverse'
		}
	};

	/**
	 * @module presets/segmentation
	 */
	class PresetsSegmentation {
		constructor(presetID = 'Freesurfer') {
			this._presetID = presetID;
			this._presets = this.presetSegs();
		}

		set preset(targetPreset) {
			this._presetID = targetPreset;
		}

		get preset() {
			return this.fetchPreset(this._presetID);
		}

		fetchPreset(presetID) {
			let presets = this._presets;
			return presets[presetID];
		}

		addPreset(presetObj) {
			this._presets.push(presetObj);
		}

		presetsAvailable(type = 'segmentation') {
			let available = [];
			let presets = this._presets;

			for (let i in presets) {
				available.push(i);
			}

			return available;
		}

		presetSegs() {
			return {
				Freesurfer: segmentationFs
			};
		}

	}

	/**
	 * @module shaders/data
	 */

	class ShadersUniform {
		static uniforms() {
			return {
				uTextureBackTest0: {
					type: 't',
					value: [],
					typeGLSL: 'sampler2D'
				},
				uTextureBackTest1: {
					type: 't',
					value: [],
					typeGLSL: 'sampler2D'
				},
				uOpacity0: {
					type: 'f',
					value: 1.0,
					typeGLSL: 'float'
				},
				uOpacity1: {
					type: 'f',
					value: 1.0,
					typeGLSL: 'float'
				},
				uType0: {
					type: 'i',
					value: 0,
					typeGLSL: 'int'
				},
				uType1: {
					type: 'i',
					value: 1,
					typeGLSL: 'int'
				},
				uTrackMouse: {
					type: 'i',
					value: 0,
					typeGLSL: 'int'
				},
				uMouse: {
					type: 'v2',
					value: new three.Vector2(),
					typeGLSL: 'vec2'
				}
			};
		}

	}

	class ShadersFragment {
		// pass uniforms object
		constructor(uniforms) {
			this._uniforms = uniforms;
			this._functions = {};
			this._main = '';
		}

		functions() {
			if (this._main === '') {
				// if main is empty, functions can not have been computed
				this.main();
			}

			let content = '';

			for (let property in this._functions) {
				content += this._functions[property] + '\n';
			}

			return content;
		}

		uniforms() {
			let content = '';

			for (let property in this._uniforms) {
				let uniform = this._uniforms[property];
				content += `uniform ${uniform.typeGLSL} ${property}`;

				if (uniform && uniform.length) {
					content += `[${uniform.length}]`;
				}

				content += ';\n';
			}

			return content;
		}

		main() {
			// need to pre-call main to fill up the functions list
			this._main = `
void main(void) {

	vec2 texc = vec2(((vProjectedCoords.x / vProjectedCoords.w) + 1.0 ) / 2.0,
								((vProjectedCoords.y / vProjectedCoords.w) + 1.0 ) / 2.0 );

	// just silence warning for
	// vec4 dummy = vPos;

	//The back position is the world space position stored in the texture.
	vec4 baseColor0 = texture2D(uTextureBackTest0, texc);
	vec4 baseColor1 = texture2D(uTextureBackTest1, texc);

	if( uTrackMouse == 1 ){

			if( vProjectedCoords.x < uMouse.x ){

				gl_FragColor = baseColor0;

			}
			else{

				gl_FragColor = mix( baseColor0, baseColor1, uOpacity1 );

			}

	}
	else{

		if( uType1 == 0 ){

			//merge an image into
			gl_FragColor = mix( baseColor0, baseColor1, uOpacity1 );

		}
		else{

			float opacity = baseColor1.a;
			gl_FragColor = mix( baseColor0, baseColor1, opacity * uOpacity1 );

		}

	}

	return;
}
	 `;
		}

		compute() {
			// shaderInterpolation.functions(args)

			return `
// uniforms
${this.uniforms()}

// varying (should fetch it from vertex directly)
// varying vec4			vPos;
varying vec4			vProjectedCoords;

// tailored functions
${this.functions()}

// main loop
${this._main}
			`;
		}

	}

	class ShadersVertex {
		compute() {
			return `
// varying vec4 vPos;
varying vec4 vProjectedCoords;

//
// main
//
void main() {

	vec4 vPos = modelMatrix * vec4(position, 1.0 );
	vProjectedCoords =	projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
	gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0 );

}
				`;
		}

	}

	/**
	 * @module CSS Code for all Widgets
	 */
	class WidgetsCss {
		static get code() {
			return `
				.widgets-handle {
						position: absolute;
						border: 1px solid;
						border-radius: 50%;
						width: 10px;
						height: 10px;
						margin: -6px; /* border + width / 2 */
						z-index: 3;
				}
				.widgets-line {
						position: absolute;
						width: 1px;
						height: 1px;
						margin-top: -0.5px; /* height / 2 */
				}
				.widgets-dashline {
						position: absolute;
						border-top: 1px dashed;
						margin-top: -0.5px; /* border / 2 */
				}
				.widgets-line:before,
				.widgets-dashline:before { /* for dragging */
						content: " ";
						position: absolute;
						height: 12px;
						left: 0;
						right: 0;
						margin-top: -6px;
				}
				.widgets-rectangle {
						position: absolute;
						border: 1px solid;
						margin: -1px; /* border */
				}
				.widgets-rectangle-helper {
						position: absolute;
						border: 1px dashed;
						margin: -1px; /* border */
				}
				.widgets-ellipse {
						position: absolute;
						border: 1px solid;
						border-radius: 50%;
						margin: -1px; /* border */
						z-index: 2;
				}
				.widgets-label {
						position: absolute;
						border: 1px solid;
						background-color: rgba(0, 0, 0, 0.7);
						color: rgb(255, 255, 255);
						padding: 4px;
						z-index: 3;
				}
				`;
		}

	}

	/* interface WidgetParameter {
		calibrationFactor: number;
		frameIndex: number;
		hideMesh: boolean;
		hideHandleMesh: boolean;
		ijk2LPS: Matrix4;
		lps2IJK: Matrix4;
		pixelSpacing: number;
		stack: {};
		ultrasoundRegions: Array<USRegion & { unitsX: string; unitsY: string }>;
		worldPosition: Vector3;
	} */

	/* interface USRegion {
		x0: number;
		x1: number;
		y0: number;
		y1: number;
		axisX: number;
		axisY: number;
		deltaX: number;
		deltaY: number;
	} */

	/**
	 * @module Abstract Widget
	 */

	class widgetsBase extends three.Object3D {
		/**
		 * 
		 * @param {Mesh} targetMesh 
		 * @param {OrbitControl} controls 
		 * @param {WidgetParameter} params 
		 */
		constructor(targetMesh, controls, params) {
			super();
			this._widgetType = 'Base';
			this._params = params;

			if (params.hideMesh === true) {
				this.visible = false;
			}

			const elementStyle = document.getElementById('ami-widgets');

			if (elementStyle === null) {
				const styleEl = document.createElement('style');
				styleEl.id = 'ami-widgets';
				styleEl.innerHTML = WidgetsCss.code;
				document.head.appendChild(styleEl);
			}

			this._enabled = true;
			this._selected = false;
			this._hovered = true;
			this._active = true;
			this._colors = {
				default: COLORS.blue,
				active: COLORS.yellow,
				hover: COLORS.red,
				select: COLORS.green,
				text: COLORS.white,
				error: COLORS.lightRed
			};
			this._color = this._colors.default;
			this._dragged = false; // can not call it visible because it conflicts with THREE.Object3D

			this._displayed = true;
			this._targetMesh = targetMesh;
			this._controls = controls;
			this._camera = controls.object;
			this._container = controls.domElement;
			this._worldPosition = new three.Vector3(); // LPS position

			if (params.worldPosition) {
				this._worldPosition.copy(params.worldPosition);
			} else if (this._targetMesh !== null) {
				this._worldPosition.copy(this._targetMesh.position);
			}
		}

		initOffsets() {
			const box = this._container.getBoundingClientRect();

			const body = document.body;
			const docEl = document.documentElement;
			const scrollTop = scrollY || docEl.scrollTop || body.scrollTop;
			const scrollLeft = scrollX || docEl.scrollLeft || body.scrollLeft;
			const clientTop = docEl.clientTop || body.clientTop || 0;
			const clientLeft = docEl.clientLeft || body.clientLeft || 0;
			this._offsets = {
				top: Math.round(box.top + scrollTop - clientTop),
				left: Math.round(box.left + scrollLeft - clientLeft)
			};
		}
		/**
		 * 
		 * @param {MouseEvent} event 
		 * @param {HTMLDivElement} container 
		 * @returns 
		 */


		getMouseOffsets(event, container) {
			return {
				x: (event.clientX - this._offsets.left) / container.offsetWidth * 2 - 1,
				y: -((event.clientY - this._offsets.top) / container.offsetHeight) * 2 + 1,
				screenX: event.clientX - this._offsets.left,
				screenY: event.clientY - this._offsets.top
			};
		}
		/**
		 * Get area of polygon.
		 *
		 * @param {Array<Vector3>} points Ordered vertices' coordinates
		 *
		 * @returns {Number}
		 */


		getArea(points) {
			let area = 0;
			let j = points.length - 1; // the last vertex is the 'previous' one to the first

			for (let i = 0; i < points.length; i++) {
				area += (points[j].x + points[i].x) * (points[j].y - points[i].y);
				j = i; // j is the previous vertex to i
			}

			return Math.abs(area / 2);
		}
		/**
		 * Get index of ultrasound region by data coordinates.
		 *
		 * @param {Array<USRegion>}	 regions US regions
		 * @param {Vector3} point	 Data coordinates
		 *
		 * @returns {Number|null}
		 */


		getRegionByXY(regions, point) {
			let result = null;
			regions.some((region, ind) => {
				if (point.x >= region.x0 && point.x <= region.x1 && point.y >= region.y0 && point.y <= region.y1) {
					result = ind;
					return true;
				}
			});
			return result;
		}
		/**
		 * Get point inside ultrasound region by data coordinates.
		 *
		 * @param {USRegion}	region US region data
		 * @param {Vector3} point	Data coordinates
		 *
		 * @returns {Vector2|null}
		 */


		getPointInRegion(region, point) {
			if (!region) {
				return null;
			}

			return new three.Vector2((point.x - region.x0 - (region.axisX || 0)) * region.deltaX, (point.y - region.y0 - (region.axisY || 0)) * region.deltaY);
		}
		/**
		 * Get point's ultrasound coordinates by data coordinates.
		 *
		 * @param {Array<USRegion>}	 regions US regions
		 * @param {Vector3} point	 Data coordinates
		 *
		 * @returns {Vector2|null}
		 */


		getUsPoint(regions, point) {
			return this.getPointInRegion(regions[this.getRegionByXY(regions, point)], point);
		}
		/**
		 * Get distance between points inside ultrasound region.
		 *
		 * @param {Vector3} pointA Begin data coordinates
		 * @param {Vector3} pointB End data coordinates
		 *
		 * @returns {Number|null}
		 */


		getUsDistance(pointA, pointB) {
			const regions = this._params.ultrasoundRegions || [];

			if (regions.length < 1) {
				return null;
			}

			const regionA = this.getRegionByXY(regions, pointA);
			const regionB = this.getRegionByXY(regions, pointB);

			if (regionA === null || regionB === null || regionA !== regionB || regions[regionA].unitsX !== 'cm' || regions[regionA].unitsY !== 'cm') {
				return null;
			}

			return this.getPointInRegion(regions[regionA], pointA).distanceTo(this.getPointInRegion(regions[regionA], pointB));
		}
		/**
		 * Get distance between points
		 *
		 * @param {Vector3} pointA Begin world coordinates
		 * @param {Vector3} pointB End world coordinates
		 * @param {number}	cf		 Calibration factor
		 *
		 * @returns {Object}
		 */


		getDistanceData(pointA, pointB, calibrationFactor) {
			let distance = null;
			let units = null;

			if (calibrationFactor) {
				distance = pointA.distanceTo(pointB) * calibrationFactor;
			} else if (this._params.ultrasoundRegions && this._params.lps2IJK) {
				const usDistance = this.getUsDistance(CoreUtils.worldToData(this._params.lps2IJK, pointA), CoreUtils.worldToData(this._params.lps2IJK, pointB));

				if (usDistance !== null) {
					distance = usDistance * 10;
					units = 'mm';
				} else {
					distance = pointA.distanceTo(pointB);
					units = this._params.pixelSpacing ? 'mm' : 'units';
				}
			} else {
				distance = pointA.distanceTo(pointB);
			}

			return {
				distance,
				units
			};
		}
		/**
		 * 
		 * @param {Vector3} pointA 
		 * @param {Vector3} pointB 
		 * @returns {object}
		 */


		getLineData(pointA, pointB) {
			const line = pointB.clone().sub(pointA);
			const center = pointB.clone().add(pointA).multiplyScalar(0.5);
			const length = line.length();
			const angle = line.angleTo(new three.Vector3(1, 0, 0));
			return {
				line,
				length,
				transformX: center.x - length / 2,
				transformY: center.y - this._container.offsetHeight,
				transformAngle: pointA.y < pointB.y ? angle : -angle,
				center
			};
		}
		/**
		 * 
		 * @param {Vector3} pointA 
		 * @param {Vector3} pointB 
		 * @returns {object}
		 */


		getRectData(pointA, pointB) {
			const line = pointB.clone().sub(pointA);
			const vertical = line.clone().projectOnVector(new three.Vector3(0, 1, 0));
			const min = pointA.clone().min(pointB); // coordinates of the top left corner

			return {
				width: line.clone().projectOnVector(new three.Vector3(1, 0, 0)).length(),
				height: vertical.length(),
				transformX: min.x,
				transformY: min.y - this._container.offsetHeight,
				paddingVector: vertical.clone().normalize()
			};
		}
		/**
		 * @param {HTMLElement} label
		 * @param {Vector3}		 point	label's center coordinates (default)
		 * @param {boolean}		 corner if true, then point is the label's top left corner coordinates
		 */


		adjustLabelTransform(label, point, corner) {
			let x = Math.round(point.x - (corner ? 0 : label.offsetWidth / 2));

			let y = Math.round(point.y - (corner ? 0 : label.offsetHeight / 2)) - this._container.offsetHeight;

			if (x < 0) {
				x = x > -label.offsetWidth ? 0 : x + label.offsetWidth;
			} else if (x > this._container.offsetWidth - label.offsetWidth) {
				x = x < this._container.offsetWidth ? this._container.offsetWidth - label.offsetWidth : x - label.offsetWidth;
			}

			if (y < -this._container.offsetHeight) {
				y = y > -this._container.offsetHeight - label.offsetHeight ? -this._container.offsetHeight : y + label.offsetHeight;
			} else if (y > -label.offsetHeight) {
				y = y < 0 ? -label.offsetHeight : y - label.offsetHeight;
			}

			return new three.Vector2(x, y);
		}
		/**
		 * 
		 * @param {Vector3} worldCoordinate 
		 * @returns 
		 */


		worldToScreen(worldCoordinate) {
			const screenCoordinates = worldCoordinate.clone();
			screenCoordinates.project(this._camera);
			screenCoordinates.x = Math.round((screenCoordinates.x + 1) * this._container.offsetWidth / 2);
			screenCoordinates.y = Math.round((-screenCoordinates.y + 1) * this._container.offsetHeight / 2);
			screenCoordinates.z = 0;
			return screenCoordinates;
		}

		update() {
			// to be overloaded
			console.log('update() should be overloaded!');
		}

		updateColor() {
			if (this._active) {
				this._color = this._colors.active;
			} else if (this._hovered) {
				this._color = this._colors.hover;
			} else if (this._selected) {
				this._color = this._colors.select;
			} else {
				this._color = this._colors.default;
			}
		}
		/**
		 * 
		 * @param {any} color 
		 */


		setDefaultColor(color) {
			this._colors.default = color;

			if (this._handles) {
				this._handles.forEach(elem => elem._colors.default = color);
			}

			this.update();
		}

		show() {
			this.showDOM();
			this.showMesh();
			this.update();
			this._displayed = true;
		}

		hide() {
			this.hideDOM();
			this.hideMesh();
			this._displayed = false;
		}

		hideDOM() {
			// to be overloaded
			console.log('hideDOM() should be overloaded!');
		}

		showDOM() {
			// to be overloaded
			console.log('showDOM() should be overloaded!');
		}

		hideMesh() {
			this.visible = false;
		}

		showMesh() {
			if (this._params.hideMesh === true) {
				return;
			}

			this.visible = true;
		}

		free() {
			this._camera = null;
			this._container = null;
			this._controls = null;
			this._params = null;
			this._targetMesh = null;
		}

		get widgetType() {
			return this._widgetType;
		}
		/**
		 * @type {Mesh}
		 */


		get targetMesh() {
			return this._targetMesh;
		}

		set targetMesh(targetMesh) {
			this._targetMesh = targetMesh;
			this.update();
		}
		/**
		 * @type {Vector3}
		 */


		get worldPosition() {
			return this._worldPosition;
		}

		set worldPosition(worldPosition) {
			this._worldPosition.copy(worldPosition);

			this.update();
		}
		/**
		 * @type {boolean}
		 */


		get enabled() {
			return this._enabled;
		}

		set enabled(enabled) {
			this._enabled = enabled;
			this.update();
		}
		/**
		 * @type {boolean}
		 */


		get selected() {
			return this._selected;
		}

		set selected(selected) {
			this._selected = selected;
			this.update();
		}
		/**
		 * @type {boolean}
		 */


		get hovered() {
			return this._hovered;
		}

		set hovered(hovered) {
			this._hovered = hovered;
			this.update();
		}
		/**
		 * @type {boolean}
		 */


		get dragged() {
			return this._dragged;
		}

		set dragged(dragged) {
			this._dragged = dragged;
			this.update();
		}
		/**
		 * @type {boolean}
		 */


		get displayed() {
			return this._displayed;
		}

		set displayed(displayed) {
			this._displayed = displayed;
			this.update();
		}
		/**
		 * @type {boolean}
		 */


		get active() {
			return this._active;
		}

		set active(active) {
			this._active = active;
			this.update();
		}
		/**
		 * @type {any}
		 */


		get color() {
			return this._color;
		}

		set color(color) {
			this._color = color;
			this.update();
		}

	}

	/**
	 * @module widgets/handle
	 */

	class widgetsHandle extends widgetsBase {
		constructor(targetMesh, controls, params = {}) {
			super(targetMesh, controls, params);
			this._widgetType = 'Handle'; // incoming parameters (optional: worldPosition)

			if (params.hideHandleMesh === true) {
				this.visible = false;
			} // if no target mesh, use plane for FREE dragging.


			this._plane = {
				position: new three.Vector3(),
				direction: new three.Vector3()
			};
			this._offset = new three.Vector3();
			this._raycaster = new three.Raycaster();
			this._active = false;
			this._hovered = false;
			this._tracking = false;
			this._mouse = new three.Vector2();
			this._initialized = false; // mesh stuff

			this._material = null;
			this._geometry = null;
			this._mesh = null;
			this._meshHovered = false; // dom stuff

			this._dom = null;
			this._domHovered = false;
			this._screenPosition = this.worldToScreen(this._worldPosition);
			this.create();
			this.initOffsets(); // event listeners

			this.onResize = this.onResize.bind(this);
			this.onMove = this.onMove.bind(this);
			this.onHover = this.onHover.bind(this);
			this.addEventListeners();
		}

		addEventListeners() {
			addEventListener('resize', this.onResize);

			this._dom.addEventListener('mouseenter', this.onHover);

			this._dom.addEventListener('mouseleave', this.onHover);

			this._container.addEventListener('wheel', this.onMove);
		}

		removeEventListeners() {
			removeEventListener('resize', this.onResize);

			this._dom.removeEventListener('mouseenter', this.onHover);

			this._dom.removeEventListener('mouseleave', this.onHover);

			this._container.removeEventListener('wheel', this.onMove);
		}

		onResize() {
			this.initOffsets();
		}

		onHover(evt) {
			if (evt) {
				this.hoverDom(evt);
			}

			this.hoverMesh();
			this._hovered = this._meshHovered || this._domHovered;
			this._container.style.cursor = this._hovered ? 'pointer' : 'default';
		}

		hoverMesh() {
			// check raycast intersection, do we want to hover on mesh or just css?
			let intersectsHandle = this._raycaster.intersectObject(this._mesh);

			this._meshHovered = intersectsHandle.length > 0;
		}

		hoverDom(evt) {
			this._domHovered = evt.type === 'mouseenter';
		}

		onStart(evt) {
			const offsets = this.getMouseOffsets(evt, this._container);

			this._mouse.set(offsets.x, offsets.y); // update raycaster


			this._raycaster.setFromCamera(this._mouse, this._camera);

			this._raycaster.ray.position = this._raycaster.ray.origin;

			if (this._hovered) {
				this._active = true;
				this._controls.enabled = false;

				if (this._targetMesh) {
					let intersectsTarget = this._raycaster.intersectObject(this._targetMesh);

					if (intersectsTarget.length > 0) {
						this._offset.copy(intersectsTarget[0].point).sub(this._worldPosition);
					}
				} else {
					this._plane.position.copy(this._worldPosition);

					this._plane.direction.copy(this._camera.getWorldDirection());

					let intersection = Intersections.rayPlane(this._raycaster.ray, this._plane);

					if (intersection !== null) {
						this._offset.copy(intersection).sub(this._plane.position);
					}
				}

				this.update();
			}
		}
		/**
		 * @param {Object} evt - Browser event
		 * @param {Boolean} forced - true to move inactive handles
		 */


		onMove(evt, forced) {
			const offsets = this.getMouseOffsets(evt, this._container);

			this._mouse.set(offsets.x, offsets.y); // update raycaster
			// set ray.position to satisfy CoreIntersections::rayPlane API


			this._raycaster.setFromCamera(this._mouse, this._camera);

			this._raycaster.ray.position = this._raycaster.ray.origin;

			if (this._active || forced) {
				this._dragged = true;

				if (this._targetMesh !== null) {
					let intersectsTarget = this._raycaster.intersectObject(this._targetMesh);

					if (intersectsTarget.length > 0) {
						this._worldPosition.copy(intersectsTarget[0].point.sub(this._offset));
					}
				} else {
					if (this._plane.direction.length() === 0) {
						// free mode!this._targetMesh
						this._plane.position.copy(this._worldPosition);

						this._plane.direction.copy(this._camera.getWorldDirection());
					}

					let intersection = Intersections.rayPlane(this._raycaster.ray, this._plane);

					if (intersection !== null) {
						this._worldPosition.copy(intersection.sub(this._offset));
					}
				}
			} else {
				this.onHover(null);
			}

			this.update();
		}

		onEnd() {
			if (this._tracking === true) {
				// stay active and keep controls disabled
				return;
			}

			if (!this._dragged && this._active && this._initialized) {
				this._selected = !this._selected; // change state if there was no dragging
			}

			this._initialized = true;
			this._active = false;
			this._dragged = false;
			this._controls.enabled = true;
			this.update();
		}

		create() {
			this.createMesh();
			this.createDOM();
		}

		createMesh() {
			// geometry
			this._geometry = new three.SphereGeometry(1, 16, 16); // material

			this._material = new three.MeshBasicMaterial({
				wireframe: true,
				wireframeLinewidth: 2
			});
			this.updateMeshColor(); // mesh

			this._mesh = new three.Mesh(this._geometry, this._material);

			this._mesh.position.copy(this._worldPosition);

			this._mesh.visible = true;
			this.add(this._mesh);
		}

		createDOM() {
			this._dom = document.createElement('div');
			this._dom.className = 'widgets-handle';
			this._dom.style.transform = `translate3D(
			${this._screenPosition.x}px,
			${this._screenPosition.y - this._container.offsetHeight}px, 0)`;
			this.updateDOMColor();

			this._container.appendChild(this._dom);
		}

		update() {
			// general update
			this.updateColor(); // update screen position of handle

			this._screenPosition = this.worldToScreen(this._worldPosition); // mesh stuff

			this.updateMeshColor();
			this.updateMeshPosition(); // DOM stuff

			this.updateDOMColor();
			this.updateDOMPosition();
		}

		updateMeshColor() {
			if (this._material) {
				this._material.color.set(this._color);
			}
		}

		updateMeshPosition() {
			if (this._mesh) {
				this._mesh.position.copy(this._worldPosition);
			}
		}

		updateDOMPosition() {
			if (this._dom) {
				this._dom.style.transform = `translate3D(${this._screenPosition.x}px,
				${this._screenPosition.y - this._container.offsetHeight}px, 0)`;
			}
		}

		updateDOMColor() {
			this._dom.style.borderColor = this._color;
		}

		showMesh() {
			if (this._params.hideMesh === true || this._params.hideHandleMesh === true) {
				return;
			}

			this.visible = true;
		}

		free() {
			// events
			this.removeEventListeners(); // dom

			this._container.removeChild(this._dom); // mesh, geometry, material


			this.remove(this._mesh);

			this._mesh.geometry.dispose();

			this._mesh.geometry = null;

			this._mesh.material.dispose();

			this._mesh.material = null;
			this._mesh = null;

			this._geometry.dispose();

			this._geometry = null;
			this._material.vertexShader = null;
			this._material.fragmentShader = null;
			this._material.uniforms = null;

			this._material.dispose();

			this._material = null;
			super.free();
		}

		hideDOM() {
			this._dom.style.display = 'none';
		}

		showDOM() {
			this._dom.style.display = '';
		}

		get screenPosition() {
			return this._screenPosition;
		}

		set screenPosition(screenPosition) {
			this._screenPosition = screenPosition;
		}

		get active() {
			return this._active;
		}

		set active(active) {
			this._active = active; // this._tracking = this._active;

			this._controls.enabled = !this._active;
			this.update();
		}

		get tracking() {
			return this._tracking;
		}

		set tracking(tracking) {
			this._tracking = tracking;
			this.update();
		}

	}

	/**
	 * @module widgets/angle
	 */

	class widgetsAngle extends widgetsBase {
		constructor(targetMesh, controls, params = {}) {
			super(targetMesh, controls, params);
			this._widgetType = 'Angle'; // incoming parameters (optional: worldPosition)
			// outgoing values

			this._opangle = null;
			this._moving = false;
			this._domHovered = false;
			this._defaultAngle = true; // mesh stuff

			this._material = null;
			this._geometry = null;
			this._mesh = null; // dom stuff

			this._line = null;
			this._line2 = null;
			this._label = null; // add handles

			this._handles = [];
			let handle;
			const WidgetsHandle = widgetsHandle();

			for (let i = 0; i < 3; i++) {
				handle = new WidgetsHandle(targetMesh, controls, params);
				this.add(handle);

				this._handles.push(handle);
			}

			this._handles[1].active = true;
			this._handles[1].tracking = true;
			this._handles[2].active = true;
			this._handles[2].tracking = true;
			this._moveHandle = new WidgetsHandle(targetMesh, controls, params);
			this.add(this._moveHandle);

			this._handles.push(this._moveHandle);

			this._moveHandle.hide();

			this.create();
			this.onMove = this.onMove.bind(this);
			this.onHover = this.onHover.bind(this);
			this.addEventListeners();
		}

		addEventListeners() {
			this._container.addEventListener('wheel', this.onMove);

			this._line.addEventListener('mouseenter', this.onHover);

			this._line.addEventListener('mouseleave', this.onHover);

			this._line2.addEventListener('mouseenter', this.onHover);

			this._line2.addEventListener('mouseleave', this.onHover);

			this._label.addEventListener('mouseenter', this.onHover);

			this._label.addEventListener('mouseleave', this.onHover);
		}

		removeEventListeners() {
			this._container.removeEventListener('wheel', this.onMove);

			this._line.removeEventListener('mouseenter', this.onHover);

			this._line.removeEventListener('mouseleave', this.onHover);

			this._line2.removeEventListener('mouseenter', this.onHover);

			this._line2.removeEventListener('mouseleave', this.onHover);

			this._label.removeEventListener('mouseenter', this.onHover);

			this._label.removeEventListener('mouseleave', this.onHover);
		}

		onHover(evt) {
			if (evt) {
				this.hoverDom(evt);
			}

			this.hoverMesh();
			this._hovered = this._handles[0].hovered || this._handles[1].hovered || this._handles[2].hovered || this._domHovered;
			this._container.style.cursor = this._hovered ? 'pointer' : 'default';
		}

		hoverMesh() {// check raycast intersection, do we want to hover on mesh or just css?
		}

		hoverDom(evt) {
			this._domHovered = evt.type === 'mouseenter';
		}

		onStart(evt) {
			this._moveHandle.onMove(evt, true);

			this._handles[0].onStart(evt);

			this._handles[1].onStart(evt);

			this._handles[2].onStart(evt);

			this._active = this._handles[0].active || this._handles[1].active || this._handles[2].active || this._domHovered;

			if (this._domHovered && !this._handles[1].tracking && !this._handles[2].tracking) {
				this._moving = true;
				this._controls.enabled = false;
			}

			this.update();
		}

		onMove(evt) {
			if (this._active) {
				const prevPosition = this._moveHandle.worldPosition.clone();

				this._dragged = true;

				this._moveHandle.onMove(evt, true);

				if (this._moving) {
					this._handles.slice(0, -1).forEach(handle => {
						handle.worldPosition.add(this._moveHandle.worldPosition.clone().sub(prevPosition));
					});
				}
			} else {
				this.onHover(null);
			}

			this._handles[0].onMove(evt);

			this._handles[1].onMove(evt);

			this._handles[2].onMove(evt);

			this.update();
		}

		onEnd() {
			this._handles[0].onEnd(); // First Handle


			if (this._handles[1].tracking && this._handles[0].screenPosition.distanceTo(this._handles[1].screenPosition) < 10 || !this._handles[1].tracking && this._handles[2].tracking && this._handles[1].screenPosition.distanceTo(this._handles[2].screenPosition) < 10) {
				return;
			}

			if (!this._dragged && this._active && !this._handles[2].tracking) {
				this._selected = !this._selected; // change state if there was no dragging

				this._handles[0].selected = this._selected;
			} // Third Handle


			if (this._handles[1].active) {
				this._handles[2].onEnd();
			} else if (this._dragged || !this._handles[2].tracking) {
				this._handles[2].tracking = false;

				this._handles[2].onEnd();
			} else {
				this._handles[2].tracking = false;
			}

			this._handles[2].selected = this._selected; // Second Handle

			if (this._dragged || !this._handles[1].tracking) {
				this._handles[1].tracking = false;

				this._handles[1].onEnd();
			} else {
				this._handles[1].tracking = false;
			}

			this._handles[1].selected = this._selected;
			this._active = this._handles[0].active || this._handles[1].active || this._handles[2].active;
			this._dragged = this._handles[2].tracking;
			this._moving = false;
			this.update();
		}

		create() {
			this.createMesh();
			this.createDOM();
		}

		createMesh() {
			// geometry
			// this._geometry = new three.Geometry();
			// this._geometry.vertices = [
			//	 this._handles[0].worldPosition,
			//	 this._handles[1].worldPosition,
			//	 this._handles[1].worldPosition,
			//	 this._handles[2].worldPosition,
			// ];
			this._geometry = new three.BufferGeometry();
			const positions = new Float32Array(4 * 3);

			this._geometry.setAttribute('position', new three.BufferAttribute(positions, 3));

			let index = 0;
			positions[index++] = this._handles[0].worldPosition.x;
			positions[index++] = this._handles[0].worldPosition.y;
			positions[index++] = this._handles[0].worldPosition.z;
			positions[index++] = this._handles[1].worldPosition.x;
			positions[index++] = this._handles[1].worldPosition.y;
			positions[index++] = this._handles[1].worldPosition.z;
			positions[index++] = this._handles[1].worldPosition.x;
			positions[index++] = this._handles[1].worldPosition.y;
			positions[index++] = this._handles[1].worldPosition.z;
			positions[index++] = this._handles[2].worldPosition.x;
			positions[index++] = this._handles[2].worldPosition.y;
			positions[index++] = this._handles[2].worldPosition.z; // material

			this._material = new three.LineBasicMaterial();
			this.updateMeshColor(); // mesh

			this._mesh = new three.LineSegments(this._geometry, this._material);
			this._mesh.visible = true;
			this.add(this._mesh);
		}

		createDOM() {
			this._line = document.createElement('div');
			this._line.className = 'widgets-line';

			this._container.appendChild(this._line);

			this._line2 = document.createElement('div');
			this._line2.className = 'widgets-line';

			this._container.appendChild(this._line2);

			this._label = document.createElement('div');
			this._label.className = 'widgets-label';

			this._container.appendChild(this._label);

			this.updateDOMColor();
		}

		hideDOM() {
			this._line.style.display = 'none';
			this._line2.style.display = 'none';
			this._label.style.display = 'none';

			this._handles.forEach(elem => elem.hideDOM());
		}

		showDOM() {
			this._line.style.display = '';
			this._line2.style.display = '';
			this._label.style.display = '';

			this._handles[0].showDOM();

			this._handles[1].showDOM();

			this._handles[2].showDOM();
		}

		update() {
			this.updateColor();

			this._handles[0].update();

			this._handles[1].update();

			this._handles[2].update(); // calculate values


			this._opangle = this._handles[1].worldPosition.clone().sub(this._handles[0].worldPosition).angleTo(this._handles[1].worldPosition.clone().sub(this._handles[2].worldPosition)) * 180 / Math.PI || 0.0;
			this._opangle = this._defaultAngle ? this._opangle : 360 - this._opangle;
			this.updateMeshColor();
			this.updateMeshPosition();
			this.updateDOM();
		}

		updateMeshColor() {
			if (this._material) {
				this._material.color.set(this._color);
			}
		}

		updateMeshPosition() {
			if (this._geometry) {
				this._geometry.verticesNeedUpdate = true;
			}
		}

		updateDOM() {
			this.updateDOMColor(); // update first line

			const lineData = this.getLineData(this._handles[1].screenPosition, this._handles[0].screenPosition);
			this._line.style.transform = `translate3D(${lineData.transformX}px, ${lineData.transformY}px, 0)
						rotate(${lineData.transformAngle}rad)`;
			this._line.style.width = lineData.length + 'px'; // update second line

			const line2Data = this.getLineData(this._handles[1].screenPosition, this._handles[2].screenPosition);
			this._line2.style.transform = `translate3D(${line2Data.transformX}px, ${line2Data.transformY}px, 0)
						rotate(${line2Data.transformAngle}rad)`;
			this._line2.style.width = line2Data.length + 'px'; // update angle and label

			this._label.innerHTML = `${this._opangle.toFixed(2)}&deg;`;
			let paddingNormVector = lineData.line.clone().add(line2Data.line).normalize().negate();
			let normAngle = paddingNormVector.angleTo(new three.Vector3(1, 0, 0));

			if (normAngle > Math.PI / 2) {
				normAngle = Math.PI - normAngle;
			}

			const labelPadding = Math.tan(normAngle) < this._label.offsetHeight / this._label.offsetWidth ? this._label.offsetWidth / 2 / Math.cos(normAngle) + 15 // 15px padding
			: this._label.offsetHeight / 2 / Math.cos(Math.PI / 2 - normAngle) + 15;

			const paddingPoint = this._handles[1].screenPosition.clone().add(paddingNormVector.multiplyScalar(labelPadding));

			const transform = this.adjustLabelTransform(this._label, paddingPoint);
			this._label.style.transform = `translate3D(${transform.x}px, ${transform.y}px, 0)`;
		}

		updateDOMColor() {
			this._line.style.backgroundColor = this._color;
			this._line2.style.backgroundColor = this._color;
			this._label.style.borderColor = this._color;
		}

		free() {
			this.removeEventListeners();

			this._handles.forEach(h => {
				this.remove(h);
				h.free();
			});

			this._handles = [];

			this._container.removeChild(this._line);

			this._container.removeChild(this._line2);

			this._container.removeChild(this._label); // mesh, geometry, material


			this.remove(this._mesh);

			this._mesh.geometry.dispose();

			this._mesh.geometry = null;

			this._mesh.material.dispose();

			this._mesh.material = null;
			this._mesh = null;

			this._geometry.dispose();

			this._geometry = null;
			this._material.vertexShader = null;
			this._material.fragmentShader = null;
			this._material.uniforms = null;

			this._material.dispose();

			this._material = null;
			super.free();
		}

		toggleDefaultAngle() {
			this._defaultAngle = !this._defaultAngle;
		}

		get targetMesh() {
			return this._targetMesh;
		}

		set targetMesh(targetMesh) {
			this._targetMesh = targetMesh;

			this._handles.forEach(elem => elem.targetMesh = targetMesh);

			this.update();
		}

		get worldPosition() {
			return this._worldPosition;
		}

		set worldPosition(worldPosition) {
			this._handles[0].worldPosition.copy(worldPosition);

			this._handles[1].worldPosition.copy(worldPosition);

			this._handles[2].worldPosition.copy(worldPosition);

			this._worldPosition.copy(worldPosition);

			this.update();
		}

		get angle() {
			return this._opangle;
		}

	}

	/**
	 * @module widgets/annotation
	 * @todo: add option to show only label (without mesh, dots and lines)
	 */

	class widgetsAnnotation extends widgetsBase {
		constructor(targetMesh, controls, params = {}) {
			super(targetMesh, controls, params);
			this._widgetType = 'Annotation'; // incoming parameters (optional: worldPosition)

			this._initialized = false; // set to true when the name of the label is entered

			this._movinglabel = null; // bool that turns true when the label is moving with the mouse

			this._labelmoved = false; // bool that turns true once the label is moved by the user (at least once)

			this._labelhovered = false;
			this._manuallabeldisplay = false; // Make true to force the label to be displayed
			// mesh stuff

			this._material = null;
			this._geometry = null;
			this._meshline = null;
			this._cone = null; // dom stuff

			this._line = null;
			this._dashline = null;
			this._label = null;
			this._labeltext = null; // var

			this._labelOffset = new three.Vector3(); // difference between label center and second handle

			this._mouseLabelOffset = new three.Vector3(); // difference between mouse coordinates and label center
			// add handles

			this._handles = [];
			let handle;
			const WidgetsHandle = widgetsHandle();

			for (let i = 0; i < 2; i++) {
				handle = new WidgetsHandle(targetMesh, controls, params);
				this.add(handle);

				this._handles.push(handle);
			}

			this._handles[1].active = true;
			this.create();
			this.initOffsets();
			this.onResize = this.onResize.bind(this);
			this.onMove = this.onMove.bind(this);
			this.onHoverlabel = this.onHoverlabel.bind(this);
			this.notonHoverlabel = this.notonHoverlabel.bind(this);
			this.changelabeltext = this.changelabeltext.bind(this);
			this.addEventListeners();
		}

		addEventListeners() {
			addEventListener('resize', this.onResize);

			this._label.addEventListener('mouseenter', this.onHoverlabel);

			this._label.addEventListener('mouseleave', this.notonHoverlabel);

			this._label.addEventListener('dblclick', this.changelabeltext);

			this._container.addEventListener('wheel', this.onMove);
		}

		removeEventListeners() {
			removeEventListener('resize', this.onResize);

			this._label.removeEventListener('mouseenter', this.onHoverlabel);

			this._label.removeEventListener('mouseleave', this.notonHoverlabel);

			this._label.removeEventListener('dblclick', this.changelabeltext);

			this._container.removeEventListener('wheel', this.onMove);
		}

		onResize() {
			this.initOffsets();
		}

		onHoverlabel() {
			// this function is called when mouse enters the label with "mouseenter" event
			this._labelhovered = true;
			this._container.style.cursor = 'pointer';
		}

		notonHoverlabel() {
			// this function is called when mouse leaves the label with "mouseleave" event
			this._labelhovered = false;
			this._container.style.cursor = 'default';
		}

		onStart(evt) {
			if (this._labelhovered) {
				// if label hovered then it should be moved
				// save mouse coordinates offset from label center
				const offsets = this.getMouseOffsets(evt, this._container);

				const paddingPoint = this._handles[1].screenPosition.clone().sub(this._labelOffset);

				this._mouseLabelOffset = new three.Vector3(offsets.screenX - paddingPoint.x, offsets.screenY - paddingPoint.y, 0);
				this._movinglabel = true;
				this._labelmoved = true;
			}

			this._handles[0].onStart(evt);

			this._handles[1].onStart(evt);

			this._active = this._handles[0].active || this._handles[1].active || this._labelhovered;
			this.update();
		}

		onMove(evt) {
			if (this._movinglabel) {
				const offsets = this.getMouseOffsets(evt, this._container);
				this._labelOffset = new three.Vector3(this._handles[1].screenPosition.x - offsets.screenX + this._mouseLabelOffset.x, this._handles[1].screenPosition.y - offsets.screenY + this._mouseLabelOffset.y, 0);
				this._controls.enabled = false;
			}

			if (this._active) {
				this._dragged = true;
			}

			this._handles[0].onMove(evt);

			this._handles[1].onMove(evt);

			this._hovered = this._handles[0].hovered || this._handles[1].hovered || this._labelhovered;
			this.update();
		}

		onEnd() {
			this._handles[0].onEnd(); // First Handle
			// Second Handle


			if (this._dragged || !this._handles[1].tracking) {
				this._handles[1].tracking = false;

				this._handles[1].onEnd();
			} else {
				this._handles[1].tracking = false;
			}

			if (!this._dragged && this._active && this._initialized) {
				this._selected = !this._selected; // change state if there was no dragging

				this._handles[0].selected = this._selected;
				this._handles[1].selected = this._selected;
			}

			if (!this._initialized) {
				this._labelOffset = this._handles[1].screenPosition.clone().sub(this._handles[0].screenPosition).multiplyScalar(0.5);
				this.setlabeltext();
				this._initialized = true;
			}

			this._active = this._handles[0].active || this._handles[1].active;
			this._dragged = false;
			this._movinglabel = false;
			this.update();
		}

		setlabeltext() {
			// called when the user creates a new arrow
			while (!this._labeltext) {
				this._labeltext = prompt('Please enter the annotation text', '');
			}

			this.displaylabel();
		}

		changelabeltext() {
			// called when the user does double click in the label
			this._labeltext = prompt('Please enter a new annotation text', this._label.innerHTML);
			this.displaylabel();
		}

		displaylabel() {
			this._label.innerHTML = typeof this._labeltext === 'string' && this._labeltext.length > 0 // avoid error
			? this._labeltext : ''; // empty string is passed or Cancel is pressed
			// show the label (in css an empty string is used to revert display=none)

			this._label.style.display = '';
			this._dashline.style.display = '';
			this._label.style.transform = `translate3D(
				${this._handles[1].screenPosition.x - this._labelOffset.x - this._label.offsetWidth / 2}px,
				${this._handles[1].screenPosition.y - this._labelOffset.y - this._label.offsetHeight / 2 - this._container.offsetHeight}px, 0)`;
		}

		create() {
			this.createMesh();
			this.createDOM();
		}

		createMesh() {
			// material
			this._material = new three.LineBasicMaterial();
			this.updateMeshColor(); // line geometry
			// this._geometry = new three.Geometry();
			// this._geometry.vertices.push(this._handles[0].worldPosition);
			// this._geometry.vertices.push(this._handles[1].worldPosition);

			this._geometry = new three.BufferGeometry();
			const positions = new Float32Array(2 * 3);

			this._geometry.setAttribute('position', new three.BufferAttribute(positions, 3));

			let index = 0;
			positions[index++] = this._handles[0].worldPosition.x;
			positions[index++] = this._handles[0].worldPosition.y;
			positions[index++] = this._handles[0].worldPosition.z;
			positions[index++] = this._handles[1].worldPosition.x;
			positions[index++] = this._handles[1].worldPosition.y;
			positions[index++] = this._handles[1].worldPosition.z; // line mesh

			this._meshline = new three.Line(this._geometry, this._material);
			this._meshline.visible = true;
			this.add(this._meshline); // cone geometry

			this._conegeometry = new three.CylinderGeometry(0, 2, 10);

			this._conegeometry.translate(0, -5, 0);

			this._conegeometry.rotateX(-Math.PI / 2); // cone mesh


			this._cone = new three.Mesh(this._conegeometry, this._material);
			this._cone.visible = true;
			this.add(this._cone);
		}

		createDOM() {
			this._line = document.createElement('div');
			this._line.className = 'widgets-line';

			this._container.appendChild(this._line);

			this._dashline = document.createElement('div');
			this._dashline.className = 'widgets-dashline';
			this._dashline.style.display = 'none';

			this._container.appendChild(this._dashline);

			this._label = document.createElement('div');
			this._label.className = 'widgets-label';
			this._label.style.display = 'none';

			this._container.appendChild(this._label);

			this.updateDOMColor();
		}

		update() {
			this.updateColor();

			this._handles[0].update();

			this._handles[1].update();

			this.updateMeshColor();
			this.updateMeshPosition();
			this.updateDOM();
		}

		updateMeshColor() {
			if (this._material) {
				this._material.color.set(this._color);
			}
		}

		updateMeshPosition() {
			if (this._geometry) {
				this._geometry.verticesNeedUpdate = true;
			}

			if (this._cone) {
				this._cone.position.copy(this._handles[1].worldPosition);

				this._cone.lookAt(this._handles[0].worldPosition);
			}
		}

		updateDOM() {
			this.updateDOMColor(); // update line

			const lineData = this.getLineData(this._handles[0].screenPosition, this._handles[1].screenPosition);
			this._line.style.transform = `translate3D(${lineData.transformX}px, ${lineData.transformY}px, 0)
				rotate(${lineData.transformAngle}rad)`;
			this._line.style.width = lineData.length + 'px'; // update label

			const paddingVector = lineData.line.multiplyScalar(0.5);

			const paddingPoint = this._handles[1].screenPosition.clone().sub(this._labelmoved ? this._labelOffset // if the label is moved, then its position is defined by labelOffset
			: paddingVector); // otherwise it's placed in the center of the line


			const labelPosition = this.adjustLabelTransform(this._label, paddingPoint);
			this._label.style.transform = `translate3D(${labelPosition.x}px, ${labelPosition.y}px, 0)`; // create the label without the interaction of the user. Useful when we need to create the label manually

			if (this._manuallabeldisplay) {
				this.displaylabel();
			} // update dash line


			let minLine = this.getLineData(this._handles[0].screenPosition, paddingPoint);
			let lineCL = this.getLineData(lineData.center, paddingPoint);
			let line1L = this.getLineData(this._handles[1].screenPosition, paddingPoint);

			if (minLine.length > lineCL.length) {
				minLine = lineCL;
			}

			if (minLine.length > line1L.length) {
				minLine = line1L;
			}

			this._dashline.style.transform = `translate3D(${minLine.transformX}px, ${minLine.transformY}px, 0)
				rotate(${minLine.transformAngle}rad)`;
			this._dashline.style.width = minLine.length + 'px';
		}

		updateDOMColor() {
			this._line.style.backgroundColor = this._color;
			this._dashline.style.borderTop = '1.5px dashed ' + this._color;
			this._label.style.borderColor = this._color;
		}

		hideDOM() {
			this._line.style.display = 'none';
			this._dashline.style.display = 'none';
			this._label.style.display = 'none';

			this._handles.forEach(elem => elem.hideDOM());
		}

		showDOM() {
			this._line.style.display = '';
			this._dashline.style.display = '';
			this._label.style.display = '';

			this._handles.forEach(elem => elem.showDOM());
		}

		free() {
			this.removeEventListeners();

			this._handles.forEach(h => {
				this.remove(h);
				h.free();
			});

			this._handles = [];

			this._container.removeChild(this._line);

			this._container.removeChild(this._dashline);

			this._container.removeChild(this._label); // mesh, geometry, material


			this.remove(this._meshline);

			this._meshline.geometry.dispose();

			this._meshline.geometry = null;

			this._meshline.material.dispose();

			this._meshline.material = null;
			this._meshline = null;

			this._geometry.dispose();

			this._geometry = null;
			this._material.vertexShader = null;
			this._material.fragmentShader = null;
			this._material.uniforms = null;

			this._material.dispose();

			this._material = null;
			this.remove(this._cone);

			this._cone.geometry.dispose();

			this._cone.geometry = null;

			this._cone.material.dispose();

			this._cone.material = null;
			this._cone = null;

			this._conegeometry.dispose();

			this._conegeometry = null;
			super.free();
		}

		get targetMesh() {
			return this._targetMesh;
		}

		set targetMesh(targetMesh) {
			this._targetMesh = targetMesh;

			this._handles.forEach(elem => elem.targetMesh = targetMesh);

			this.update();
		}

		get worldPosition() {
			return this._worldPosition;
		}

		set worldPosition(worldPosition) {
			this._handles[0].worldPosition.copy(worldPosition);

			this._handles[1].worldPosition.copy(worldPosition);

			this._worldPosition.copy(worldPosition);

			this.update();
		}

	}

	/**
	 * @module widgets/biruler
	 */

	class widgetsBiruler extends widgetsBase {
		constructor(targetMesh, controls, params = {}) {
			super(targetMesh, controls, params);
			this._widgetType = 'BiRuler'; // incoming parameters (optional: lps2IJK, pixelSpacing, ultrasoundRegions, worldPosition)

			this._calibrationFactor = params.calibrationFactor || null; // outgoing values

			this._distance = null;
			this._distance2 = null;
			this._units = !this._calibrationFactor && !params.pixelSpacing ? 'units' : 'mm'; // mesh stuff

			this._material = null;
			this._geometry = null;
			this._mesh = null; // dom stuff

			this._line = null;
			this._label = null;
			this._line2 = null;
			this._label2 = null;
			this._dashline = null; // add handles

			this._handles = [];
			let handle;
			const WidgetsHandle = widgetsHandle();

			for (let i = 0; i < 4; i++) {
				handle = new WidgetsHandle(targetMesh, controls, params);
				this.add(handle);

				this._handles.push(handle);
			}

			this._handles[1].active = true;
			this._handles[1].tracking = true;
			this._handles[3].active = true;
			this._handles[3].tracking = true;
			this.create();
			this.onMove = this.onMove.bind(this);
			this.addEventListeners();
		}

		addEventListeners() {
			this._container.addEventListener('wheel', this.onMove);
		}

		removeEventListeners() {
			this._container.removeEventListener('wheel', this.onMove);
		}

		onStart(evt) {
			this._handles.forEach(elem => elem.onStart(evt));

			this._active = this._handles[0].active || this._handles[1].active || this._handles[2].active || this._handles[3].active;
			this.update();
		}

		onMove(evt) {
			if (this._active) {
				this._dragged = true;
			} else {
				this._hovered = this._handles[0].hovered || this._handles[1].hovered || this._handles[2].hovered || this._handles[3].hovered;
				this._container.style.cursor = this._hovered ? 'pointer' : 'default';
			}

			this._handles.forEach(elem => elem.onMove(evt));

			this.update();
		}

		onEnd() {
			this._handles[0].onEnd();

			this._handles[2].onEnd();

			if (this._handles[1].tracking && this._handles[0].screenPosition.distanceTo(this._handles[1].screenPosition) < 10) {
				return;
			}

			if (!this._dragged && this._active && !this._handles[3].tracking) {
				this._selected = !this._selected; // change state if there was no dragging

				this._handles[0].selected = this._selected;
				this._handles[2].selected = this._selected;
			} // Fourth Handle


			if (this._handles[1].active) {
				this._handles[3].onEnd();
			} else if (this._dragged || !this._handles[3].tracking) {
				this._handles[3].tracking = false;

				this._handles[3].onEnd();
			} else {
				this._handles[3].tracking = false;
			}

			this._handles[3].selected = this._selected; // Second Handle

			if (this._dragged || !this._handles[1].tracking) {
				this._handles[1].tracking = false;

				this._handles[1].onEnd();
			} else {
				this._handles[1].tracking = false;
			}

			this._handles[1].selected = this._selected;
			this._active = this._handles[0].active || this._handles[1].active || this._handles[2].active || this._handles[3].active;
			this._dragged = false;
			this.update();
		}

		create() {
			this.createMesh();
			this.createDOM();
		}

		createMesh() {
			// geometry
			// this._geometry = new three.Geometry();
			// this._geometry.vertices = [
			//	 this._handles[0].worldPosition,
			//	 this._handles[1].worldPosition,
			//	 this._handles[2].worldPosition,
			//	 this._handles[3].worldPosition,
			// ];
			this._geometry = new BufferGeometry();
			const positions = new Float32Array(4 * 3);

			this._geometry.setAttribute('position', new BufferAttribute(positions, 3));

			let index = 0;
			positions[index++] = this._handles[0].worldPosition.x;
			positions[index++] = this._handles[0].worldPosition.y;
			positions[index++] = this._handles[0].worldPosition.z;
			positions[index++] = this._handles[1].worldPosition.x;
			positions[index++] = this._handles[1].worldPosition.y;
			positions[index++] = this._handles[1].worldPosition.z;
			positions[index++] = this._handles[2].worldPosition.x;
			positions[index++] = this._handles[2].worldPosition.y;
			positions[index++] = this._handles[2].worldPosition.z;
			positions[index++] = this._handles[3].worldPosition.x;
			positions[index++] = this._handles[3].worldPosition.y;
			positions[index++] = this._handles[3].worldPosition.z; // material

			this._material = new three.LineBasicMaterial();
			this.updateMeshColor(); // mesh

			this._mesh = new three.LineSegments(this._geometry, this._material);
			this._mesh.visible = true;
			this.add(this._mesh);
		}

		createDOM() {
			this._line = document.createElement('div');
			this._line.className = 'widgets-line';

			this._container.appendChild(this._line);

			this._label = document.createElement('div');
			this._label.className = 'widgets-label';

			this._container.appendChild(this._label);

			this._line2 = document.createElement('div');
			this._line2.className = 'widgets-line';

			this._container.appendChild(this._line2);

			this._label2 = document.createElement('div');
			this._label2.className = 'widgets-label';

			this._container.appendChild(this._label2);

			this._dashline = document.createElement('div');
			this._dashline.className = 'widgets-dashline';

			this._container.appendChild(this._dashline);

			this.updateDOMColor();
		}

		hideDOM() {
			this._line.style.display = 'none';
			this._label.style.display = 'none';
			this._line2.style.display = 'none';
			this._label2.style.display = 'none';
			this._dashline.style.display = 'none';

			this._handles.forEach(elem => elem.hideDOM());
		}

		showDOM() {
			this._line.style.display = '';
			this._label.style.display = '';
			this._line2.style.display = '';
			this._label2.style.display = '';
			this._dashline.style.display = '';

			this._handles.forEach(elem => elem.showDOM());
		}

		update() {
			this.updateColor();

			this._handles.forEach(elem => elem.update());

			this.updateMeshColor();
			this.updateMeshPosition();
			this.updateDOM();
		}

		updateMeshColor() {
			if (this._material) {
				this._material.color.set(this._color);
			}
		}

		updateMeshPosition() {
			if (this._geometry) {
				this._geometry.verticesNeedUpdate = true;
			}
		}

		updateDOM() {
			this.updateDOMColor(); // update first line

			const lineData = this.getLineData(this._handles[0].screenPosition, this._handles[1].screenPosition);
			this._line.style.transform = `translate3D(${lineData.transformX}px, ${lineData.transformY}px, 0)
								rotate(${lineData.transformAngle}rad)`;
			this._line.style.width = lineData.length + 'px'; // update second line

			const line2Data = this.getLineData(this._handles[2].screenPosition, this._handles[3].screenPosition);
			this._line2.style.transform = `translate3D(${line2Data.transformX}px, ${line2Data.transformY}px, 0)
								rotate(${line2Data.transformAngle}rad)`;
			this._line2.style.width = line2Data.length + 'px'; // update dash line

			const line1Center = this._handles[0].worldPosition.clone().add(this._handles[1].worldPosition).multiplyScalar(0.5);

			const line2Center = this._handles[2].worldPosition.clone().add(this._handles[3].worldPosition).multiplyScalar(0.5);

			const dashLineData = this.getLineData(this.worldToScreen(line1Center), this.worldToScreen(line2Center));
			this._dashline.style.transform = `translate3D(${dashLineData.transformX}px, ${dashLineData.transformY}px, 0)
								rotate(${dashLineData.transformAngle}rad)`;
			this._dashline.style.width = dashLineData.length + 'px'; // update labels

			const distanceData = this.getDistanceData(this._handles[0].worldPosition, this._handles[1].worldPosition, this._calibrationFactor);
			const distanceData2 = this.getDistanceData(this._handles[2].worldPosition, this._handles[3].worldPosition, this._calibrationFactor);
			const title = 'Calibration is required to display the distance in mm';
			this._distance = distanceData.distance;
			this._distance2 = distanceData2.distance;

			if (distanceData.units && distanceData2.units && distanceData.units === distanceData2.units) {
				this._units = distanceData.units;
			} else {
				if (!distanceData.units) {
					distanceData.units = this._units;
				}

				if (!distanceData2.units) {
					distanceData2.units = this._units;
				}
			}

			if (distanceData.units === 'units' && !this._label.hasAttribute('title')) {
				this._label.setAttribute('title', title);

				this._label.style.color = this._colors.error;
			} else if (distanceData.units !== 'units' && this._label.hasAttribute('title')) {
				this._label.removeAttribute('title');

				this._label.style.color = this._colors.text;
			}

			if (distanceData2.units === 'units' && !this._label2.hasAttribute('title')) {
				this._label2.setAttribute('title', title);

				this._label2.style.color = this._colors.error;
			} else if (distanceData2.units !== 'units' && this._label2.hasAttribute('title')) {
				this._label2.removeAttribute('title');

				this._label2.style.color = this._colors.text;
			}

			this._label.innerHTML = `${this._distance.toFixed(2)} ${distanceData.units}`;
			this._label2.innerHTML = `${this._distance2.toFixed(2)} ${distanceData2.units}`;
			let angle = Math.abs(lineData.transformAngle);

			if (angle > Math.PI / 2) {
				angle = Math.PI - angle;
			}

			const labelPadding = Math.tan(angle) < this._label.offsetHeight / this._label.offsetWidth ? this._label.offsetWidth / 2 / Math.cos(angle) + 15 // 5px for each handle + padding
			: this._label.offsetHeight / 2 / Math.cos(Math.PI / 2 - angle) + 15;
			const paddingVector = lineData.line.normalize().multiplyScalar(labelPadding);
			const paddingPoint = lineData.length > labelPadding * 2 ? this._handles[1].screenPosition.clone().sub(paddingVector) : this._handles[1].screenPosition.clone().add(paddingVector);
			const transform = this.adjustLabelTransform(this._label, paddingPoint);
			this._label.style.transform = `translate3D(${transform.x}px, ${transform.y}px, 0)`;
			let angle2 = Math.abs(line2Data.transformAngle);

			if (angle2 > Math.PI / 2) {
				angle2 = Math.PI - angle2;
			}

			const label2Padding = Math.tan(angle2) < this._label2.offsetHeight / this._label2.offsetWidth ? this._label2.offsetWidth / 2 / Math.cos(angle2) + 15 // 5px for each handle + padding
			: this._label2.offsetHeight / 2 / Math.cos(Math.PI / 2 - angle2) + 15;
			const paddingVector2 = line2Data.line.normalize().multiplyScalar(label2Padding);
			const paddingPoint2 = line2Data.length > label2Padding * 2 ? this._handles[3].screenPosition.clone().sub(paddingVector2) : this._handles[3].screenPosition.clone().add(paddingVector2);
			const transform2 = this.adjustLabelTransform(this._label2, paddingPoint2);
			this._label2.style.transform = `translate3D(${transform2.x}px, ${transform2.y}px, 0)`;
		}

		updateDOMColor() {
			this._line.style.backgroundColor = this._color;
			this._label.style.borderColor = this._color;
			this._line2.style.backgroundColor = this._color;
			this._label2.style.borderColor = this._color;
			this._dashline.style.borderTop = '1.5px dashed ' + this._color;
		}

		free() {
			this.removeEventListeners();

			this._handles.forEach(h => {
				this.remove(h);
				h.free();
			});

			this._handles = [];

			this._container.removeChild(this._line);

			this._container.removeChild(this._label);

			this._container.removeChild(this._line2);

			this._container.removeChild(this._label2);

			this._container.removeChild(this._dashline); // mesh, geometry, material


			this.remove(this._mesh);

			this._mesh.geometry.dispose();

			this._mesh.geometry = null;

			this._mesh.material.dispose();

			this._mesh.material = null;
			this._mesh = null;

			this._geometry.dispose();

			this._geometry = null;
			this._material.vertexShader = null;
			this._material.fragmentShader = null;
			this._material.uniforms = null;

			this._material.dispose();

			this._material = null;
			super.free();
		}
		/**
		 * Get length of rulers
		 *
		 * @return {Array}
		 */


		getDistances() {
			return [this._distance, this._distance2];
		}

		get targetMesh() {
			return this._targetMesh;
		}

		set targetMesh(targetMesh) {
			this._targetMesh = targetMesh;

			this._handles.forEach(elem => elem.targetMesh = targetMesh);

			this.update();
		}

		get worldPosition() {
			return this._worldPosition;
		}

		set worldPosition(worldPosition) {
			this._handles.forEach(elem => elem.worldPosition.copy(worldPosition));

			this._worldPosition.copy(worldPosition);

			this.update();
		}

		get calibrationFactor() {
			return this._calibrationFactor;
		}

		set calibrationFactor(calibrationFactor) {
			this._calibrationFactor = calibrationFactor;
			this._units = 'mm';
			this.update();
		}

		get shotestDistance() {
			return this._distance < this._distance2 ? this._distance : this._distance2;
		}

		get longestDistance() {
			return this._distance > this._distance2 ? this._distance : this._distance2;
		}

	}

	/**
	 * @module widgets/crossRuler
	 */

	class widgetsCrossRuler extends widgetsBase {
		constructor(targetMesh, controls, params = {}) {
			super(targetMesh, controls, params);
			this._widgetType = 'CrossRuler'; // incoming parameters (optional: lps2IJK, pixelSpacing, ultrasoundRegions, worldPosition)

			this._calibrationFactor = params.calibrationFactor || null;
			this._distances = null; // from intersection point to handles

			this._line01 = null; // vector from 0 to 1st handle

			this._normal = null; // normal vector to line01
			// outgoing values

			this._distance = null;
			this._distance2 = null;
			this._units = !this._calibrationFactor && !params.pixelSpacing ? 'units' : 'mm';
			this._domHovered = false;
			this._moving = false; // mesh stuff

			this._material = null;
			this._geometry = null;
			this._mesh = null; // dom stuff

			this._line = null;
			this._line2 = null;
			this._label = null;
			this._label2 = null; // add handles

			this._handles = [];
			let handle;
			const WidgetsHandle = widgetsHandle();

			for (let i = 0; i < 4; i++) {
				handle = new WidgetsHandle(targetMesh, controls, params);
				this.add(handle);

				this._handles.push(handle);
			}

			this._handles[1].active = true;
			this._handles[1].tracking = true;
			this._moveHandle = new WidgetsHandle(targetMesh, controls, params);
			this.add(this._moveHandle);

			this._handles.push(this._moveHandle);

			this._moveHandle.hide();

			this.onHover = this.onHover.bind(this);
			this.onMove = this.onMove.bind(this);
			this.create();
			this.addEventListeners();
		}

		addEventListeners() {
			this._line.addEventListener('mouseenter', this.onHover);

			this._line.addEventListener('mouseleave', this.onHover);

			this._line2.addEventListener('mouseenter', this.onHover);

			this._line2.addEventListener('mouseleave', this.onHover);

			this._container.addEventListener('wheel', this.onMove);
		}

		removeEventListeners() {
			this._line.removeEventListener('mouseenter', this.onHover);

			this._line.removeEventListener('mouseleave', this.onHover);

			this._line2.removeEventListener('mouseenter', this.onHover);

			this._line2.removeEventListener('mouseleave', this.onHover);

			this._container.removeEventListener('wheel', this.onMove);
		}

		onHover(evt) {
			if (evt) {
				this.hoverDom(evt);
			}

			this.hoverMesh();
			this._hovered = this._handles[0].hovered || this._handles[1].hovered || this._handles[2].hovered || this._handles[3].hovered || this._domHovered;
			this._container.style.cursor = this._hovered ? 'pointer' : 'default';
		}

		hoverMesh() {// check raycast intersection, do we want to hover on mesh or just css?
		}

		hoverDom(evt) {
			this._domHovered = evt.type === 'mouseenter';
		}

		onStart(evt) {
			this._moveHandle.onMove(evt, true);

			this._handles.slice(0, -1).forEach(elem => elem.onStart(evt));

			this._active = this._handles[0].active || this._handles[1].active || this._handles[2].active || this._handles[3].active || this._domHovered;

			if (this._domHovered && this._distances) {
				this._moving = true;
				this._controls.enabled = false;
			}

			this.update();
		}

		onMove(evt) {
			if (this._active) {
				const prevPosition = this._moveHandle.worldPosition.clone();

				this._dragged = true;

				this._moveHandle.onMove(evt, true);

				if (this._moving) {
					this._handles.slice(0, -1).forEach(handle => {
						handle.worldPosition.add(this._moveHandle.worldPosition.clone().sub(prevPosition));
					});
				}
			} else {
				this.onHover(null);
			}

			this._handles.slice(0, -1).forEach(elem => elem.onMove(evt));

			if (this._distances) {
				if (this._handles[0].active || this._handles[1].active) {
					this.repositionOrtho(); // change worldPosition of 2nd and 3rd handle
				} else if (this._handles[2].active || this._handles[3].active) {
					this.recalculateOrtho();
				}
			}

			this.update();
		}

		onEnd() {
			this._handles[0].onEnd();

			this._handles[2].onEnd();

			this._handles[3].onEnd();

			if (this._handles[1].tracking && this._handles[0].screenPosition.distanceTo(this._handles[1].screenPosition) < 10) {
				return;
			}

			if (!this._dragged && this._active && !this._handles[1].tracking) {
				this._selected = !this._selected; // change state if there was no dragging

				this._handles[0].selected = this._selected;
				this._handles[2].selected = this._selected;
				this._handles[3].selected = this._selected;
			} // Second Handle


			if (this._dragged || !this._handles[1].tracking) {
				this._handles[1].tracking = false;

				this._handles[1].onEnd();
			} else {
				this._handles[1].tracking = false;
			}

			this._handles[1].selected = this._selected;
			this._active = this._handles[0].active || this._handles[1].active || this._handles[2].active || this._handles[3].active;
			this._dragged = false;
			this._moving = false;

			if (!this._distances) {
				this.initOrtho();
			}

			this.update();
		}

		create() {
			this.createMesh();
			this.createDOM();
		}

		createMesh() {
			// geometry
			// this._geometry = new three.Geometry();
			// this._geometry.vertices = [
			//	 this._handles[0].worldPosition,
			//	 this._handles[1].worldPosition,
			//	 this._handles[2].worldPosition,
			//	 this._handles[3].worldPosition,
			// ];
			this._geometry = new BufferGeometry();
			const positions = new Float32Array(4 * 3);

			this._geometry.setAttribute('position', new BufferAttribute(positions, 3));

			let index = 0;
			positions[index++] = this._handles[0].worldPosition.x;
			positions[index++] = this._handles[0].worldPosition.y;
			positions[index++] = this._handles[0].worldPosition.z;
			positions[index++] = this._handles[1].worldPosition.x;
			positions[index++] = this._handles[1].worldPosition.y;
			positions[index++] = this._handles[1].worldPosition.z;
			positions[index++] = this._handles[2].worldPosition.x;
			positions[index++] = this._handles[2].worldPosition.y;
			positions[index++] = this._handles[2].worldPosition.z;
			positions[index++] = this._handles[3].worldPosition.x;
			positions[index++] = this._handles[3].worldPosition.y;
			positions[index++] = this._handles[3].worldPosition.z; // material

			this._material = new three.LineBasicMaterial();
			this.updateMeshColor(); // mesh

			this._mesh = new three.LineSegments(this._geometry, this._material);
			this._mesh.visible = true;
			this.add(this._mesh);
		}

		createDOM() {
			this._line = document.createElement('div');
			this._line.className = 'widgets-line';

			this._container.appendChild(this._line);

			this._line2 = document.createElement('div');
			this._line2.className = 'widgets-line';

			this._container.appendChild(this._line2);

			this._label = document.createElement('div');
			this._label.className = 'widgets-label';

			this._container.appendChild(this._label);

			this._label2 = document.createElement('div');
			this._label2.className = 'widgets-label';

			this._container.appendChild(this._label2);

			this.updateDOMColor();
		}

		hideDOM() {
			this._line.style.display = 'none';
			this._line2.style.display = 'none';
			this._label.style.display = 'none';
			this._label2.style.display = 'none';

			this._handles.slice(0, -1).forEach(elem => elem.hideDOM());
		}

		showDOM() {
			this._line.style.display = '';
			this._line2.style.display = '';
			this._label.style.display = '';
			this._label2.style.display = '';

			this._handles.slice(0, -1).forEach(elem => elem.showDOM());
		}

		update() {
			this.updateColor();

			this._handles.slice(0, -1).forEach(elem => elem.update());

			this.updateMeshColor();
			this.updateMeshPosition();
			this.updateDOM();
		}

		updateMeshColor() {
			if (this._material) {
				this._material.color.set(this._color);
			}
		}

		updateMeshPosition() {
			if (this._geometry) {
				this._geometry.verticesNeedUpdate = true;
			}
		}

		updateDOM() {
			this.updateDOMColor(); // update first line

			const lineData = this.getLineData(this._handles[0].screenPosition, this._handles[1].screenPosition);
			this._line.style.transform = `translate3D(${lineData.transformX}px, ${lineData.transformY}px, 0)
						rotate(${lineData.transformAngle}rad)`;
			this._line.style.width = lineData.length + 'px'; // update second line

			const line2Data = this.getLineData(this._handles[2].screenPosition, this._handles[3].screenPosition);
			this._line2.style.transform = `translate3D(${line2Data.transformX}px, ${line2Data.transformY}px, 0)
						rotate(${line2Data.transformAngle}rad)`;
			this._line2.style.width = line2Data.length + 'px'; // update labels

			const distanceData = this.getDistanceData(this._handles[0].worldPosition, this._handles[1].worldPosition, this._calibrationFactor);
			const distanceData2 = this.getDistanceData(this._handles[2].worldPosition, this._handles[3].worldPosition, this._calibrationFactor);
			const title = 'Calibration is required to display the distance in mm';
			this._distance = distanceData.distance;
			this._distance2 = distanceData2.distance;

			if (distanceData.units && distanceData2.units && distanceData.units === distanceData2.units) {
				this._units = distanceData.units;
			} else {
				if (!distanceData.units) {
					distanceData.units = this._units;
				}

				if (!distanceData2.units) {
					distanceData2.units = this._units;
				}
			}

			if (distanceData.units === 'units' && !this._label.hasAttribute('title')) {
				this._label.setAttribute('title', title);

				this._label.style.color = this._colors.error;
			} else if (distanceData.units !== 'units' && this._label.hasAttribute('title')) {
				this._label.removeAttribute('title');

				this._label.style.color = this._colors.text;
			}

			if (distanceData2.units === 'units' && !this._label2.hasAttribute('title')) {
				this._label2.setAttribute('title', title);

				this._label2.style.color = this._colors.error;
			} else if (distanceData2.units !== 'units' && this._label2.hasAttribute('title')) {
				this._label2.removeAttribute('title');

				this._label2.style.color = this._colors.text;
			}

			this._label.innerHTML = `${this._distance.toFixed(2)} ${distanceData.units}`;
			this._label2.innerHTML = `${this._distance2.toFixed(2)} ${distanceData2.units}`;
			let angle = Math.abs(lineData.transformAngle);

			if (angle > Math.PI / 2) {
				angle = Math.PI - angle;
			}

			const labelPadding = Math.tan(angle) < this._label.offsetHeight / this._label.offsetWidth ? this._label.offsetWidth / 2 / Math.cos(angle) + 15 // 5px for each handle + padding
			: this._label.offsetHeight / 2 / Math.cos(Math.PI / 2 - angle) + 15,
						paddingVector = lineData.line.normalize().multiplyScalar(labelPadding),
						paddingPoint = lineData.length > labelPadding * 4 ? this._handles[1].screenPosition.clone().sub(paddingVector) : this._handles[1].screenPosition.clone().add(paddingVector),
						transform = this.adjustLabelTransform(this._label, paddingPoint);
			this._label.style.transform = `translate3D(${transform.x}px, ${transform.y}px, 0)`;
			let angle2 = Math.abs(line2Data.transformAngle);

			if (angle2 > Math.PI / 2) {
				angle2 = Math.PI - angle2;
			}

			const label2Padding = Math.tan(angle2) < this._label2.offsetHeight / this._label2.offsetWidth ? this._label2.offsetWidth / 2 / Math.cos(angle2) + 15 // 5px for each handle + padding
			: this._label2.offsetHeight / 2 / Math.cos(Math.PI / 2 - angle2) + 15,
						paddingVector2 = line2Data.line.normalize().multiplyScalar(label2Padding),
						paddingPoint2 = line2Data.length > label2Padding * 4 ? this._handles[3].screenPosition.clone().sub(paddingVector2) : this._handles[3].screenPosition.clone().add(paddingVector2),
						transform2 = this.adjustLabelTransform(this._label2, paddingPoint2);
			this._label2.style.transform = `translate3D(${transform2.x}px, ${transform2.y}px, 0)`;
		}

		updateDOMColor() {
			this._line.style.backgroundColor = this._color;
			this._line2.style.backgroundColor = this._color;
			this._label.style.borderColor = this._color;
			this._label2.style.borderColor = this._color;
		}

		free() {
			this.removeEventListeners();

			this._handles.forEach(h => {
				this.remove(h);
				h.free();
			});

			this._handles = [];

			this._container.removeChild(this._line);

			this._container.removeChild(this._line2);

			this._container.removeChild(this._label);

			this._container.removeChild(this._label2); // mesh, geometry, material


			this.remove(this._mesh);

			this._mesh.geometry.dispose();

			this._mesh.geometry = null;

			this._mesh.material.dispose();

			this._mesh.material = null;
			this._mesh = null;

			this._geometry.dispose();

			this._geometry = null;
			this._material.vertexShader = null;
			this._material.fragmentShader = null;
			this._material.uniforms = null;

			this._material.dispose();

			this._material = null;
			super.free();
		}

		initLineAndNormal() {
			this._line01 = this._handles[1].worldPosition.clone().sub(this._handles[0].worldPosition);
			this._normal = this._line01.clone().cross(this._camera._direction).normalize();
		}

		initOrtho() {
			// called onEnd if distances are null
			this.initLineAndNormal();

			const center = this._handles[1].worldPosition.clone().add(this._handles[0].worldPosition).multiplyScalar(0.5);

			const halfLength = this._line01.length() / 2;

			const normLine = this._normal.clone().multiplyScalar(halfLength * 0.8);

			const normLength = normLine.length();

			this._handles[2].worldPosition.copy(center.clone().add(normLine));

			this._handles[3].worldPosition.copy(center.clone().sub(normLine));

			this._distances = [halfLength, halfLength, normLength, normLength];
		}

		repositionOrtho() {
			// called onMove if 0 or 1st handle is active
			this.initLineAndNormal();
			this._distances[0] *= this._line01.length() / (this._distances[0] + this._distances[1]);
			this._distances[1] = this._line01.length() - this._distances[0];

			const intersect = this._handles[0].worldPosition.clone().add(this._line01.clone().normalize().multiplyScalar(this._distances[0]));

			this._handles[2].worldPosition.copy(intersect.clone().add(this._normal.clone().multiplyScalar(this._distances[2])));

			this._handles[3].worldPosition.copy(intersect.clone().sub(this._normal.clone().multiplyScalar(this._distances[3])));
		}

		recalculateOrtho() {
			// called onMove if 2nd or 3rd handle is active
			const activeInd = this._handles[2].active ? 2 : 3;
			const lines = [];
			const intersect = new three.Vector3();
			lines[2] = this._handles[2].worldPosition.clone().sub(this._handles[0].worldPosition);
			lines[3] = this._handles[3].worldPosition.clone().sub(this._handles[0].worldPosition);
			new three.Ray(this._handles[0].worldPosition, this._line01.clone().normalize()).closestPointToPoint(this._handles[activeInd].worldPosition, intersect);

			const isOutside = intersect.clone().sub(this._handles[0].worldPosition).length() > this._line01.length(); // if intersection is outside of the line01 then change worldPosition of active handle


			if (isOutside || intersect.equals(this._handles[0].worldPosition)) {
				if (isOutside) {
					intersect.copy(this._handles[1].worldPosition);
				}

				this._handles[activeInd].worldPosition.copy(intersect.clone().add(lines[activeInd].clone().projectOnVector(this._normal)));
			}

			if (lines[2].cross(this._line01).angleTo(this._camera._direction) > 0.01) {
				this._handles[2].worldPosition.copy(intersect); // 2nd handle should always be above line01

			}

			if (lines[3].cross(this._line01).angleTo(this._camera._direction) < Math.PI - 0.01) {
				this._handles[3].worldPosition.copy(intersect); // 3nd handle should always be below line01

			}

			lines[0] = this._normal.clone().multiplyScalar(this._distances[5 - activeInd]);

			if (activeInd === 2) {
				lines[0].negate();
			}

			this._handles[5 - activeInd].worldPosition.copy(intersect.clone().add(lines[0]));

			this._distances[activeInd] = intersect.distanceTo(this._handles[activeInd].worldPosition);
			this._distances[0] = intersect.distanceTo(this._handles[0].worldPosition);
			this._distances[1] = intersect.distanceTo(this._handles[1].worldPosition);
		}
		/**
		 * Get length of rulers
		 *
		 * @return {Array}
		 */


		getDimensions() {
			return [this._distance, this._distance2];
		}
		/**
		 * Get CrossRuler handles position
		 *
		 * @return {Array.<Vector3>} First begin, first end, second begin, second end
		 */


		getCoordinates() {
			return [this._handles[0].worldPosition, this._handles[1].worldPosition, this._handles[2].worldPosition, this._handles[3].worldPosition];
		}
		/**
		 * Set CrossRuler handles position
		 *
		 * @param {Vector3} first	 The beginning of the first line
		 * @param {Vector3} second	The end of the first line
		 * @param {Vector3} third	 The beginning of the second line (clockwise relative to the first line)
		 * @param {Vector3} fourth	The end of the second line
		 */


		initCoordinates(first, second, third, fourth) {
			const intersectR = new three.Vector3();
			const intersectS = new three.Vector3();
			const ray = new three.Ray(first);
			ray.lookAt(second);
			ray.distanceSqToSegment(third, fourth, intersectR, intersectS);

			if (intersectR.distanceTo(intersectS) > 0.01 && intersectR.distanceTo(first) > second.distanceTo(first) + 0.01) {
				console.warn('Lines do not intersect');
				return;
			}

			this.active = false;
			this.hovered = false;
			this.setDefaultColor('#198');

			this._worldPosition.copy(first);

			this._handles[0].worldPosition.copy(first);

			this._handles[1].worldPosition.copy(second);

			this._handles[1].active = false;
			this._handles[1].tracking = false;

			this._handles[2].worldPosition.copy(third);

			this._handles[3].worldPosition.copy(fourth);

			this._distances = [intersectR.distanceTo(first), intersectR.distanceTo(second), intersectR.distanceTo(third), intersectR.distanceTo(fourth)];
			this.initLineAndNormal();
			this.update();
		}

		get targetMesh() {
			return this._targetMesh;
		}

		set targetMesh(targetMesh) {
			this._targetMesh = targetMesh;

			this._handles.forEach(elem => elem.targetMesh = targetMesh);

			this.update();
		}

		get worldPosition() {
			return this._worldPosition;
		}

		set worldPosition(worldPosition) {
			this._handles.slice(0, -1).forEach(elem => elem.worldPosition.copy(worldPosition));

			this._worldPosition.copy(worldPosition);

			this.update();
		}

		get calibrationFactor() {
			return this._calibrationFactor;
		}

		set calibrationFactor(calibrationFactor) {
			this._calibrationFactor = calibrationFactor;
			this._units = 'mm';
			this.update();
		}

	}

	/**
	 * @module widgets/ellipse
	 */

	class widgetsEllipse extends widgetsBase {
		constructor(targetMesh, controls, params = {}) {
			super(targetMesh, controls, params);
			this._widgetType = 'Ellipse'; // incoming parameters (optional: frameIndex, worldPosition)

			this._stack = params.stack; // required

			this._calibrationFactor = params.calibrationFactor || null; // outgoing values

			this._area = null;
			this._units = !this._calibrationFactor && !params.stack.frame[params.frameIndex].pixelSpacing ? 'units' : 'cm²';
			this._moving = false;
			this._domHovered = false; // mesh stuff

			this._material = null;
			this._geometry = null;
			this._mesh = null; // dom stuff

			this._rectangle = null;
			this._ellipse = null;
			this._label = null; // add handles

			this._handles = [];
			let handle;
			const WidgetsHandle = widgetsHandle();

			for (let i = 0; i < 2; i++) {
				handle = new WidgetsHandle(targetMesh, controls, params);
				this.add(handle);

				this._handles.push(handle);
			}

			this._handles[1].active = true;
			this._handles[1].tracking = true;
			this._moveHandle = new WidgetsHandle(targetMesh, controls, params);
			this.add(this._moveHandle);

			this._handles.push(this._moveHandle);

			this._moveHandle.hide();

			this.create();
			this.onMove = this.onMove.bind(this);
			this.onHover = this.onHover.bind(this);
			this.addEventListeners();
		}

		addEventListeners() {
			this._container.addEventListener('wheel', this.onMove);

			this._rectangle.addEventListener('mouseenter', this.onHover);

			this._rectangle.addEventListener('mouseleave', this.onHover);

			this._ellipse.addEventListener('mouseenter', this.onHover);

			this._ellipse.addEventListener('mouseleave', this.onHover);

			this._label.addEventListener('mouseenter', this.onHover);

			this._label.addEventListener('mouseleave', this.onHover);
		}

		removeEventListeners() {
			this._container.removeEventListener('wheel', this.onMove);

			this._rectangle.removeEventListener('mouseenter', this.onHover);

			this._rectangle.removeEventListener('mouseleave', this.onHover);

			this._ellipse.removeEventListener('mouseenter', this.onHover);

			this._ellipse.removeEventListener('mouseleave', this.onHover);

			this._label.removeEventListener('mouseenter', this.onHover);

			this._label.removeEventListener('mouseleave', this.onHover);
		}

		onHover(evt) {
			if (evt) {
				this.hoverDom(evt);
			}

			this.hoverMesh();
			this._hovered = this._handles[0].hovered || this._handles[1].hovered || this._domHovered;
			this._container.style.cursor = this._hovered ? 'pointer' : 'default';
		}

		hoverMesh() {// check raycast intersection, if we want to hover on mesh instead of just css
		}

		hoverDom(evt) {
			this._domHovered = evt.type === 'mouseenter';
		}

		onStart(evt) {
			this._moveHandle.onMove(evt, true);

			this._handles[0].onStart(evt);

			this._handles[1].onStart(evt);

			this._active = this._handles[0].active || this._handles[1].active || this._domHovered;

			if (this._domHovered && !this._handles[1].tracking) {
				this._moving = true;
				this._controls.enabled = false;
			}

			this.update();
		}

		onMove(evt) {
			if (this._active) {
				const prevPosition = this._moveHandle.worldPosition.clone();

				this._dragged = true;

				this._moveHandle.onMove(evt, true);

				if (this._moving) {
					this._handles.slice(0, -1).forEach(handle => {
						handle.worldPosition.add(this._moveHandle.worldPosition.clone().sub(prevPosition));
					});
				}

				this.updateRoI(true);
			} else {
				this.onHover(null);
			}

			this._handles[0].onMove(evt);

			this._handles[1].onMove(evt);

			this.update();
		}

		onEnd() {
			this._handles[0].onEnd(); // First Handle


			if (this._handles[1].tracking && this._handles[0].screenPosition.distanceTo(this._handles[1].screenPosition) < 10) {
				return;
			}

			if (!this._dragged && this._active && !this._handles[1].tracking) {
				this._selected = !this._selected; // change state if there was no dragging

				this._handles[0].selected = this._selected;
			} // Second Handle


			if (this._dragged || !this._handles[1].tracking) {
				this._handles[1].tracking = false;

				this._handles[1].onEnd();
			} else {
				this._handles[1].tracking = false;
			}

			this._handles[1].selected = this._selected;
			this._active = this._handles[0].active || this._handles[1].active;
			this._dragged = false;
			this._moving = false;
			this.updateRoI(); // TODO: if (this._dragged || !this._initialized)

			this.update();
		}

		hideDOM() {
			this._handles.forEach(elem => elem.hideDOM());

			this._rectangle.style.display = 'none';
			this._ellipse.style.display = 'none';
			this._label.style.display = 'none';
		}

		showDOM() {
			this._handles[0].showDOM();

			this._handles[1].showDOM();

			this._rectangle.style.display = '';
			this._ellipse.style.display = '';
			this._label.style.display = '';
		}

		create() {
			this.createMaterial();
			this.createDOM();
		}

		createMaterial() {
			this._material = new three.MeshBasicMaterial();
			this._material.transparent = true;
			this._material.opacity = 0.2;
		}

		createDOM() {
			this._rectangle = document.createElement('div');
			this._rectangle.className = 'widgets-rectangle-helper';

			this._container.appendChild(this._rectangle);

			this._ellipse = document.createElement('div');
			this._ellipse.className = 'widgets-ellipse';

			this._container.appendChild(this._ellipse);

			this._label = document.createElement('div');
			this._label.className = 'widgets-label'; // measurements

			const measurementsContainer = document.createElement('div'); // Mean / SD

			let meanSDContainer = document.createElement('div');
			meanSDContainer.className = 'mean-sd';
			measurementsContainer.appendChild(meanSDContainer); // Max / Min

			let maxMinContainer = document.createElement('div');
			maxMinContainer.className = 'max-min';
			measurementsContainer.appendChild(maxMinContainer); // Area

			let areaContainer = document.createElement('div');
			areaContainer.className = 'area';
			measurementsContainer.appendChild(areaContainer);

			this._label.appendChild(measurementsContainer);

			this._container.appendChild(this._label);

			this.updateDOMColor();
		}

		update() {
			this.updateColor();

			this._handles[0].update();

			this._handles[1].update();

			this.updateMeshColor();
			this.updateMeshPosition();
			this.updateDOM();
		}

		updateMeshColor() {
			if (this._material) {
				this._material.color.set(this._color);
			}
		}

		updateMeshPosition() {
			if (this._mesh) {
				this.remove(this._mesh);
			}

			const vec01 = this._handles[1].worldPosition.clone().sub(this._handles[0].worldPosition);

			const height = vec01.clone().projectOnVector(this._camera.up).length();
			const width = vec01.clone().projectOnVector(this._camera._right).length();

			if (width === 0 || height === 0) {
				return;
			}

			this._geometry = new three.ShapeGeometry(new three.Shape(new three.EllipseCurve(0, 0, width / 2, height / 2, 0, 2 * Math.PI, false).getPoints(50)));
			this._mesh = new three.Mesh(this._geometry, this._material);

			this._mesh.position.copy(this._handles[0].worldPosition.clone().add(vec01.multiplyScalar(0.5)));

			this._mesh.rotation.copy(this._camera.rotation);

			this._mesh.visible = true;
			this.add(this._mesh);
		}

		updateRoI(clear) {
			if (!this._geometry) {
				return;
			}

			const meanSDContainer = this._label.querySelector('.mean-sd');

			const maxMinContainer = this._label.querySelector('.max-min');

			if (clear) {
				meanSDContainer.innerHTML = '';
				maxMinContainer.innerHTML = '';
				return;
			}

			const roi = CoreUtils.getRoI(this._mesh, this._camera, this._stack);

			if (roi !== null) {
				meanSDContainer.innerHTML = `Mean: ${roi.mean.toFixed(1)} / SD: ${roi.sd.toFixed(1)}`;
				maxMinContainer.innerHTML = `Max: ${roi.max.toFixed()} / Min: ${roi.min.toFixed()}`;
			} else {
				meanSDContainer.innerHTML = '';
				maxMinContainer.innerHTML = '';
			}
		}

		updateDOMColor() {
			this._rectangle.style.borderColor = this._color;
			this._ellipse.style.borderColor = this._color;
			this._label.style.borderColor = this._color;
		}

		updateDOM() {
			if (!this._geometry) {
				return;
			}

			this.updateDOMColor();
			const regions = this._stack.frame[this._params.frameIndex].ultrasoundRegions || [];
			this._area = CoreUtils.getGeometryArea(this._geometry);

			if (this._calibrationFactor) {
				this._area *= Math.pow(this._calibrationFactor, 2);
			} else if (regions && regions.length > 0 && this._stack.lps2IJK) {
				const region0 = this.getRegionByXY(regions, CoreUtils.worldToData(this._stack.lps2IJK, this._handles[0].worldPosition));
				const region1 = this.getRegionByXY(regions, CoreUtils.worldToData(this._stack.lps2IJK, this._handles[1].worldPosition));

				if (region0 !== null && region1 !== null && region0 === region1 && regions[region0].unitsX === 'cm' && regions[region0].unitsY === 'cm') {
					this._area *= Math.pow(regions[region0].deltaX, 2);
					this._units = 'cm²';
				} else if (this._stack.frame[this._params.frameIndex].pixelSpacing) {
					this._area /= 100;
					this._units = 'cm²';
				} else {
					this._units = 'units';
				}
			} else if (this._units === 'cm²') {
				this._area /= 100;
			}

			if (this._units === 'units' && !this._label.hasAttribute('title')) {
				this._label.setAttribute('title', 'Calibration is required to display the area in cm²');

				this._label.style.color = this._colors.error;
			} else if (this._units !== 'units' && this._label.hasAttribute('title')) {
				this._label.removeAttribute('title');

				this._label.style.color = this._colors.text;
			}

			this._label.querySelector('.area').innerHTML = `Area: ${this._area.toFixed(2)} ${this._units}`;
			const rectData = this.getRectData(this._handles[0].screenPosition, this._handles[1].screenPosition);
			const labelTransform = this.adjustLabelTransform(this._label, this._handles[1].screenPosition.clone().add(rectData.paddingVector.multiplyScalar(15 + this._label.offsetHeight / 2))); // update rectangle

			this._rectangle.style.transform = `translate3D(${rectData.transformX}px, ${rectData.transformY}px, 0)`;
			this._rectangle.style.width = rectData.width + 'px';
			this._rectangle.style.height = rectData.height + 'px'; // update ellipse

			this._ellipse.style.transform = `translate3D(${rectData.transformX}px, ${rectData.transformY}px, 0)`;
			this._ellipse.style.width = rectData.width + 'px';
			this._ellipse.style.height = rectData.height + 'px'; // update label

			this._label.style.transform = 'translate3D(' + labelTransform.x + 'px,' + labelTransform.y + 'px, 0)';
		}

		free() {
			this.removeEventListeners();

			this._handles.forEach(h => {
				this.remove(h);
				h.free();
			});

			this._handles = [];

			this._container.removeChild(this._rectangle);

			this._container.removeChild(this._ellipse);

			this._container.removeChild(this._label); // mesh, geometry, material


			if (this._mesh) {
				this.remove(this._mesh);

				this._mesh.geometry.dispose();

				this._mesh.geometry = null;

				this._mesh.material.dispose();

				this._mesh.material = null;
				this._mesh = null;
			}

			if (this._geometry) {
				this._geometry.dispose();

				this._geometry = null;
			}

			this._material.vertexShader = null;
			this._material.fragmentShader = null;
			this._material.uniforms = null;

			this._material.dispose();

			this._material = null;
			this._stack = null;
			super.free();
		}

		getMeasurements() {
			return {
				area: this._area,
				units: this._units
			};
		}

		get targetMesh() {
			return this._targetMesh;
		}

		set targetMesh(targetMesh) {
			this._targetMesh = targetMesh;

			this._handles.forEach(elem => elem.targetMesh = targetMesh);

			this.update();
		}

		get worldPosition() {
			return this._worldPosition;
		}

		set worldPosition(worldPosition) {
			this._handles[0].worldPosition.copy(worldPosition);

			this._handles[1].worldPosition.copy(worldPosition);

			this._worldPosition.copy(worldPosition);

			this.update();
		}

		get calibrationFactor() {
			return this._calibrationFactor;
		}

		set calibrationFactor(calibrationFactor) {
			this._calibrationFactor = calibrationFactor;
			this._units = 'cm²';
			this.update();
		}

	}

	/**
	 * @module widgets/freehand
	 */

	class widgetsFreehand extends widgetsBase {
		constructor(targetMesh, controls, params = {}) {
			super(targetMesh, controls, params);
			this._widgetType = 'Freehand'; // incoming parameters (optional: frameIndex, worldPosition)

			this._stack = params.stack; // required

			this._calibrationFactor = params.calibrationFactor || null; // outgoing values

			this._area = null;
			this._units = !this._calibrationFactor && !params.stack.frame[params.frameIndex].pixelSpacing ? 'units' : 'cm²';
			this._initialized = false; // set to true onEnd if number of handles > 2

			this._moving = false;
			this._domHovered = false; // mesh stuff

			this._material = null;
			this._geometry = null;
			this._mesh = null; // dom stuff

			this._lines = [];
			this._label = null; // add handles

			this._handles = [];
			const WidgetsHandle = widgetsHandle();
			let handle = new WidgetsHandle(targetMesh, controls, params);
			this.add(handle);

			this._handles.push(handle);

			this._moveHandle = new WidgetsHandle(targetMesh, controls, params);
			this.add(this._moveHandle);

			this._moveHandle.hide();

			this.onMove = this.onMove.bind(this);
			this.onHover = this.onHover.bind(this);
			this.create();
			this.addEventListeners();
		}

		addEventListeners() {
			this._container.addEventListener('wheel', this.onMove);

			this._label.addEventListener('mouseenter', this.onHover);

			this._label.addEventListener('mouseleave', this.onHover);
		}

		removeEventListeners() {
			this._container.removeEventListener('wheel', this.onMove);

			this._label.removeEventListener('mouseenter', this.onHover);

			this._label.removeEventListener('mouseleave', this.onHover);
		}

		onHover(evt) {
			if (evt) {
				this.hoverDom(evt);
			}

			this.hoverMesh();
			let hovered = false;

			this._handles.forEach(elem => hovered = hovered || elem.hovered);

			this._hovered = hovered || this._domHovered;
			this._container.style.cursor = this._hovered ? 'pointer' : 'default';
		}

		hoverMesh() {// check raycast intersection, if we want to hover on mesh instead of just css
		}

		hoverDom(evt) {
			this._domHovered = evt.type === 'mouseenter';
		}

		onStart(evt) {
			let active = false;

			this._moveHandle.onMove(evt, true);

			this._handles.forEach(elem => {
				elem.onStart(evt);
				active = active || elem.active;
			});

			this._active = active || this._domHovered;

			if (this._domHovered && this._initialized) {
				this._moving = true;
				this._controls.enabled = false;
			}

			this.update();
		}

		onMove(evt) {
			let hovered = false;

			if (this.active) {
				this._dragged = true;

				if (!this._initialized) {
					this._handles[this._handles.length - 1].hovered = false;
					this._handles[this._handles.length - 1].active = false;
					this._handles[this._handles.length - 1].tracking = false;
					const WidgetsHandle = widgetsHandle();
					let handle = new WidgetsHandle(this._targetMesh, this._controls, this._params);
					handle.hovered = true;
					handle.active = true;
					handle.tracking = true;
					this.add(handle);

					this._handles.push(handle);

					this.createLine();
				} else {
					const prevPosition = this._moveHandle.worldPosition.clone();

					this._moveHandle.onMove(evt, true);

					if (this._mesh) {
						this.remove(this._mesh);
					}

					this.updateDOMContent(true);

					if (this._moving) {
						this._handles.forEach(handle => {
							handle.worldPosition.add(this._moveHandle.worldPosition.clone().sub(prevPosition));
						});
					}
				}
			}

			this._handles.forEach(elem => {
				elem.onMove(evt);
				hovered = hovered || elem.hovered;
			});

			this._hovered = hovered || this._domHovered;
			this._container.style.cursor = this._hovered ? 'pointer' : 'default';

			if (this.active && this._handles.length > 2) {
				this.pushPopHandle();
			}

			this.update();
		}

		onEnd() {
			if (this._handles.length < 3) {
				return;
			}

			let active = false;

			this._handles.slice(0, -1).forEach(elem => {
				elem.onEnd();
				active = active || elem.active;
			}); // Last Handle


			if (this._dragged || !this._handles[this._handles.length - 1].tracking) {
				this._handles[this._handles.length - 1].tracking = false;

				this._handles[this._handles.length - 1].onEnd();
			} else {
				this._handles[this._handles.length - 1].tracking = false;
			}

			if (this._lines.length < this._handles.length) {
				this.createLine();
			}

			if (this._dragged || !this._initialized) {
				this.updateMesh();
				this.updateDOMContent();
			}

			if (!this._dragged && this._active) {
				this._selected = !this._selected; // change state if there was no dragging

				this._handles.forEach(elem => elem.selected = this._selected);
			}

			this._active = active || this._handles[this._handles.length - 1].active;
			this._dragged = false;
			this._moving = false;
			this._initialized = true;
			this.update();
		}

		create() {
			this.createMaterial();
			this.createDOM();
		}

		createMaterial() {
			this._material = new three.MeshBasicMaterial({
				side: three.DoubleSide
			});
			this._material.transparent = true;
			this._material.opacity = 0.2;
		}

		createDOM() {
			this._label = document.createElement('div');
			this._label.className = 'widgets-label'; // measurements

			const measurementsContainer = document.createElement('div'); // Mean / SD

			let meanSDContainer = document.createElement('div');
			meanSDContainer.className = 'mean-sd';
			measurementsContainer.appendChild(meanSDContainer); // Max / Min

			let maxMinContainer = document.createElement('div');
			maxMinContainer.className = 'max-min';
			measurementsContainer.appendChild(maxMinContainer); // Area

			let areaContainer = document.createElement('div');
			areaContainer.className = 'area';
			measurementsContainer.appendChild(areaContainer);

			this._label.appendChild(measurementsContainer);

			this._container.appendChild(this._label);

			this.updateDOMColor();
		}

		createLine() {
			const line = document.createElement('div');
			line.className = 'widgets-line';
			line.addEventListener('mouseenter', this.onHover);
			line.addEventListener('mouseleave', this.onHover);

			this._lines.push(line);

			this._container.appendChild(line);
		}

		hideDOM() {
			this._handles.forEach(elem => elem.hideDOM());

			this._lines.forEach(elem => elem.style.display = 'none');

			this._label.style.display = 'none';
		}

		showDOM() {
			this._handles.forEach(elem => elem.showDOM());

			this._lines.forEach(elem => elem.style.display = '');

			this._label.style.display = '';
		}

		update() {
			this.updateColor(); // update handles

			this._handles.forEach(elem => elem.update()); // mesh stuff


			this.updateMeshColor();
			this.updateMeshPosition(); // DOM stuff

			this.updateDOMColor();
			this.updateDOMPosition();
		}

		updateMesh() {
			if (this._mesh) {
				this.remove(this._mesh);
			}

			let points = [];

			this._handles.forEach(elem => points.push(elem.worldPosition));

			let center = CoreUtils.centerOfMass(points); // direction from first point to center

			let referenceDirection = new three.Vector3().subVectors(points[0], center).normalize();
			let direction = new three.Vector3().crossVectors(new three.Vector3().subVectors(points[0], center), // side 1
			new three.Vector3().subVectors(points[1], center) // side 2
			);
			let base = new three.Vector3().crossVectors(referenceDirection, direction).normalize();
			let orderedpoints = []; // other lines // if inter, return location + angle

			for (let j = 0; j < points.length; j++) {
				let point = new three.Vector3(points[j].x, points[j].y, points[j].z);
				point.direction = new three.Vector3().subVectors(points[j], center).normalize();
				let x = referenceDirection.dot(point.direction);
				let y = base.dot(point.direction);
				point.xy = {
					x,
					y
				};
				point.angle = Math.atan2(y, x) * (180 / Math.PI);
				orderedpoints.push(point);
			} // override to catch console.warn "THREE.ShapeUtils: Unable to triangulate polygon! in triangulate()"


			this._shapeWarn = false;
			const oldWarn = console.warn;

			console.warn = function (...rest) {
				if (rest[0] === 'three.ShapeUtils: Unable to triangulate polygon! in triangulate()') {
					this._shapeWarn = true;
				}

				return oldWarn.apply(console, rest);
			}.bind(this); // create the shape


			let shape = new three.Shape(); // move to first point!

			shape.moveTo(orderedpoints[0].xy.x, orderedpoints[0].xy.y); // loop through all points!

			for (let l = 1; l < orderedpoints.length; l++) {
				// project each on plane!
				shape.lineTo(orderedpoints[l].xy.x, orderedpoints[l].xy.y);
			} // close the shape!


			shape.lineTo(orderedpoints[0].xy.x, orderedpoints[0].xy.y);
			this._geometry = new three.ShapeGeometry(shape);
			console.warn = oldWarn;
			this._geometry.vertices = orderedpoints;
			this._geometry.verticesNeedUpdate = true;
			this._geometry.elementsNeedUpdate = true;
			this.updateMeshColor();
			this._mesh = new three.Mesh(this._geometry, this._material);
			this._mesh.visible = true;
			this.add(this._mesh);
		}

		updateMeshColor() {
			if (this._material) {
				this._material.color.set(this._color);
			}
		}

		updateMeshPosition() {
			if (this._geometry) {
				this._geometry.verticesNeedUpdate = true;
			}
		}

		isPointOnLine(pointA, pointB, pointToCheck) {
			let c = new three.Vector3();
			c.crossVectors(pointA.clone().sub(pointToCheck), pointB.clone().sub(pointToCheck));
			return !c.length();
		}

		pushPopHandle() {
			let handle0 = this._handles[this._handles.length - 3];
			let handle1 = this._handles[this._handles.length - 2];
			let newhandle = this._handles[this._handles.length - 1];
			let isOnLine = this.isPointOnLine(handle0.worldPosition, handle1.worldPosition, newhandle.worldPosition);

			if (isOnLine || handle0.screenPosition.distanceTo(newhandle.screenPosition) < 25) {
				this.remove(handle1);
				handle1.free();
				this._handles[this._handles.length - 2] = newhandle;

				this._handles.pop();

				this._container.removeChild(this._lines.pop());
			}

			return isOnLine;
		}

		updateDOMColor() {
			if (this._handles.length >= 2) {
				this._lines.forEach(elem => elem.style.backgroundColor = this._color);
			}

			this._label.style.borderColor = this._color;
		}

		updateDOMContent(clear) {
			const meanSDContainer = this._label.querySelector('.mean-sd');

			const maxMinContainer = this._label.querySelector('.max-min');

			const areaContainer = this._label.querySelector('.area');

			if (clear) {
				meanSDContainer.innerHTML = '';
				maxMinContainer.innerHTML = '';
				areaContainer.innerHTML = '';
				return;
			}

			const regions = this._stack.frame[this._params.frameIndex].ultrasoundRegions || [];
			this._area = CoreUtils.getGeometryArea(this._geometry); // this.getArea result is changed on dragging

			if (this._calibrationFactor) {
				this._area *= Math.pow(this._calibrationFactor, 2);
			} else if (regions && regions.length > 0 && this._stack.lps2IJK) {
				let same = true;
				let cRegion;
				let pRegion;

				this._handles.forEach(elem => {
					cRegion = this.getRegionByXY(regions, CoreUtils.worldToData(this._stack.lps2IJK, elem.worldPosition));

					if (cRegion === null || regions[cRegion].unitsX !== 'cm' || pRegion !== undefined && pRegion !== cRegion) {
						same = false;
					}

					pRegion = cRegion;
				});

				if (same) {
					this._area *= Math.pow(regions[cRegion].deltaX, 2);
					this._units = 'cm²';
				} else if (this._stack.frame[this._params.frameIndex].pixelSpacing) {
					this._area /= 100;
					this._units = 'cm²';
				} else {
					this._units = 'units';
				}
			} else if (this._units === 'cm²') {
				this._area /= 100;
			}

			let title = this._units === 'units' ? 'Calibration is required to display the area in cm². ' : '';

			if (this._shapeWarn) {
				title += 'Values may be incorrect due to triangulation error.';
			}

			if (title !== '' && !this._label.hasAttribute('title')) {
				this._label.setAttribute('title', title);

				this._label.style.color = this._colors.error;
			} else if (title === '' && this._label.hasAttribute('title')) {
				this._label.removeAttribute('title');

				this._label.style.color = this._colors.text;
			}

			const roi = CoreUtils.getRoI(this._mesh, this._camera, this._stack);

			if (roi !== null) {
				meanSDContainer.innerHTML = `Mean: ${roi.mean.toFixed(1)} / SD: ${roi.sd.toFixed(1)}`;
				maxMinContainer.innerHTML = `Max: ${roi.max.toFixed()} / Min: ${roi.min.toFixed()}`;
			} else {
				meanSDContainer.innerHTML = '';
				maxMinContainer.innerHTML = '';
			}

			areaContainer.innerHTML = `Area: ${this._area.toFixed(2)} ${this._units}`;
		}

		updateDOMPosition() {
			if (this._handles.length < 2) {
				return;
			} // update lines and get coordinates of lowest handle


			let labelPosition = null;

			this._lines.forEach((elem, ind) => {
				const lineData = this.getLineData(this._handles[ind].screenPosition, this._handles[ind + 1 === this._handles.length ? 0 : ind + 1].screenPosition);
				elem.style.transform = `translate3D(${lineData.transformX}px, ${lineData.transformY}px, 0)
								rotate(${lineData.transformAngle}rad)`;
				elem.style.width = lineData.length + 'px';

				if (labelPosition === null || labelPosition.y < this._handles[ind].screenPosition.y) {
					labelPosition = this._handles[ind].screenPosition.clone();
				}
			});

			if (!this._initialized) {
				return;
			} // update label


			labelPosition.y += 15 + this._label.offsetHeight / 2;
			labelPosition = this.adjustLabelTransform(this._label, labelPosition);
			this._label.style.transform = `translate3D(${labelPosition.x}px, ${labelPosition.y}px, 0)`;
		}

		free() {
			this.removeEventListeners();

			this._handles.forEach(h => {
				this.remove(h);
				h.free();
			});

			this._handles = [];
			this.remove(this._moveHandle);

			this._moveHandle.free();

			this._moveHandle = null;

			this._lines.forEach(elem => {
				elem.removeEventListener('mouseenter', this.onHover);
				elem.removeEventListener('mouseleave', this.onHover);

				this._container.removeChild(elem);
			});

			this._lines = [];

			this._container.removeChild(this._label); // mesh, geometry, material


			if (this._mesh) {
				this.remove(this._mesh);

				this._mesh.geometry.dispose();

				this._mesh.geometry = null;

				this._mesh.material.dispose();

				this._mesh.material = null;
				this._mesh = null;
			}

			if (this._geometry) {
				this._geometry.dispose();

				this._geometry = null;
			}

			this._material.vertexShader = null;
			this._material.fragmentShader = null;
			this._material.uniforms = null;

			this._material.dispose();

			this._material = null;
			this._stack = null;
			super.free();
		}

		getMeasurements() {
			return {
				area: this._area,
				units: this._units
			};
		}

		get targetMesh() {
			return this._targetMesh;
		}

		set targetMesh(targetMesh) {
			this._targetMesh = targetMesh;

			this._handles.forEach(elem => elem.targetMesh = targetMesh);

			this._moveHandle.targetMesh = targetMesh;
			this.update();
		}

		get worldPosition() {
			return this._worldPosition;
		}

		set worldPosition(worldPosition) {
			this._handles.forEach(elem => elem._worldPosition.copy(worldPosition));

			this._worldPosition.copy(worldPosition);

			this.update();
		}

		get calibrationFactor() {
			return this._calibrationFactor;
		}

		set calibrationFactor(calibrationFactor) {
			this._calibrationFactor = calibrationFactor;
			this._units = 'cm²';
			this.update();
		}

	}

	/**
	 * @module widgets/peakVelocity (Gradient)
	 */

	class widgetsPeakVelocity extends widgetsBase {
		constructor(targetMesh, controls, params = {}) {
			super(targetMesh, controls, params);
			this._widgetType = 'PeakVelocity'; // incoming parameters (required: lps2IJK, worldPosition)

			this._regions = params.ultrasoundRegions || []; // required

			if (this._regions.length < 1) {
				throw new Error('Ultrasound regions should not be empty!');
			} // outgoing values


			this._velocity = null;
			this._gradient = null;
			this._container.style.cursor = 'pointer';
			this._controls.enabled = false; // controls should be disabled for widgets with a single handle

			this._initialized = false; // set to true onEnd

			this._active = true;
			this._domHovered = false;
			this._initialRegion = this.getRegionByXY(this._regions, CoreUtils.worldToData(params.lps2IJK, params.worldPosition));

			if (this._initialRegion === null) {
				throw new Error('Invalid initial UltraSound region!');
			} // dom stuff


			this._line = null;
			this._label = null; // handle (represent line)

			const WidgetsHandle = widgetsHandle();
			this._handle = new WidgetsHandle(targetMesh, controls, params);
			this.add(this._handle);
			this._moveHandle = new WidgetsHandle(targetMesh, controls, params);
			this.add(this._moveHandle);

			this._moveHandle.hide();

			this.create(); // event listeners

			this.onMove = this.onMove.bind(this);
			this.onHover = this.onHover.bind(this);
			this.addEventListeners();
		}

		addEventListeners() {
			this._container.addEventListener('wheel', this.onMove);

			this._line.addEventListener('mouseenter', this.onHover);

			this._line.addEventListener('mouseleave', this.onHover);

			this._label.addEventListener('mouseenter', this.onHover);

			this._label.addEventListener('mouseleave', this.onHover);
		}

		removeEventListeners() {
			this._container.removeEventListener('wheel', this.onMove);

			this._line.removeEventListener('mouseenter', this.onHover);

			this._line.removeEventListener('mouseleave', this.onHover);

			this._label.removeEventListener('mouseenter', this.onHover);

			this._label.removeEventListener('mouseleave', this.onHover);
		}

		onHover(evt) {
			if (evt) {
				this.hoverDom(evt);
			}

			this._hovered = this._handle.hovered || this._domHovered;
			this._container.style.cursor = this._hovered ? 'pointer' : 'default';
		}

		hoverDom(evt) {
			this._domHovered = evt.type === 'mouseenter';
		}

		onStart(evt) {
			this._moveHandle.onMove(evt, true);

			this._handle.onStart(evt);

			this._active = this._handle.active || this._domHovered;

			if (this._domHovered) {
				this._controls.enabled = false;
			}

			this.update();
		}

		onMove(evt) {
			if (this._active) {
				const prevPosition = this._moveHandle.worldPosition.clone();

				this._moveHandle.onMove(evt, true);

				const shift = this._moveHandle.worldPosition.clone().sub(prevPosition);

				if (!this.isCorrectRegion(shift)) {
					this._moveHandle.worldPosition.copy(prevPosition);

					return;
				}

				if (!this._handle.active) {
					this._handle.worldPosition.add(shift);
				}

				this._dragged = true;
			} else {
				this.onHover(null);
			}

			this._handle.onMove(evt);

			this.update();
		}

		onEnd() {
			this._handle.onEnd();

			if (!this._dragged && this._active && this._initialized) {
				this._selected = !this._selected; // change state if there was no dragging

				this._handle.selected = this._selected;
			}

			this._initialized = true;
			this._active = false;
			this._dragged = false;
			this.update();
		}

		isCorrectRegion(shift) {
			const region = this.getRegionByXY(this._regions, CoreUtils.worldToData(this._params.lps2IJK, this._handle.worldPosition.clone().add(shift)));
			return region !== null && region === this._initialRegion && this._regions[region].unitsY === 'cm/sec';
		}

		create() {
			this.createDOM();
		}

		createDOM() {
			this._line = document.createElement('div');
			this._line.className = 'widgets-dashline';

			this._container.appendChild(this._line);

			this._label = document.createElement('div');
			this._label.className = 'widgets-label'; // Measurements

			let measurementsContainer = document.createElement('div'); // Peak Velocity

			let pvContainer = document.createElement('div');
			pvContainer.className = 'peakVelocity';
			measurementsContainer.appendChild(pvContainer); // Gradient

			let gradientContainer = document.createElement('div');
			gradientContainer.className = 'gradient';
			measurementsContainer.appendChild(gradientContainer);

			this._label.appendChild(measurementsContainer);

			this._container.appendChild(this._label);

			this.updateDOMColor();
		}

		update() {
			this.updateColor();

			this._handle.update();

			this._worldPosition.copy(this._handle.worldPosition);

			this.updateDOM();
		}

		updateDOM() {
			this.updateDOMColor();
			const point = CoreUtils.worldToData(this._params.lps2IJK, this._worldPosition);

			const region = this._regions[this.getRegionByXY(this._regions, point)];

			const usPosition = this.getPointInRegion(region, point);
			this._velocity = Math.abs(usPosition.y / 100);
			this._gradient = 4 * Math.pow(this._velocity, 2); // content

			this._label.querySelector('.peakVelocity').innerHTML = `${this._velocity.toFixed(2)} m/s`;
			this._label.querySelector('.gradient').innerHTML = `${this._gradient.toFixed(2)} mmhg`; // position

			const transform = this.adjustLabelTransform(this._label, this._handle.screenPosition, true);
			this._line.style.transform = `translate3D(${transform.x - (point.x - region.x0) * this._camera.zoom}px, ${transform.y}px, 0)`;
			this._line.style.width = (region.x1 - region.x0) * this._camera.zoom + 'px';
			this._label.style.transform = `translate3D(${transform.x + 10}px, ${transform.y + 10}px, 0)`;
		}

		updateDOMColor() {
			this._line.style.backgroundColor = this._color;
			this._label.style.borderColor = this._color;
		}

		hideDOM() {
			this._line.style.display = 'none';
			this._label.style.display = 'none';

			this._handle.hideDOM();
		}

		showDOM() {
			this._line.style.display = '';
			this._label.style.display = '';

			this._handle.showDOM();
		}

		free() {
			this.removeEventListeners();
			this.remove(this._handle);

			this._handle.free();

			this._handle = null;
			this.remove(this._moveHandle);

			this._moveHandle.free();

			this._moveHandle = null;

			this._container.removeChild(this._line);

			this._container.removeChild(this._label);

			super.free();
		}

		getMeasurements() {
			return {
				velocity: this._velocity,
				gradient: this._gradient
			};
		}

		get targetMesh() {
			return this._targetMesh;
		}

		set targetMesh(targetMesh) {
			this._targetMesh = targetMesh;
			this._handle.targetMesh = targetMesh;
			this._moveHandle.targetMesh = targetMesh;
			this.update();
		}

		get worldPosition() {
			return this._worldPosition;
		}

		set worldPosition(worldPosition) {
			this._handle.worldPosition.copy(worldPosition);

			this._moveHandle.worldPosition.copy(worldPosition);

			this._worldPosition.copy(worldPosition);

			this.update();
		}

		get active() {
			return this._active;
		}

		set active(active) {
			this._active = active;
			this._controls.enabled = !this._active;
			this.update();
		}

	}

	/**
	 * @module widgets/pressureHalfTime
	 */

	class widgetsPressureHalfTime extends widgetsBase {
		constructor(targetMesh, controls, params = {}) {
			super(targetMesh, controls, params);
			this._widgetType = 'PressureHalfTime'; // incoming parameters (required: lps2IJK, worldPosition)

			this._regions = params.ultrasoundRegions || []; // required

			if (this._regions.length < 1) {
				throw new Error('Ultrasound regions should not be empty!');
			} // outgoing values


			this._vMax = null; // Maximum Velocity (Vmax)

			this._gMax = null; // Maximum Gradient (Gmax)

			this._pht = null; // Pressure Half Time (PHT)

			this._mva = null; // Mitral Valve Area (MVA)

			this._dt = null; // Deceleration Time (DT)

			this._ds = null; // Deceleration Slope (DS)

			this._domHovered = false;
			this._initialRegion = this.getRegionByXY(this._regions, CoreUtils.worldToData(params.lps2IJK, params.worldPosition));

			if (this._initialRegion === null) {
				throw new Error('Invalid initial UltraSound region!');
			} // mesh stuff


			this._material = null;
			this._geometry = null;
			this._mesh = null; // dom stuff

			this._line = null;
			this._label = null; // add handles

			this._handles = [];
			const WidgetsHandle = widgetsHandle();
			let handle;

			for (let i = 0; i < 2; i++) {
				handle = new WidgetsHandle(targetMesh, controls, params);
				this.add(handle);

				this._handles.push(handle);
			}

			this._handles[1].active = true;
			this._handles[1].tracking = true;
			this._moveHandle = new WidgetsHandle(targetMesh, controls, params);
			this.add(this._moveHandle);

			this._handles.push(this._moveHandle);

			this._moveHandle.hide();

			this.create();
			this.onMove = this.onMove.bind(this);
			this.onHover = this.onHover.bind(this);
			this.addEventListeners();
		}

		addEventListeners() {
			this._container.addEventListener('wheel', this.onMove);

			this._line.addEventListener('mouseenter', this.onHover);

			this._line.addEventListener('mouseleave', this.onHover);

			this._label.addEventListener('mouseenter', this.onHover);

			this._label.addEventListener('mouseleave', this.onHover);
		}

		removeEventListeners() {
			this._container.removeEventListener('wheel', this.onMove);

			this._line.removeEventListener('mouseenter', this.onHover);

			this._line.removeEventListener('mouseleave', this.onHover);

			this._label.removeEventListener('mouseenter', this.onHover);

			this._label.removeEventListener('mouseleave', this.onHover);
		}

		onHover(evt) {
			if (evt) {
				this.hoverDom(evt);
			}

			this.hoverMesh();
			this._hovered = this._handles[0].hovered || this._handles[1].hovered || this._domHovered;
			this._container.style.cursor = this._hovered ? 'pointer' : 'default';
		}

		hoverMesh() {// check raycast intersection, do we want to hover on mesh or just css?
		}

		hoverDom(evt) {
			this._domHovered = evt.type === 'mouseenter';
		}

		onStart(evt) {
			this._moveHandle.onMove(evt, true);

			this._handles[0].onStart(evt);

			this._handles[1].onStart(evt);

			this._active = this._handles[0].active || this._handles[1].active || this._domHovered;

			if (this._domHovered) {
				this._controls.enabled = false;
			}

			this.update();
		}

		onMove(evt) {
			if (this._active) {
				const prevPosition = this._moveHandle.worldPosition.clone();

				this._moveHandle.onMove(evt, true);

				const shift = this._moveHandle.worldPosition.clone().sub(prevPosition);

				if (!this.isCorrectRegion(shift)) {
					this._moveHandle.worldPosition.copy(prevPosition);

					return;
				}

				if (!this._handles[0].active && !this._handles[1].active) {
					this._handles.slice(0, -1).forEach(handle => {
						handle.worldPosition.add(shift);
					});
				}

				this._dragged = true;
			} else {
				this.onHover(null);
			}

			this._handles[0].onMove(evt);

			this._handles[1].onMove(evt);

			this.update();
		}

		onEnd() {
			this._handles[0].onEnd(); // First Handle


			if (this._handles[1].tracking && this._handles[0].screenPosition.distanceTo(this._handles[1].screenPosition) < 10) {
				return;
			}

			if (!this._dragged && this._active && !this._handles[1].tracking) {
				this._selected = !this._selected; // change state if there was no dragging

				this._handles[0].selected = this._selected;
			} // Second Handle


			if (this._dragged || !this._handles[1].tracking) {
				this._handles[1].tracking = false;

				this._handles[1].onEnd();
			} else {
				this._handles[1].tracking = false;
			}

			this._handles[1].selected = this._selected;
			this._active = this._handles[0].active || this._handles[1].active;
			this._dragged = false;
			this.update();
		}

		isCorrectRegion(shift) {
			const inActive = !(this._handles[0].active || this._handles[1].active);
			let isCorrect = true;

			if (this._handles[0].active || inActive) {
				isCorrect = isCorrect && this.checkHandle(0, shift);
			}

			if (this._handles[1].active || inActive) {
				isCorrect = isCorrect && this.checkHandle(1, shift);
			}

			return isCorrect;
		}

		checkHandle(index, shift) {
			const region = this.getRegionByXY(this._regions, CoreUtils.worldToData(this._params.lps2IJK, this._handles[index].worldPosition.clone().add(shift)));
			return region !== null && region === this._initialRegion && this._regions[region].unitsY === 'cm/sec';
		}

		create() {
			this.createMesh();
			this.createDOM();
		}

		createMesh() {
			// geometry
			// this._geometry = new three.Geometry();
			// this._geometry.vertices = [this._handles[0].worldPosition, this._handles[1].worldPosition];
			this._geometry = new BufferGeometry();
			const positions = new Float32Array(2 * 3);

			this._geometry.setAttribute('position', new BufferAttribute(positions, 3));

			let index = 0;
			positions[index++] = this._handles[0].worldPosition.x;
			positions[index++] = this._handles[0].worldPosition.y;
			positions[index++] = this._handles[0].worldPosition.z;
			positions[index++] = this._handles[1].worldPosition.x;
			positions[index++] = this._handles[1].worldPosition.y;
			positions[index++] = this._handles[1].worldPosition.z; // material

			this._material = new three.LineBasicMaterial();
			this.updateMeshColor(); // mesh

			this._mesh = new three.Line(this._geometry, this._material);
			this._mesh.visible = true;
			this.add(this._mesh);
		}

		createDOM() {
			this._line = document.createElement('div');
			this._line.className = 'widgets-line';

			this._container.appendChild(this._line);

			this._label = document.createElement('div');
			this._label.className = 'widgets-label';
			const measurementsContainer = document.createElement('div');
			['vmax', 'gmax', 'pht', 'mva', 'dt', 'ds'].forEach(name => {
				const div = document.createElement('div');
				div.className = name;
				measurementsContainer.appendChild(div);
			});

			this._label.appendChild(measurementsContainer);

			this._container.appendChild(this._label);

			this.updateDOMColor();
		}

		hideDOM() {
			this._line.style.display = 'none';
			this._label.style.display = 'none';

			this._handles.forEach(elem => elem.hideDOM());
		}

		showDOM() {
			this._line.style.display = '';
			this._label.style.display = '';

			this._handles[0].showDOM();

			this._handles[1].showDOM();
		}

		update() {
			this.updateColor();

			this._handles[0].update();

			this._handles[1].update();

			this.updateValues();
			this.updateMeshColor();
			this.updateMeshPosition();
			this.updateDOM();
		}

		updateValues() {
			const usPosition0 = this.getUsPoint(this._regions, CoreUtils.worldToData(this._params.lps2IJK, this._handles[0].worldPosition));
			const usPosition1 = this.getUsPoint(this._regions, CoreUtils.worldToData(this._params.lps2IJK, this._handles[1].worldPosition));
			const velocity0 = Math.abs(usPosition0.y / 100);
			const velocity1 = Math.abs(usPosition1.y / 100);
			const time0 = Math.abs(usPosition0.x);
			const time1 = Math.abs(usPosition1.x);
			const vMaxTime = this._vMax === velocity0 ? time0 : time1;
			this._vMax = Math.max(velocity0, velocity1);
			this._gMax = 4 * Math.pow(this._vMax, 2);
			const phtVelocity = this._vMax / Math.sqrt(2);
			const phtKoeff = (velocity0 - phtVelocity) / (velocity1 - phtVelocity);
			const dtKoeff = velocity0 / velocity1;
			this._pht = phtKoeff === 1 ? Number.POSITIVE_INFINITY : Math.abs(vMaxTime - (time0 - phtKoeff * time1) / (1 - phtKoeff)) * 1000;
			this._mva = 220 / this._pht;
			this._dt = dtKoeff === 1 ? Number.POSITIVE_INFINITY : Math.abs(vMaxTime - (time0 - dtKoeff * time1) / (1 - dtKoeff)) * 1000;
			this._ds = this._dt === 0 ? Number.POSITIVE_INFINITY : this._vMax / this._dt * 1000;
		}

		updateMeshColor() {
			if (this._material) {
				this._material.color.set(this._color);
			}
		}

		updateMeshPosition() {
			if (this._geometry) {
				this._geometry.verticesNeedUpdate = true;
			}
		}

		updateDOM() {
			this.updateDOMColor(); // update line

			const lineData = this.getLineData(this._handles[0].screenPosition, this._handles[1].screenPosition);
			this._line.style.transform = `translate3D(${lineData.transformX}px, ${lineData.transformY}px, 0)
								rotate(${lineData.transformAngle}rad)`;
			this._line.style.width = lineData.length + 'px'; // update label

			this._label.querySelector('.vmax').innerHTML = `Vmax: ${this._vMax.toFixed(2)} m/s`;
			this._label.querySelector('.gmax').innerHTML = `Gmax: ${this._gMax.toFixed(2)} mmhg`;
			this._label.querySelector('.pht').innerHTML = `PHT: ${this._pht.toFixed(1)} ms`;
			this._label.querySelector('.mva').innerHTML = `MVA: ${this._mva.toFixed(2)} cm²`;
			this._label.querySelector('.dt').innerHTML = `DT: ${this._dt.toFixed(1)} ms`;
			this._label.querySelector('.ds').innerHTML = `DS: ${this._ds.toFixed(2)} m/s²`;
			let angle = Math.abs(lineData.transformAngle);

			if (angle > Math.PI / 2) {
				angle = Math.PI - angle;
			}

			const labelPadding = Math.tan(angle) < this._label.offsetHeight / this._label.offsetWidth ? this._label.offsetWidth / 2 / Math.cos(angle) + 15 // 5px for each handle + padding
			: this._label.offsetHeight / 2 / Math.cos(Math.PI / 2 - angle) + 15;
			const paddingVector = lineData.line.normalize().multiplyScalar(labelPadding);
			const paddingPoint = lineData.length > labelPadding * 2 ? this._handles[1].screenPosition.clone().sub(paddingVector) : this._handles[1].screenPosition.clone().add(paddingVector);
			const transform = this.adjustLabelTransform(this._label, paddingPoint);
			this._label.style.transform = `translate3D(${transform.x}px, ${transform.y}px, 0)`;
		}

		updateDOMColor() {
			this._line.style.backgroundColor = this._color;
			this._label.style.borderColor = this._color;
		}

		free() {
			this.removeEventListeners();

			this._handles.forEach(h => {
				this.remove(h);
				h.free();
			});

			this._handles = [];

			this._container.removeChild(this._line);

			this._container.removeChild(this._label); // mesh, geometry, material


			this.remove(this._mesh);

			this._mesh.geometry.dispose();

			this._mesh.geometry = null;

			this._mesh.material.dispose();

			this._mesh.material = null;
			this._mesh = null;

			this._geometry.dispose();

			this._geometry = null;
			this._material.vertexShader = null;
			this._material.fragmentShader = null;
			this._material.uniforms = null;

			this._material.dispose();

			this._material = null;
			super.free();
		}

		getMeasurements() {
			return {
				vMax: this._vMax,
				gMax: this._gMax,
				pht: this._pht,
				mva: this._mva,
				dt: this._dt,
				ds: this._ds
			};
		}

		get targetMesh() {
			return this._targetMesh;
		}

		set targetMesh(targetMesh) {
			this._targetMesh = targetMesh;

			this._handles.forEach(elem => elem.targetMesh = targetMesh);

			this.update();
		}

		get worldPosition() {
			return this._worldPosition;
		}

		set worldPosition(worldPosition) {
			this._handles[0].worldPosition.copy(worldPosition);

			this._handles[1].worldPosition.copy(worldPosition);

			this._worldPosition.copy(worldPosition);

			this.update();
		}

	}

	/**
	 * @module widgets/polygon
	 */

	class widgetsPolygon extends widgetsBase {
		constructor(targetMesh, controls, params = {}) {
			super(targetMesh, controls, params);
			this._widgetType = 'Polygon'; // incoming parameters (optional: frameIndex, worldPosition)

			this._stack = params.stack; // required

			this._calibrationFactor = params.calibrationFactor || null; // outgoing values

			this._area = null;
			this._units = !this._calibrationFactor && !params.stack.frame[params.frameIndex].pixelSpacing ? 'units' : 'cm²';
			this._initialized = false; // set to true onDblClick if number of handles > 2

			this._newHandleRequired = true; // should handle be created onMove?

			this._moving = false;
			this._domHovered = false; // mesh stuff

			this._material = null;
			this._geometry = null;
			this._mesh = null; // dom stuff

			this._lines = [];
			this._label = null; // add handles

			this._handles = [];
			const WidgetsHandle = widgetsHandle();
			let handle = new WidgetsHandle(targetMesh, controls, params);
			this.add(handle);

			this._handles.push(handle);

			this._moveHandle = new WidgetsHandle(targetMesh, controls, params);
			this.add(this._moveHandle);

			this._moveHandle.hide();

			this.onDoubleClick = this.onDoubleClick.bind(this);
			this.onMove = this.onMove.bind(this);
			this.onHover = this.onHover.bind(this);
			this.create();
			this.addEventListeners();
		}

		addEventListeners() {
			this._container.addEventListener('dblclick', this.onDoubleClick);

			this._container.addEventListener('wheel', this.onMove);

			this._label.addEventListener('mouseenter', this.onHover);

			this._label.addEventListener('mouseleave', this.onHover);
		}

		removeEventListeners() {
			this._container.removeEventListener('dblclick', this.onDoubleClick);

			this._container.removeEventListener('wheel', this.onMove);

			this._label.removeEventListener('mouseenter', this.onHover);

			this._label.removeEventListener('mouseleave', this.onHover);
		}

		onHover(evt) {
			if (evt) {
				this.hoverDom(evt);
			}

			this.hoverMesh();
			let hovered = false;

			this._handles.forEach(elem => hovered = hovered || elem.hovered);

			this._hovered = hovered || this._domHovered;
			this._container.style.cursor = this._hovered ? 'pointer' : 'default';
		}

		hoverMesh() {// check raycast intersection, if we want to hover on mesh instead of just css
		}

		hoverDom(evt) {
			this._domHovered = evt.type === 'mouseenter';
		}

		onStart(evt) {
			let active = false;

			this._handles.forEach(elem => {
				elem.onStart(evt);
				active = active || elem.active;
			});

			if (!this._initialized) {
				return;
			}

			this._moveHandle.onMove(evt, true);

			this._active = active || this._domHovered;

			if (this._domHovered && this._initialized) {
				this._moving = true;
				this._controls.enabled = false;
			}

			this.update();
		}

		onMove(evt) {
			let hovered = false;

			if (this.active) {
				this._dragged = true;

				if (this._newHandleRequired && !this._initialized) {
					this._handles[this._handles.length - 1].hovered = false;
					this._handles[this._handles.length - 1].active = false;
					this._handles[this._handles.length - 1].tracking = false;
					const WidgetsHandle = widgetsHandle();
					let handle = new WidgetsHandle(this._targetMesh, this._controls, this._params);
					handle.hovered = true;
					handle.active = true;
					handle.tracking = true;
					this.add(handle);

					this._handles.push(handle);

					this.createLine();
					this._newHandleRequired = false;
				} else {
					const prevPosition = this._moveHandle.worldPosition.clone();

					this._moveHandle.onMove(evt, true);

					if (this._mesh) {
						this.remove(this._mesh);
					}

					this.updateDOMContent(true);

					if (this._moving) {
						this._handles.forEach(handle => {
							handle.worldPosition.add(this._moveHandle.worldPosition.clone().sub(prevPosition));
						});
					}
				}
			}

			this._handles.forEach(elem => {
				elem.onMove(evt);
				hovered = hovered || elem.hovered;
			});

			this._hovered = hovered || this._domHovered;
			this._container.style.cursor = this._hovered ? 'pointer' : 'default';
			this.update();
		}

		onEnd() {
			let numHandles = this._handles.length;
			let active = false;

			if (!this._initialized && numHandles > 1 && this._handles[numHandles - 2].screenPosition.distanceTo(this._handles[numHandles - 1].screenPosition) < 10) {
				return;
			}

			this._handles.forEach(elem => {
				elem.onEnd();
				active = active || elem.active;
			});

			if (!this._initialized) {
				this._newHandleRequired = true;
				return;
			}

			if (this._dragged) {
				this.updateMesh();
				this.updateDOMContent();
			}

			if (!this._dragged && this._active) {
				this._selected = !this._selected; // change state if there was no dragging

				this._handles.forEach(elem => elem.selected = this._selected);
			}

			this._active = active || this._handles[numHandles - 1].active;
			this._dragged = false;
			this._moving = false;
			this.update();
		}

		onDoubleClick() {
			let numHandles = this._handles.length;

			if (numHandles < 3 || this._initialized || numHandles > 1 && this._handles[numHandles - 2].screenPosition.distanceTo(this._handles[numHandles - 1].screenPosition) < 10) {
				return;
			}

			this._handles[numHandles - 1].tracking = false;

			this._handles.forEach(elem => elem.onEnd());

			this._active = false;
			this._dragged = false;
			this._moving = false;
			this._initialized = true;
			this.updateMesh();
			this.updateDOMContent();
			this.update();
		}

		create() {
			this.createMaterial();
			this.createDOM();
		}

		createMaterial() {
			this._material = new three.MeshBasicMaterial({
				side: three.DoubleSide
			});
			this._material.transparent = true;
			this._material.opacity = 0.2;
		}

		createDOM() {
			this.createLine();
			this._label = document.createElement('div');
			this._label.className = 'widgets-label'; // measurements

			const measurementsContainer = document.createElement('div'); // Mean / SD

			let meanSDContainer = document.createElement('div');
			meanSDContainer.className = 'mean-sd';
			measurementsContainer.appendChild(meanSDContainer); // Max / Min

			let maxMinContainer = document.createElement('div');
			maxMinContainer.className = 'max-min';
			measurementsContainer.appendChild(maxMinContainer); // Area

			let areaContainer = document.createElement('div');
			areaContainer.className = 'area';
			measurementsContainer.appendChild(areaContainer);

			this._label.appendChild(measurementsContainer);

			this._container.appendChild(this._label);

			this.updateDOMColor();
		}

		createLine() {
			const line = document.createElement('div');
			line.className = 'widgets-line';
			line.addEventListener('mouseenter', this.onHover);
			line.addEventListener('mouseleave', this.onHover);

			this._lines.push(line);

			this._container.appendChild(line);
		}

		hideDOM() {
			this._handles.forEach(elem => elem.hideDOM());

			this._lines.forEach(elem => elem.style.display = 'none');

			this._label.style.display = 'none';
		}

		showDOM() {
			this._handles.forEach(elem => elem.showDOM());

			this._lines.forEach(elem => elem.style.display = '');

			this._label.style.display = '';
		}

		update() {
			this.updateColor(); // update handles

			this._handles.forEach(elem => elem.update()); // mesh stuff


			this.updateMeshColor();
			this.updateMeshPosition(); // DOM stuff

			this.updateDOMColor();
			this.updateDOMPosition();
		}

		updateMesh() {
			if (this._mesh) {
				this.remove(this._mesh);
			}

			let points = [];

			this._handles.forEach(elem => points.push(elem.worldPosition));

			let center = CoreUtils.centerOfMass(points); // direction from first point to center

			let referenceDirection = new three.Vector3().subVectors(points[0], center).normalize();
			let direction = new three.Vector3().crossVectors(new three.Vector3().subVectors(points[0], center), // side 1
			new three.Vector3().subVectors(points[1], center) // side 2
			);
			let base = new three.Vector3().crossVectors(referenceDirection, direction).normalize();
			let orderedpoints = []; // other lines // if inter, return location + angle

			for (let j = 0; j < points.length; j++) {
				let point = new three.Vector3(points[j].x, points[j].y, points[j].z);
				point.direction = new three.Vector3().subVectors(points[j], center).normalize();
				let x = referenceDirection.dot(point.direction);
				let y = base.dot(point.direction);
				point.xy = {
					x,
					y
				};
				point.angle = Math.atan2(y, x) * (180 / Math.PI);
				orderedpoints.push(point);
			} // override to catch console.warn "THREE.ShapeUtils: Unable to triangulate polygon! in triangulate()"


			this._shapeWarn = false;
			const oldWarn = console.warn;

			console.warn = function (...rest) {
				if (rest[0] === 'THREE.ShapeUtils: Unable to triangulate polygon! in triangulate()') {
					this._shapeWarn = true;
				}

				return oldWarn.apply(console, rest);
			}.bind(this); // create the shape


			let shape = new three.Shape(); // move to first point!

			shape.moveTo(orderedpoints[0].xy.x, orderedpoints[0].xy.y); // loop through all points!

			for (let l = 1; l < orderedpoints.length; l++) {
				// project each on plane!
				shape.lineTo(orderedpoints[l].xy.x, orderedpoints[l].xy.y);
			} // close the shape!


			shape.lineTo(orderedpoints[0].xy.x, orderedpoints[0].xy.y);
			this._geometry = new three.ShapeGeometry(shape);
			console.warn = oldWarn;
			this._geometry.vertices = orderedpoints;
			this._geometry.verticesNeedUpdate = true;
			this._geometry.elementsNeedUpdate = true;
			this.updateMeshColor();
			this._mesh = new three.Mesh(this._geometry, this._material);
			this._mesh.visible = true;
			this.add(this._mesh);
		}

		updateMeshColor() {
			if (this._material) {
				this._material.color.set(this._color);
			}
		}

		updateMeshPosition() {
			if (this._geometry) {
				this._geometry.verticesNeedUpdate = true;
			}
		}

		updateDOMColor() {
			this._lines.forEach(elem => elem.style.backgroundColor = this._color);

			this._label.style.borderColor = this._color;
		}

		updateDOMContent(clear) {
			const meanSDContainer = this._label.querySelector('.mean-sd');

			const maxMinContainer = this._label.querySelector('.max-min');

			const areaContainer = this._label.querySelector('.area');

			if (clear) {
				meanSDContainer.innerHTML = '';
				maxMinContainer.innerHTML = '';
				areaContainer.innerHTML = '';
				return;
			}

			const regions = this._stack.frame[this._params.frameIndex].ultrasoundRegions || [];
			this._area = CoreUtils.getGeometryArea(this._geometry); // this.getArea result is changed on dragging

			if (this._calibrationFactor) {
				this._area *= Math.pow(this._calibrationFactor, 2);
			} else if (regions && regions.length > 0 && this._stack.lps2IJK) {
				let same = true;
				let cRegion;
				let pRegion;

				this._handles.forEach(elem => {
					cRegion = this.getRegionByXY(regions, CoreUtils.worldToData(this._stack.lps2IJK, elem.worldPosition));

					if (cRegion === null || regions[cRegion].unitsX !== 'cm' || pRegion !== undefined && pRegion !== cRegion) {
						same = false;
					}

					pRegion = cRegion;
				});

				if (same) {
					this._area *= Math.pow(regions[cRegion].deltaX, 2);
					this._units = 'cm²';
				} else if (this._stack.frame[this._params.frameIndex].pixelSpacing) {
					this._area /= 100;
					this._units = 'cm²';
				} else {
					this._units = 'units';
				}
			} else if (this._units === 'cm²') {
				this._area /= 100;
			}

			let title = this._units === 'units' ? 'Calibration is required to display the area in cm². ' : '';

			if (this._shapeWarn) {
				title += 'Values may be incorrect due to triangulation error.';
			}

			if (title !== '' && !this._label.hasAttribute('title')) {
				this._label.setAttribute('title', title);

				this._label.style.color = this._colors.error;
			} else if (title === '' && this._label.hasAttribute('title')) {
				this._label.removeAttribute('title');

				this._label.style.color = this._colors.text;
			}

			const roi = CoreUtils.getRoI(this._mesh, this._camera, this._stack);

			if (roi !== null) {
				meanSDContainer.innerHTML = `Mean: ${roi.mean.toFixed(1)} / SD: ${roi.sd.toFixed(1)}`;
				maxMinContainer.innerHTML = `Max: ${roi.max.toFixed()} / Min: ${roi.min.toFixed()}`;
			} else {
				meanSDContainer.innerHTML = '';
				maxMinContainer.innerHTML = '';
			}

			areaContainer.innerHTML = `Area: ${this._area.toFixed(2)} ${this._units}`;
		}

		updateDOMPosition() {
			// update lines and get coordinates of lowest handle
			let labelPosition = null;

			this._lines.forEach((elem, ind) => {
				const lineData = this.getLineData(this._handles[ind].screenPosition, this._handles[ind + 1 === this._handles.length ? 0 : ind + 1].screenPosition);
				elem.style.transform = `translate3D(${lineData.transformX}px, ${lineData.transformY}px, 0)
										rotate(${lineData.transformAngle}rad)`;
				elem.style.width = lineData.length + 'px';

				if (labelPosition === null || labelPosition.y < this._handles[ind].screenPosition.y) {
					labelPosition = this._handles[ind].screenPosition.clone();
				}
			});

			if (!this._initialized) {
				return;
			} // update label


			labelPosition.y += 15 + this._label.offsetHeight / 2;
			labelPosition = this.adjustLabelTransform(this._label, labelPosition);
			this._label.style.transform = `translate3D(${labelPosition.x}px, ${labelPosition.y}px, 0)`;
		}

		free() {
			this.removeEventListeners();

			this._handles.forEach(h => {
				this.remove(h);
				h.free();
			});

			this._handles = [];
			this.remove(this._moveHandle);

			this._moveHandle.free();

			this._moveHandle = null;

			this._lines.forEach(elem => {
				elem.removeEventListener('mouseenter', this.onHover);
				elem.removeEventListener('mouseleave', this.onHover);

				this._container.removeChild(elem);
			});

			this._lines = [];

			this._container.removeChild(this._label); // mesh, geometry, material


			if (this._mesh) {
				this.remove(this._mesh);

				this._mesh.geometry.dispose();

				this._mesh.geometry = null;

				this._mesh.material.dispose();

				this._mesh.material = null;
				this._mesh = null;
			}

			if (this._geometry) {
				this._geometry.dispose();

				this._geometry = null;
			}

			this._material.vertexShader = null;
			this._material.fragmentShader = null;
			this._material.uniforms = null;

			this._material.dispose();

			this._material = null;
			this._stack = null;
			super.free();
		}

		getMeasurements() {
			return {
				area: this._area,
				units: this._units
			};
		}

		get targetMesh() {
			return this._targetMesh;
		}

		set targetMesh(targetMesh) {
			this._targetMesh = targetMesh;

			this._handles.forEach(elem => elem.targetMesh = targetMesh);

			this._moveHandle.targetMesh = targetMesh;
			this.update();
		}

		get worldPosition() {
			return this._worldPosition;
		}

		set worldPosition(worldPosition) {
			this._handles.forEach(elem => elem.worldPosition.copy(worldPosition));

			this._worldPosition.copy(worldPosition);

			this.update();
		}

		get calibrationFactor() {
			return this._calibrationFactor;
		}

		set calibrationFactor(calibrationFactor) {
			this._calibrationFactor = calibrationFactor;
			this._units = 'cm²';
			this.update();
		}

	}

	/**
	 * @module widgets/rectangle
	 */

	class widgetsRectangle extends widgetsBase {
		constructor(targetMesh, controls, params = {}) {
			super(targetMesh, controls, params);
			this._widgetType = 'Rectangle'; // incoming parameters (optional: frameIndex, worldPosition)

			this._stack = params.stack; // required

			this._calibrationFactor = params.calibrationFactor || null; // outgoing values

			this._area = null;
			this._units = !this._calibrationFactor && !params.stack.frame[params.frameIndex].pixelSpacing ? 'units' : 'cm²';
			this._moving = false;
			this._domHovered = false; // mesh stuff

			this._material = null;
			this._geometry = null;
			this._mesh = null; // dom stuff

			this._rectangle = null;
			this._label = null; // add handles

			this._handles = [];
			const WidgetsHandle = widgetsHandle();
			let handle;

			for (let i = 0; i < 2; i++) {
				handle = new WidgetsHandle(targetMesh, controls, params);
				this.add(handle);

				this._handles.push(handle);
			}

			this._handles[1].active = true;
			this._handles[1].tracking = true;
			this._moveHandle = new WidgetsHandle(targetMesh, controls, params);
			this.add(this._moveHandle);

			this._handles.push(this._moveHandle);

			this._moveHandle.hide();

			this.create();
			this.onMove = this.onMove.bind(this);
			this.onHover = this.onHover.bind(this);
			this.addEventListeners();
		}

		addEventListeners() {
			this._container.addEventListener('wheel', this.onMove);

			this._rectangle.addEventListener('mouseenter', this.onHover);

			this._rectangle.addEventListener('mouseleave', this.onHover);

			this._label.addEventListener('mouseenter', this.onHover);

			this._label.addEventListener('mouseleave', this.onHover);
		}

		removeEventListeners() {
			this._container.removeEventListener('wheel', this.onMove);

			this._rectangle.removeEventListener('mouseenter', this.onHover);

			this._rectangle.removeEventListener('mouseleave', this.onHover);

			this._label.removeEventListener('mouseenter', this.onHover);

			this._label.removeEventListener('mouseleave', this.onHover);
		}

		onHover(evt) {
			if (evt) {
				this.hoverDom(evt);
			}

			this.hoverMesh();
			this._hovered = this._handles[0].hovered || this._handles[1].hovered || this._domHovered;
			this._container.style.cursor = this._hovered ? 'pointer' : 'default';
		}

		hoverMesh() {// check raycast intersection, if we want to hover on mesh instead of just css
		}

		hoverDom(evt) {
			this._domHovered = evt.type === 'mouseenter';
		}

		onStart(evt) {
			this._moveHandle.onMove(evt, true);

			this._handles[0].onStart(evt);

			this._handles[1].onStart(evt);

			this._active = this._handles[0].active || this._handles[1].active || this._domHovered;

			if (this._domHovered && !this._handles[1].tracking) {
				this._moving = true;
				this._controls.enabled = false;
			}

			this.update();
		}

		onMove(evt) {
			if (this._active) {
				const prevPosition = this._moveHandle.worldPosition.clone();

				this._dragged = true;

				this._moveHandle.onMove(evt, true);

				if (this._moving) {
					this._handles.slice(0, -1).forEach(handle => {
						handle.worldPosition.add(this._moveHandle.worldPosition.clone().sub(prevPosition));
					});
				}

				this.updateRoI(true);
			} else {
				this.onHover(null);
			}

			this._handles[0].onMove(evt);

			this._handles[1].onMove(evt);

			this.update();
		}

		onEnd() {
			this._handles[0].onEnd(); // First Handle


			if (this._handles[1].tracking && this._handles[0].screenPosition.distanceTo(this._handles[1].screenPosition) < 10) {
				return;
			}

			if (!this._dragged && this._active && !this._handles[1].tracking) {
				this._selected = !this._selected; // change state if there was no dragging

				this._handles[0].selected = this._selected;
			} // Second Handle


			if (this._dragged || !this._handles[1].tracking) {
				this._handles[1].tracking = false;

				this._handles[1].onEnd();
			} else {
				this._handles[1].tracking = false;
			}

			this._handles[1].selected = this._selected;
			this._active = this._handles[0].active || this._handles[1].active;
			this._dragged = false;
			this._moving = false;
			this.updateRoI(); // TODO: if (this._dragged || !this._initialized)

			this.update();
		}

		hideDOM() {
			this._handles.forEach(elem => elem.hideDOM());

			this._rectangle.style.display = 'none';
			this._label.style.display = 'none';
		}

		showDOM() {
			this._handles[0].showDOM();

			this._handles[1].showDOM();

			this._rectangle.style.display = '';
			this._label.style.display = '';
		}

		create() {
			this.createMesh();
			this.createDOM();
		}

		createMesh() {
			this._geometry = new three.PlaneGeometry(1, 1);
			this._material = new three.MeshBasicMaterial({
				side: three.DoubleSide
			});
			this._material.transparent = true;
			this._material.opacity = 0.2;
			this.updateMeshColor();
			this._mesh = new three.Mesh(this._geometry, this._material);
			this._mesh.visible = true;
			this.add(this._mesh);
		}

		createDOM() {
			this._rectangle = document.createElement('div');
			this._rectangle.className = 'widgets-rectangle';

			this._container.appendChild(this._rectangle);

			this._label = document.createElement('div');
			this._label.className = 'widgets-label'; // measurements

			const measurementsContainer = document.createElement('div'); // Mean / SD

			let meanSDContainer = document.createElement('div');
			meanSDContainer.className = 'mean-sd';
			measurementsContainer.appendChild(meanSDContainer); // Max / Min

			let maxMinContainer = document.createElement('div');
			maxMinContainer.className = 'max-min';
			measurementsContainer.appendChild(maxMinContainer); // Area

			let areaContainer = document.createElement('div');
			areaContainer.className = 'area';
			measurementsContainer.appendChild(areaContainer);

			this._label.appendChild(measurementsContainer);

			this._container.appendChild(this._label);

			this.updateDOMColor();
		}

		update() {
			this.updateColor();

			this._handles[0].update();

			this._handles[1].update();

			this.updateMeshColor();
			this.updateMeshPosition();
			this.updateDOM();
		}

		updateMeshColor() {
			if (this._material) {
				this._material.color.set(this._color);
			}
		}

		updateMeshPosition() {
			if (this._geometry) {
				const progection = new three.Vector3().subVectors(this._handles[1].worldPosition, this._handles[0].worldPosition).projectOnVector(this._camera.up);

				this._geometry.vertices[0].copy(this._handles[0].worldPosition);

				this._geometry.vertices[1].copy(new three.Vector3().addVectors(this._handles[0].worldPosition, progection));

				this._geometry.vertices[2].copy(new three.Vector3().subVectors(this._handles[1].worldPosition, progection));

				this._geometry.vertices[3].copy(this._handles[1].worldPosition);

				this._geometry.verticesNeedUpdate = true;

				this._geometry.computeBoundingSphere();
			}
		}

		updateRoI(clear) {
			const meanSDContainer = this._label.querySelector('.mean-sd');

			const maxMinContainer = this._label.querySelector('.max-min');

			if (clear) {
				meanSDContainer.innerHTML = '';
				maxMinContainer.innerHTML = '';
				return;
			}

			const roi = CoreUtils.getRoI(this._mesh, this._camera, this._stack);

			if (roi !== null) {
				meanSDContainer.innerHTML = `Mean: ${roi.mean.toFixed(1)} / SD: ${roi.sd.toFixed(1)}`;
				maxMinContainer.innerHTML = `Max: ${roi.max.toFixed()} / Min: ${roi.min.toFixed()}`;
			} else {
				meanSDContainer.innerHTML = '';
				maxMinContainer.innerHTML = '';
			}
		}

		updateDOMColor() {
			this._rectangle.style.borderColor = this._color;
			this._label.style.borderColor = this._color;
		}

		updateDOM() {
			this.updateDOMColor();
			const regions = this._stack.frame[this._params.frameIndex].ultrasoundRegions || [];
			this._area = CoreUtils.getGeometryArea(this._geometry);

			if (this._calibrationFactor) {
				this._area *= Math.pow(this._calibrationFactor, 2);
			} else if (regions && regions.length > 0 && this._stack.lps2IJK) {
				const region0 = this.getRegionByXY(regions, CoreUtils.worldToData(this._stack.lps2IJK, this._handles[0].worldPosition));
				const region1 = this.getRegionByXY(regions, CoreUtils.worldToData(this._stack.lps2IJK, this._handles[1].worldPosition));

				if (region0 !== null && region1 !== null && region0 === region1 && regions[region0].unitsX === 'cm' && regions[region0].unitsY === 'cm') {
					this._area *= Math.pow(regions[region0].deltaX, 2);
					this._units = 'cm²';
				} else if (this._stack.frame[this._params.frameIndex].pixelSpacing) {
					this._area /= 100;
					this._units = 'cm²';
				} else {
					this._units = 'units';
				}
			} else if (this._units === 'cm²') {
				this._area /= 100;
			}

			if (this._units === 'units' && !this._label.hasAttribute('title')) {
				this._label.setAttribute('title', 'Calibration is required to display the area in cm²');

				this._label.style.color = this._colors.error;
			} else if (this._units !== 'units' && this._label.hasAttribute('title')) {
				this._label.removeAttribute('title');

				this._label.style.color = this._colors.text;
			}

			this._label.querySelector('.area').innerHTML = `Area: ${this._area.toFixed(2)} ${this._units}`;
			const rectData = this.getRectData(this._handles[0].screenPosition, this._handles[1].screenPosition);
			const labelTransform = this.adjustLabelTransform(this._label, this._handles[1].screenPosition.clone().add(rectData.paddingVector.multiplyScalar(15 + this._label.offsetHeight / 2))); // update rectangle

			this._rectangle.style.transform = `translate3D(${rectData.transformX}px, ${rectData.transformY}px, 0)`;
			this._rectangle.style.width = rectData.width + 'px';
			this._rectangle.style.height = rectData.height + 'px'; // update label

			this._label.style.transform = 'translate3D(' + labelTransform.x + 'px,' + labelTransform.y + 'px, 0)';
		}

		free() {
			this.removeEventListeners();

			this._handles.forEach(h => {
				this.remove(h);
				h.free();
			});

			this._handles = [];

			this._container.removeChild(this._rectangle);

			this._container.removeChild(this._label); // mesh, geometry, material


			this.remove(this._mesh);

			this._mesh.geometry.dispose();

			this._mesh.geometry = null;

			this._mesh.material.dispose();

			this._mesh.material = null;
			this._mesh = null;

			this._geometry.dispose();

			this._geometry = null;
			this._material.vertexShader = null;
			this._material.fragmentShader = null;
			this._material.uniforms = null;

			this._material.dispose();

			this._material = null;
			this._stack = null;
			super.free();
		}

		getMeasurements() {
			return {
				area: this._area,
				units: this._units
			};
		}

		get targetMesh() {
			return this._targetMesh;
		}

		set targetMesh(targetMesh) {
			this._targetMesh = targetMesh;

			this._handles.forEach(elem => elem.targetMesh = targetMesh);

			this.update();
		}

		get worldPosition() {
			return this._worldPosition;
		}

		set worldPosition(worldPosition) {
			this._handles[0].worldPosition.copy(worldPosition);

			this._handles[1].worldPosition.copy(worldPosition);

			this._worldPosition.copy(worldPosition);

			this.update();
		}

		get calibrationFactor() {
			return this._calibrationFactor;
		}

		set calibrationFactor(calibrationFactor) {
			this._calibrationFactor = calibrationFactor;
			this._units = 'cm²';
			this.update();
		}

	}

	/**
	 * @module widgets/ruler
	 */

	class widgetsRuler extends widgetsBase {
		constructor(targetMesh, controls, params = {}) {
			super(targetMesh, controls, params);
			this._widgetType = 'Ruler'; // incoming parameters (optional: lps2IJK, pixelSpacing, ultrasoundRegions, worldPosition)

			this._calibrationFactor = params.calibrationFactor || null; // outgoing values

			this._distance = null;
			this._units = !this._calibrationFactor && !params.pixelSpacing ? 'units' : 'mm';
			this._moving = false;
			this._domHovered = false; // mesh stuff

			this._material = null;
			this._geometry = null;
			this._mesh = null; // dom stuff

			this._line = null;
			this._label = null; // add handles

			this._handles = [];
			const WidgetsHandle = widgetsHandle();
			let handle;

			for (let i = 0; i < 2; i++) {
				handle = new WidgetsHandle(targetMesh, controls, params);
				this.add(handle);

				this._handles.push(handle);
			}

			this._handles[1].active = true;
			this._handles[1].tracking = true;
			this._moveHandle = new WidgetsHandle(targetMesh, controls, params);
			this.add(this._moveHandle);

			this._handles.push(this._moveHandle);

			this._moveHandle.hide();

			this.create();
			this.onMove = this.onMove.bind(this);
			this.onHover = this.onHover.bind(this);
			this.addEventListeners();
		}

		addEventListeners() {
			this._container.addEventListener('wheel', this.onMove);

			this._line.addEventListener('mouseenter', this.onHover);

			this._line.addEventListener('mouseleave', this.onHover);

			this._label.addEventListener('mouseenter', this.onHover);

			this._label.addEventListener('mouseleave', this.onHover);
		}

		removeEventListeners() {
			this._container.removeEventListener('wheel', this.onMove);

			this._line.removeEventListener('mouseenter', this.onHover);

			this._line.removeEventListener('mouseleave', this.onHover);

			this._label.removeEventListener('mouseenter', this.onHover);

			this._label.removeEventListener('mouseleave', this.onHover);
		}

		onHover(evt) {
			if (evt) {
				this.hoverDom(evt);
			}

			this.hoverMesh();
			this._hovered = this._handles[0].hovered || this._handles[1].hovered || this._domHovered;
			this._container.style.cursor = this._hovered ? 'pointer' : 'default';
		}

		hoverMesh() {// check raycast intersection, do we want to hover on mesh or just css?
		}

		hoverDom(evt) {
			this._domHovered = evt.type === 'mouseenter';
		}

		onStart(evt) {
			this._moveHandle.onMove(evt, true);

			this._handles[0].onStart(evt);

			this._handles[1].onStart(evt);

			this._active = this._handles[0].active || this._handles[1].active || this._domHovered;

			if (this._domHovered && !this._handles[1].tracking) {
				this._moving = true;
				this._controls.enabled = false;
			}

			this.update();
		}

		onMove(evt) {
			if (this._active) {
				const prevPosition = this._moveHandle.worldPosition.clone();

				this._dragged = true;

				this._moveHandle.onMove(evt, true);

				if (this._moving) {
					this._handles.slice(0, -1).forEach(handle => {
						handle.worldPosition.add(this._moveHandle.worldPosition.clone().sub(prevPosition));
					});
				}
			} else {
				this.onHover(null);
			}

			this._handles[0].onMove(evt);

			this._handles[1].onMove(evt);

			this.update();
		}

		onEnd() {
			this._handles[0].onEnd(); // First Handle


			if (this._handles[1].tracking && this._handles[0].screenPosition.distanceTo(this._handles[1].screenPosition) < 10) {
				return;
			}

			if (!this._dragged && this._active && !this._handles[1].tracking) {
				this._selected = !this._selected; // change state if there was no dragging

				this._handles[0].selected = this._selected;
			} // Second Handle


			if (this._dragged || !this._handles[1].tracking) {
				this._handles[1].tracking = false;

				this._handles[1].onEnd();
			} else {
				this._handles[1].tracking = false;
			}

			this._handles[1].selected = this._selected;
			this._active = this._handles[0].active || this._handles[1].active;
			this._dragged = false;
			this._moving = false;
			this.update();
		}

		create() {
			this.createMesh();
			this.createDOM();
		}

		createMesh() {
			// geometry
			// this._geometry = new three.Geometry();
			// this._geometry.vertices.push(this._handles[0].worldPosition);
			// this._geometry.vertices.push(this._handles[1].worldPosition);
			this._geometry = new BufferGeometry();
			const positions = new Float32Array(2 * 3);

			this._geometry.setAttribute('position', new BufferAttribute(positions, 3));

			let index = 0;
			positions[index++] = this._handles[0].worldPosition.x;
			positions[index++] = this._handles[0].worldPosition.y;
			positions[index++] = this._handles[0].worldPosition.z;
			positions[index++] = this._handles[1].worldPosition.x;
			positions[index++] = this._handles[1].worldPosition.y;
			positions[index++] = this._handles[1].worldPosition.z; // material

			this._material = new three.LineBasicMaterial();
			this.updateMeshColor(); // mesh

			this._mesh = new three.Line(this._geometry, this._material);
			this._mesh.visible = true;
			this.add(this._mesh);
		}

		createDOM() {
			this._line = document.createElement('div');
			this._line.className = 'widgets-line';

			this._container.appendChild(this._line);

			this._label = document.createElement('div');
			this._label.className = 'widgets-label';

			this._container.appendChild(this._label);

			this.updateDOMColor();
		}

		hideDOM() {
			this._line.style.display = 'none';
			this._label.style.display = 'none';

			this._handles.forEach(elem => elem.hideDOM());
		}

		showDOM() {
			this._line.style.display = '';
			this._label.style.display = '';

			this._handles[0].showDOM();

			this._handles[1].showDOM();
		}

		update() {
			this.updateColor();

			this._handles[0].update();

			this._handles[1].update(); // calculate values


			const distanceData = this.getDistanceData(this._handles[0].worldPosition, this._handles[1].worldPosition, this._calibrationFactor);
			this._distance = distanceData.distance;

			if (distanceData.units) {
				this._units = distanceData.units;
			}

			this.updateMeshColor();
			this.updateMeshPosition();
			this.updateDOM();
		}

		updateMeshColor() {
			if (this._material) {
				this._material.color.set(this._color);
			}
		}

		updateMeshPosition() {
			if (this._geometry) {
				this._geometry.verticesNeedUpdate = true;
			}
		}

		updateDOM() {
			this.updateDOMColor(); // update line

			const lineData = this.getLineData(this._handles[0].screenPosition, this._handles[1].screenPosition);
			this._line.style.transform = `translate3D(${lineData.transformX}px, ${lineData.transformY}px, 0)
			rotate(${lineData.transformAngle}rad)`;
			this._line.style.width = lineData.length + 'px'; // update label

			if (this._units === 'units' && !this._label.hasAttribute('title')) {
				this._label.setAttribute('title', 'Calibration is required to display the distance in mm');

				this._label.style.color = this._colors.error;
			} else if (this._units !== 'units' && this._label.hasAttribute('title')) {
				this._label.removeAttribute('title');

				this._label.style.color = this._colors.text;
			}

			this._label.innerHTML = `${this._distance.toFixed(2)} ${this._units}`;
			let angle = Math.abs(lineData.transformAngle);

			if (angle > Math.PI / 2) {
				angle = Math.PI - angle;
			}

			const labelPadding = Math.tan(angle) < this._label.offsetHeight / this._label.offsetWidth ? this._label.offsetWidth / 2 / Math.cos(angle) + 15 // 5px for each handle + padding
			: this._label.offsetHeight / 2 / Math.cos(Math.PI / 2 - angle) + 15;
			const paddingVector = lineData.line.normalize().multiplyScalar(labelPadding);
			const paddingPoint = lineData.length > labelPadding * 2 ? this._handles[1].screenPosition.clone().sub(paddingVector) : this._handles[1].screenPosition.clone().add(paddingVector);
			const transform = this.adjustLabelTransform(this._label, paddingPoint);
			this._label.style.transform = `translate3D(${transform.x}px, ${transform.y}px, 0)`;
		}

		updateDOMColor() {
			this._line.style.backgroundColor = this._color;
			this._label.style.borderColor = this._color;
		}

		free() {
			this.removeEventListeners();

			this._handles.forEach(h => {
				this.remove(h);
				h.free();
			});

			this._handles = [];

			this._container.removeChild(this._line);

			this._container.removeChild(this._label); // mesh, geometry, material


			this.remove(this._mesh);

			this._mesh.geometry.dispose();

			this._mesh.geometry = null;

			this._mesh.material.dispose();

			this._mesh.material = null;
			this._mesh = null;

			this._geometry.dispose();

			this._geometry = null;
			this._material.vertexShader = null;
			this._material.fragmentShader = null;
			this._material.uniforms = null;

			this._material.dispose();

			this._material = null;
			super.free();
		}

		getMeasurements() {
			return {
				distance: this._distance,
				units: this._units
			};
		}

		get targetMesh() {
			return this._targetMesh;
		}

		set targetMesh(targetMesh) {
			this._targetMesh = targetMesh;

			this._handles.forEach(elem => elem.targetMesh = targetMesh);

			this.update();
		}

		get worldPosition() {
			return this._worldPosition;
		}

		set worldPosition(worldPosition) {
			this._handles[0].worldPosition.copy(worldPosition);

			this._handles[1].worldPosition.copy(worldPosition);

			this._worldPosition.copy(worldPosition);

			this.update();
		}

		get calibrationFactor() {
			return this._calibrationFactor;
		}

		set calibrationFactor(calibrationFactor) {
			this._calibrationFactor = calibrationFactor;
			this._units = 'mm';
			this.update();
		}

	}

	/**
	 * @module widgets/velocityTimeIntegral
	 */

	class widgetsVelocityTimeIntegral extends widgetsBase {
		constructor(targetMesh, controls, params = {}) {
			super(targetMesh, controls, params);
			this._widgetType = 'VelocityTimeIntegral'; // incoming parameters (+ ijk2LPS, lps2IJK, worldPosition)

			this._regions = params.ultrasoundRegions || []; // required

			if (this._regions.length < 1) {
				throw new Error('Ultrasound regions should not be empty!');
			} // outgoing values


			this._vMax = null; // Maximum Velocity (Vmax)

			this._vMean = null; // Mean Velocity (Vmean)

			this._gMax = null; // Maximum Gradient (Gmax)

			this._gMean = null; // Mean Gradient (Gmean)

			this._envTi = null; // Envelope Duration (Env.Ti)

			this._vti = null; // Velocity Time Integral (VTI)

			this._extraInfo = null; // extra information which is added to label

			this._initialized = false; // set to true onEnd if number of handles > 2

			this._isHandleActive = true;
			this._domHovered = false;
			this._initialRegion = this.getRegionByXY(this._regions, CoreUtils.worldToData(params.lps2IJK, params.worldPosition));

			if (this._initialRegion === null) {
				throw new Error('Invalid initial UltraSound region!');
			}

			this._usPoints = []; // mesh stuff

			this._material = null;
			this._geometry = null;
			this._mesh = null; // dom stuff

			this._lines = [];
			this._label = null; // add handles

			this._handles = [];
			const WidgetsHandle = widgetsHandle();
			let handle = new WidgetsHandle(targetMesh, controls, params);
			this.add(handle);

			this._handles.push(handle);

			this._moveHandle = new WidgetsHandle(targetMesh, controls, params);
			this.add(this._moveHandle);

			this._moveHandle.hide();

			this.onMove = this.onMove.bind(this);
			this.onHover = this.onHover.bind(this);
			this.create();
			this.addEventListeners();
		}

		addEventListeners() {
			this._container.addEventListener('wheel', this.onMove);

			this._label.addEventListener('mouseenter', this.onHover);

			this._label.addEventListener('mouseleave', this.onHover);
		}

		removeEventListeners() {
			this._container.removeEventListener('wheel', this.onMove);

			this._label.removeEventListener('mouseenter', this.onHover);

			this._label.removeEventListener('mouseleave', this.onHover);
		}

		onHover(evt) {
			if (evt) {
				this.hoverDom(evt);
			}

			this.hoverMesh();
			let hovered = false;

			this._handles.forEach(elem => hovered = hovered || elem.hovered);

			this._hovered = hovered || this._domHovered;
			this._container.style.cursor = this._hovered ? 'pointer' : 'default';
		}

		hoverMesh() {// check raycast intersection, if we want to hover on mesh instead of just css
		}

		hoverDom(evt) {
			this._domHovered = evt.type === 'mouseenter';
		}

		onStart(evt) {
			let active = false;

			this._moveHandle.onMove(evt, true);

			this._handles.forEach(elem => {
				elem.onStart(evt);
				active = active || elem.active;
			});

			this._active = active || this._domHovered;
			this._isHandleActive = active;

			if (this._domHovered) {
				this._controls.enabled = false;
			}

			this.update();
		}

		onMove(evt) {
			if (this.active) {
				const prevPosition = this._moveHandle.worldPosition.clone();

				this._moveHandle.onMove(evt, true);

				const shift = this._moveHandle.worldPosition.clone().sub(prevPosition);

				if (!this.isCorrectRegion(shift)) {
					this._moveHandle.worldPosition.copy(prevPosition);

					return;
				}

				if (!this._initialized) {
					this._handles[this._handles.length - 1].hovered = false;
					this._handles[this._handles.length - 1].active = false;
					this._handles[this._handles.length - 1].tracking = false;
					const WidgetsHandle = widgetsHandle();
					let handle = new WidgetsHandle(this._targetMesh, this._controls, this._params);
					handle.hovered = true;
					handle.active = true;
					handle.tracking = true;
					this.add(handle);

					this._handles.push(handle);

					this.createLine();
				} else {
					this.updateDOMContent(true);

					if (!this._isHandleActive || this._handles[this._handles.length - 2].active || this._handles[this._handles.length - 1].active) {
						this._handles.forEach(handle => {
							handle.worldPosition.add(shift);
						});

						this._isHandleActive = false;
						this._handles[this._handles.length - 2].active = false;
						this._handles[this._handles.length - 1].active = false;
						this._controls.enabled = false;
					}
				}

				this._dragged = true;
			} else {
				this.onHover(null);
			}

			this._handles.forEach(elem => {
				elem.onMove(evt);
			});

			if (this.active && this._handles.length > 2) {
				this.pushPopHandle();
			}

			this.update();
		}

		onEnd() {
			if (this._handles.length < 3) {
				return;
			}

			let active = false;

			this._handles.slice(0, -1).forEach(elem => {
				elem.onEnd();
				active = active || elem.active;
			}); // Last Handle


			if (this._dragged || !this._handles[this._handles.length - 1].tracking) {
				this._handles[this._handles.length - 1].tracking = false;

				this._handles[this._handles.length - 1].onEnd();
			} else {
				this._handles[this._handles.length - 1].tracking = false;
			}

			if (this._dragged || !this._initialized) {
				this.finalize();
				this.updateDOMContent();
			}

			if (!this._dragged && this._active) {
				this._selected = !this._selected; // change state if there was no dragging

				this._handles.forEach(elem => elem.selected = this._selected);
			}

			this._active = active || this._handles[this._handles.length - 1].active;
			this._isHandleActive = active;
			this._dragged = false;
			this._initialized = true;
			this.update();
		}

		isCorrectRegion(shift) {
			let isCorrect = true;

			this._handles.forEach((handle, index) => {
				if (handle.active || !this._isHandleActive) {
					isCorrect = isCorrect && this.checkHandle(index, shift);
				}
			});

			return isCorrect;
		}

		checkHandle(index, shift) {
			const region = this.getRegionByXY(this._regions, CoreUtils.worldToData(this._params.lps2IJK, this._handles[index].worldPosition.clone().add(shift)));
			return region !== null && region === this._initialRegion && this._regions[region].unitsY === 'cm/sec';
		}

		create() {
			this.createMaterial();
			this.createDOM();
		}

		createMaterial() {
			this._material = new three.LineBasicMaterial();
		}

		createDOM() {
			this._label = document.createElement('div');
			this._label.className = 'widgets-label';
			const measurementsContainer = document.createElement('div');
			['vmax', 'vmean', 'gmax', 'gmean', 'envti', 'vti', 'info'].forEach(name => {
				const div = document.createElement('div');
				div.className = name;
				measurementsContainer.appendChild(div);
			});

			this._label.appendChild(measurementsContainer);

			this._container.appendChild(this._label);

			this.updateDOMColor();
		}

		createLine() {
			const line = document.createElement('div');
			line.className = 'widgets-line';
			line.addEventListener('mouseenter', this.onHover);
			line.addEventListener('mouseleave', this.onHover);

			this._lines.push(line);

			this._container.appendChild(line);
		}

		pushPopHandle() {
			let handle0 = this._handles[this._handles.length - 3];
			let handle1 = this._handles[this._handles.length - 2];
			let newhandle = this._handles[this._handles.length - 1];
			let isOnLine = this.isPointOnLine(handle0.worldPosition, handle1.worldPosition, newhandle.worldPosition);

			if (isOnLine || handle0.screenPosition.distanceTo(newhandle.screenPosition) < 25) {
				this.remove(handle1);
				handle1.free();
				this._handles[this._handles.length - 2] = newhandle;

				this._handles.pop();

				this._container.removeChild(this._lines.pop());
			}

			return isOnLine;
		}

		isPointOnLine(pointA, pointB, pointToCheck) {
			return !new three.Vector3().crossVectors(pointA.clone().sub(pointToCheck), pointB.clone().sub(pointToCheck)).length();
		}

		finalize() {
			if (this._initialized) {
				// remove old axis handles
				this._handles.splice(-2).forEach(elem => {
					this.remove(elem);
					elem.free();
				});
			}

			const pointF = CoreUtils.worldToData(this._params.lps2IJK, this._handles[0]._worldPosition);
			const pointL = CoreUtils.worldToData(this._params.lps2IJK, this._handles[this._handles.length - 1]._worldPosition);

			const region = this._regions[this.getRegionByXY(this._regions, pointF)];

			const axisY = region.y0 + (region.axisY || 0); // data coordinate equal to US region's zero Y coordinate

			const WidgetsHandle = widgetsHandle();
			const params = {
				hideHandleMesh: this._params.hideHandleMesh || false
			};
			pointF.y = axisY;
			pointL.y = axisY;
			this._usPoints = [this.getPointInRegion(region, pointL), this.getPointInRegion(region, pointF)];
			params.worldPosition = pointL.applyMatrix4(this._params.ijk2LPS); // projection of last point on Y axis

			this._handles.push(new WidgetsHandle(this._targetMesh, this._controls, params));

			this.add(this._handles[this._handles.length - 1]);
			params.worldPosition = pointF.applyMatrix4(this._params.ijk2LPS); // projection of first point on Y axis

			this._handles.push(new WidgetsHandle(this._targetMesh, this._controls, params));

			this.add(this._handles[this._handles.length - 1]);

			while (this._lines.length < this._handles.length) {
				this.createLine();
			}
		}

		update() {
			this.updateColor(); // update handles

			this._handles.forEach(elem => elem.update()); // mesh stuff


			this.updateMesh(); // DOM stuff

			this.updateDOMColor();
			this.updateDOMPosition();
		}

		updateValues() {
			const region = this._regions[this.getRegionByXY(this._regions, CoreUtils.worldToData(this._params.lps2IJK, this._handles[0]._worldPosition))];

			const boundaries = {
				xMin: Number.POSITIVE_INFINITY,
				xMax: Number.NEGATIVE_INFINITY,
				yMin: Number.POSITIVE_INFINITY,
				yMax: Number.NEGATIVE_INFINITY
			};
			let pVelocity;
			let pGradient;
			let pTime;
			let totalTime = 0;
			this._vMax = 0;
			this._vMean = 0;
			this._gMean = 0;

			this._usPoints.splice(2);

			this._handles.slice(0, -2).forEach(elem => {
				const usPosition = this.getPointInRegion(region, CoreUtils.worldToData(this._params.lps2IJK, elem._worldPosition));
				const velocity = Math.abs(usPosition.y / 100);
				const gradient = 4 * Math.pow(velocity, 2);

				if (this._vMax === null || velocity > this._vMax) {
					this._vMax = velocity;
				}

				boundaries.xMin = Math.min(usPosition.x, boundaries.xMin);
				boundaries.xMax = Math.max(usPosition.x, boundaries.xMax);
				boundaries.yMin = Math.min(usPosition.y, boundaries.yMin);
				boundaries.yMax = Math.max(usPosition.y, boundaries.yMax);

				if (pTime) {
					const length = Math.abs(usPosition.x - pTime);
					totalTime += length;
					this._vMean += length * (pVelocity + velocity) / 2;
					this._gMean += length * (pGradient + gradient) / 2;
				}

				pVelocity = velocity;
				pGradient = gradient;
				pTime = usPosition.x;

				this._usPoints.push(usPosition);
			});

			this._gMax = 4 * Math.pow(this._vMax, 2);
			this._vMean /= totalTime;
			this._gMean /= totalTime;
			this._envTi = totalTime * 1000;
			this._vti = this.getArea(this._usPoints);
			this._shapeWarn = boundaries.xMax - boundaries.xMin !== totalTime || boundaries.yMin < 0 !== boundaries.yMax < 0;
		}

		updateMesh() {
			if (this._mesh) {
				this.remove(this._mesh);
			} // this._geometry = new three.Geometry();
			// this._handles.forEach(elem => this._geometry.vertices.push(elem.worldPosition));
			// this._geometry.vertices.push(this._handles[0].worldPosition);
			// this._geometry.verticesNeedUpdate = true;


			this._geometry = new three.BufferGeometry();
			const positions = new Float32Array(this._handles.length * 3);

			this._geometry.setAttribute('position', new three.BufferAttribute(positions, 3));

			let index = 0;

			this._handles.forEach(handle => {
				positions[index++] = handle.worldPosition.x;
				positions[index++] = handle.worldPosition.y;
				positions[index++] = handle.worldPosition.z;
			});

			positions[index++] = this._handles[0].worldPosition.x;
			positions[index++] = this._handles[0].worldPosition.y;
			positions[index++] = this._handles[0].worldPosition.z;

			this._geometry.computeVertexNormals();

			this.updateMeshColor();
			this._mesh = new three.Line(this._geometry, this._material);
			this._mesh.visible = true;
			this.add(this._mesh);
		}

		updateMeshColor() {
			if (this._material) {
				this._material.color.set(this._color);
			}
		}

		updateDOMColor() {
			if (this._handles.length >= 2) {
				this._lines.forEach(elem => elem.style.backgroundColor = this._color);
			}

			this._label.style.borderColor = this._color;
		}

		updateDOMContent(clear) {
			const vMaxContainer = this._label.querySelector('.vmax');

			const vMeanContainer = this._label.querySelector('.vmean');

			const gMaxContainer = this._label.querySelector('.gmax');

			const gMeanContainer = this._label.querySelector('.gmean');

			const envTiContainer = this._label.querySelector('.envti');

			const vtiContainer = this._label.querySelector('.vti');

			const infoContainer = this._label.querySelector('.info');

			if (clear) {
				vMaxContainer.innerHTML = '';
				vMeanContainer.innerHTML = '';
				gMaxContainer.innerHTML = '';
				gMeanContainer.innerHTML = '';
				envTiContainer.innerHTML = '';
				vtiContainer.innerHTML = '';
				infoContainer.innerHTML = '';
				return;
			}

			this.updateValues();

			if (this._shapeWarn && !this._label.hasAttribute('title')) {
				this._label.setAttribute('title', 'Values may be incorrect due to invalid curve.');

				this._label.style.color = this._colors.error;
			} else if (!this._shapeWarn && this._label.hasAttribute('title')) {
				this._label.removeAttribute('title');

				this._label.style.color = this._colors.text;
			}

			vMaxContainer.innerHTML = `Vmax: ${this._vMax.toFixed(2)} m/s`;
			vMeanContainer.innerHTML = `Vmean: ${this._vMean.toFixed(2)} m/s`;
			gMaxContainer.innerHTML = `Gmax: ${this._gMax.toFixed(2)} mmhg`;
			gMeanContainer.innerHTML = `Gmean: ${this._gMean.toFixed(2)} mmhg`;
			envTiContainer.innerHTML = `Env.Ti: ${this._envTi.toFixed(1)} ms`;
			vtiContainer.innerHTML = `VTI: ${this._vti.toFixed(2)} cm`;
			infoContainer.innerHTML = this._extraInfo;
		}

		updateDOMPosition() {
			if (this._handles.length < 2) {
				return;
			} // update lines and get coordinates of lowest handle


			let labelPosition = null;

			this._lines.forEach((elem, ind) => {
				const lineData = this.getLineData(this._handles[ind].screenPosition, this._handles[ind + 1 === this._handles.length ? 0 : ind + 1].screenPosition);
				elem.style.transform = `translate3D(${lineData.transformX}px, ${lineData.transformY}px, 0)
										rotate(${lineData.transformAngle}rad)`;
				elem.style.width = lineData.length + 'px';

				if (labelPosition === null || labelPosition.y < this._handles[ind].screenPosition.y) {
					labelPosition = this._handles[ind].screenPosition.clone();
				}
			});

			if (!this._initialized) {
				return;
			} // update label


			labelPosition.y += 15 + this._label.offsetHeight / 2;
			labelPosition = this.adjustLabelTransform(this._label, labelPosition);
			this._label.style.transform = `translate3D(${labelPosition.x}px, ${labelPosition.y}px, 0)`;
		}

		hideDOM() {
			this._handles.forEach(elem => elem.hideDOM());

			this._lines.forEach(elem => elem.style.display = 'none');

			this._label.style.display = 'none';
		}

		showDOM() {
			this._handles.forEach(elem => elem.showDOM());

			this._lines.forEach(elem => elem.style.display = '');

			this._label.style.display = '';
		}

		free() {
			this.removeEventListeners();

			this._handles.forEach(elem => {
				this.remove(elem);
				elem.free();
			});

			this._handles = [];
			this._usPoints = [];
			this.remove(this._moveHandle);

			this._moveHandle.free();

			this._moveHandle = null;

			this._lines.forEach(elem => {
				elem.removeEventListener('mouseenter', this.onHover);
				elem.removeEventListener('mouseleave', this.onHover);

				this._container.removeChild(elem);
			});

			this._lines = [];

			this._container.removeChild(this._label); // mesh, geometry, material


			if (this._mesh) {
				this.remove(this._mesh);

				this._mesh.geometry.dispose();

				this._mesh.geometry = null;

				this._mesh.material.dispose();

				this._mesh.material = null;
				this._mesh = null;
			}

			if (this._geometry) {
				this._geometry.dispose();

				this._geometry = null;
			}

			this._material.vertexShader = null;
			this._material.fragmentShader = null;
			this._material.uniforms = null;

			this._material.dispose();

			this._material = null;
			super.free();
		}

		getMeasurements() {
			return {
				vMax: this._vMax,
				vMean: this._vMean,
				gMax: this._gMax,
				gMean: this._gMean,
				envTi: this._envTi,
				vti: this._vti
			};
		}

		get targetMesh() {
			return this._targetMesh;
		}

		set targetMesh(targetMesh) {
			this._targetMesh = targetMesh;

			this._handles.forEach(elem => elem.targetMesh = targetMesh);

			this._moveHandle.targetMesh = targetMesh;
			this.update();
		}

		get worldPosition() {
			return this._worldPosition;
		}

		set worldPosition(worldPosition) {
			this._handles.forEach(elem => elem._worldPosition.copy(worldPosition));

			this._worldPosition.copy(worldPosition);

			this.update();
		}

		get extraInfo() {
			return this._extraInfo;
		}

		set extraInfo(info) {
			this._extraInfo = info;
			this._label.querySelector('.info').innerHTML = info;
		}

	}

	/**
	 * @module widgets/voxelProbe
	 */

	class widgetsVoxelprobe extends widgetsBase {
		constructor(targetMesh, controls, params = {}) {
			super(targetMesh, controls, params);
			this._widgetType = 'VoxelProbe'; // incoming parameters (optional: worldPosition)

			this._stack = params.stack; // required

			this._container.style.cursor = 'pointer';
			this._controls.enabled = false; // controls should be disabled for widgets with a single handle

			this._initialized = false; // set to true onEnd

			this._active = true;
			this._moving = true;
			this._domHovered = false; // dom stuff

			this._label = null; // handle (represent voxel)

			const WidgetsHandle = widgetsHandle();
			this._handle = new WidgetsHandle(targetMesh, controls, params);
			this.add(this._handle);
			this._moveHandle = new WidgetsHandle(targetMesh, controls, params);
			this.add(this._moveHandle);

			this._moveHandle.hide();

			this.create(); // event listeners

			this.onMove = this.onMove.bind(this);
			this.onHover = this.onHover.bind(this);
			this.addEventListeners();
		}

		addEventListeners() {
			this._label.addEventListener('mouseenter', this.onHover);

			this._label.addEventListener('mouseleave', this.onHover);

			this._container.addEventListener('wheel', this.onMove);
		}

		removeEventListeners() {
			this._label.removeEventListener('mouseenter', this.onHover);

			this._label.removeEventListener('mouseleave', this.onHover);

			this._container.removeEventListener('wheel', this.onMove);
		}

		onStart(evt) {
			this._moveHandle.onMove(evt, true);

			this._handle.onStart(evt);

			this._active = this._handle.active || this._domHovered;

			if (this._domHovered) {
				this._moving = true;
				this._controls.enabled = false;
			}

			this.update();
		}

		onMove(evt) {
			if (this._active) {
				const prevPosition = this._moveHandle.worldPosition.clone();

				this._dragged = true;

				this._moveHandle.onMove(evt, true);

				if (this._moving) {
					this._handle.worldPosition.add(this._moveHandle.worldPosition.clone().sub(prevPosition));
				}
			} else {
				this.onHover(null);
			}

			this._handle.onMove(evt);

			this.update();
		}

		onEnd() {
			this._handle.onEnd();

			if (!this._dragged && this._active && this._initialized) {
				this._selected = !this._selected; // change state if there was no dragging

				this._handle.selected = this._selected;
			}

			this._initialized = true;
			this._active = this._handle.active;
			this._dragged = false;
			this._moving = false;
			this.update();
		}

		onHover(evt) {
			if (evt) {
				this.hoverDom(evt);
			}

			this._hovered = this._handle.hovered || this._domHovered;
			this._container.style.cursor = this._hovered ? 'pointer' : 'default';
		}

		hoverDom(evt) {
			this._domHovered = evt.type === 'mouseenter';
		}

		create() {
			this.createVoxel();
			this.createDOM();
		}

		createVoxel() {
			this._voxel = new ModelsVoxel();
			this._voxel.id = this.id;
		}

		createDOM() {
			this._label = document.createElement('div');
			this._label.className = 'widgets-label'; // measurements

			let measurementsContainer = document.createElement('div'); // LPS

			let lpsContainer = document.createElement('div');
			lpsContainer.className = 'lpsPosition';
			measurementsContainer.appendChild(lpsContainer); // IJK

			let ijkContainer = document.createElement('div');
			ijkContainer.className = 'ijkPosition';
			measurementsContainer.appendChild(ijkContainer); // Value

			let valueContainer = document.createElement('div');
			valueContainer.className = 'value';
			measurementsContainer.appendChild(valueContainer);

			this._label.appendChild(measurementsContainer);

			this._container.appendChild(this._label);

			this.updateDOMColor();
		}

		update() {
			this.updateColor();

			this._handle.update();

			this._worldPosition.copy(this._handle.worldPosition);

			this.updateVoxel(); // set data coordinates && value

			this.updateDOM();
		}

		updateVoxel() {
			this._voxel.worldCoordinates = this._worldPosition;
			this._voxel.dataCoordinates = CoreUtils.worldToData(this._stack.lps2IJK, this._worldPosition); // update value

			let value = CoreUtils.getPixelData(this._stack, this._voxel.dataCoordinates);
			this._voxel.value = value === null || this._stack.numberOfChannels > 1 ? 'NA' // coordinates outside the image or RGB
			: CoreUtils.rescaleSlopeIntercept(value, this._stack.rescaleSlope, this._stack.rescaleIntercept).toFixed();
		}

		updateDOM() {
			const rasContainer = this._label.querySelector('.lpsPosition');

			const ijkContainer = this._label.querySelector('.ijkPosition');

			const valueContainer = this._label.querySelector('.value');

			rasContainer.innerHTML = `LPS: 
			${this._voxel.worldCoordinates.x.toFixed(2)} :
			${this._voxel.worldCoordinates.y.toFixed(2)} :
			${this._voxel.worldCoordinates.z.toFixed(2)}`;
			ijkContainer.innerHTML = `IJK: 
			${this._voxel.dataCoordinates.x} :
			${this._voxel.dataCoordinates.y} :
			${this._voxel.dataCoordinates.z}`;
			valueContainer.innerHTML = `Value: ${this._voxel.value}`;
			this.updateDOMColor();
			const transform = this.adjustLabelTransform(this._label, this._handle.screenPosition, true);
			this._label.style.transform = `translate3D(${transform.x}px, ${transform.y}px, 0)`;
		}

		updateDOMColor() {
			this._label.style.borderColor = this._color;
		}

		free() {
			this.removeEventListeners();
			this.remove(this._handle);

			this._handle.free();

			this._handle = null;
			this.remove(this._moveHandle);

			this._moveHandle.free();

			this._moveHandle = null;

			this._container.removeChild(this._label);

			this._stack = null;
			this._voxel = null;
			super.free();
		}

		hideDOM() {
			this._label.style.display = 'none';

			this._handle.hideDOM();
		}

		showDOM() {
			this._label.style.display = '';

			this._handle.showDOM();
		}

		get targetMesh() {
			return this._targetMesh;
		}

		set targetMesh(targetMesh) {
			this._targetMesh = targetMesh;
			this._handle.targetMesh = targetMesh;
			this._moveHandle.targetMesh = targetMesh;
			this.update();
		}

		get worldPosition() {
			return this._worldPosition;
		}

		set worldPosition(worldPosition) {
			this._handle.worldPosition.copy(worldPosition);

			this._moveHandle.worldPosition.copy(worldPosition);

			this._worldPosition.copy(worldPosition);

			this.update();
		}

		get active() {
			return this._active;
		}

		set active(active) {
			this._active = active;
			this._controls.enabled = !this._active;
			this.update();
		}

	}

	const packageVersion = require('../package.json').version;

	const d3Version = require('three/package').version;

	console.log(`AMI ${packageVersion} (three ${d3Version})`);

	exports.AngleWidget = widgetsAngle;
	exports.AnnotationWidget = widgetsAnnotation;
	exports.BiRulerWidget = widgetsBiruler;
	exports.BorderHelper = helpersBorder;
	exports.BoundingBoxHelper = helpersBoundingBox;
	exports.ColorsCore = Colors;
	exports.ContourFragmentShader = ShadersFragment$4;
	exports.ContourHelper = helpersContour;
	exports.ContourUniformShader = ShadersUniform$4;
	exports.ContourVertexShader = ShadersVertex$4;
	exports.CrossRulerWidget = widgetsCrossRuler;
	exports.DataFragmentShader = ShadersFragment$2;
	exports.DataUniformShader = ShadersUniform$2;
	exports.DataVertexShader = ShadersVertex$2;
	exports.DicomParser = ParsersDicom;
	exports.EllipseWidget = widgetsEllipse;
	exports.FrameModel = ModelsFrame;
	exports.FreehandWidget = widgetsFreehand;
	exports.HandleWidget = widgetsHandle;
	exports.IntersectionsCore = Intersections;
	exports.LayerFragmentShader = ShadersFragment;
	exports.LayerUniformShader = ShadersUniform;
	exports.LayerVertexShader = ShadersVertex;
	exports.LocalizerFragmentShader = ShadersFragment$3;
	exports.LocalizerHelper = helpersLocalizer;
	exports.LocalizerUniformShader = ShadersUniform$3;
	exports.LocalizerVertexShader = ShadersVertex$3;
	exports.LutHelper = helpersLut;
	exports.MghParser = ParsersMgh;
	exports.NiftiParser = ParsersNifti$1;
	exports.NrrdParser = ParsersNifti;
	exports.OrbitControl = OrbitControls;
	exports.OrthographicCamera = camerasOrthographic;
	exports.PeakVelocityWidget = widgetsPeakVelocity;
	exports.PolygonWidget = widgetsPolygon;
	exports.PressureHalfTimeWidget = widgetsPressureHalfTime;
	exports.ProgressBarEventBasedHelper = HelpersProgressBarEventBased;
	exports.ProgressBarHelper = HelpersProgressBar;
	exports.RectangleWidget = widgetsRectangle;
	exports.RulerWidget = widgetsRuler;
	exports.SegmentationLutHelper = HelpersSegmentationLut;
	exports.SegmentationPreset = PresetsSegmentation;
	exports.SeriesModel = ModelsSeries;
	exports.SliceGeometry = geometriesSlice;
	exports.SliceHelper = helpersSlice;
	exports.StackHelper = helpersStack;
	exports.StackModel = ModelsStack;
	exports.TrackballControl = trackball;
	exports.TrackballOrthoControl = trackballOrtho;
	exports.UtilsCore = CoreUtils;
	exports.VRFragmentShader = ShadersFragment$1;
	exports.VRUniformShader = ShadersUniform$1;
	exports.VRVertexShader = ShadersVertex$1;
	exports.ValidatorsCore = Validators;
	exports.VelocityTimeIntegralWidget = widgetsVelocityTimeIntegral;
	exports.VolumeLoader = LoadersVolumes;
	exports.VolumeRenderingHelper = helpersVolumeRendering;
	exports.VoxelGeometry = geometriesVoxel;
	exports.VoxelModel = ModelsVoxel;
	exports.VoxelProbeWidget = widgetsVoxelprobe;
	exports.WidgetsCss = WidgetsCss;

	Object.defineProperty(exports, '__esModule', { value: true });

}));
