import numpy as np
import cv2

color_dict_HSV = {'black': [[[180, 255, 30], [0, 0, 0]]],
                  'white': [[[180, 18, 255], [0, 0, 231]]],
                  'red': [[[180, 255, 255], [159, 50, 70]], [[9, 255, 255], [0, 50, 70]]],
                  'green': [[[89, 255, 255], [36, 50, 70]]],
                  'blue': [[[128, 255, 255], [90, 50, 70]]],
                  'yellow': [[[35, 255, 255], [25, 50, 70]]],
                  'purple': [[[158, 255, 255], [129, 50, 70]]],
                  'orange': [[[24, 255, 255], [10, 50, 70]]],
                  'gray': [[[180, 18, 230], [0, 0, 40]]]}


class VideoCamera(object):
    target_color = -1
    source_color = -1

    def __init__(self, source, target):
        self.video = cv2.VideoCapture(0)
        self.target_color = target
        self.source_color = source

    def __del__(self):
        self.video.release()

    # def get_frame(self):
    #     ret, frame = self.video.read()
    #     image = frame
    #     # hsv = cv2.cvtColor(image, cv2.COLOR_BGR2HSV)
    #     source_color = tuple(
    #         int(self.source_color[i:i+2], 16) for i in (0, 2, 4))

    #     size = 75
    #     lower_source_bound = np.array(
    #         [max(source_color[2]-size, 0), max(source_color[1]-size, 0), max(source_color[0]-size, 0)])
    #     upper_source_bound = np.array([min(source_color[2]+size, 255),
    #                                    min(source_color[1]+size, 255), min(source_color[0]+size, 255)])
    #     mask = cv2.inRange(image, lower_source_bound, upper_source_bound)
    #     detected_output = cv2.bitwise_and(image, image, mask=mask)
    #     if ret:
    #         for i in zip(*np.where(detected_output != [0, 0, 0])):
    #             frame[i[0], i[1], 0] = target_color[2]
    #             frame[i[0], i[1], 1] = target_color[1]
    #             frame[i[0], i[1], 2] = target_color[0]
    #     ret, jpeg = cv2.imencode('.jpg', frame)
    #     return jpeg.tobytes()

    def get_frame(self):
        _, imageFrame = self.video.read()
        hsvFrame = cv2.cvtColor(imageFrame, cv2.COLOR_BGR2HSV)
        hsvFrame = cv2.cvtColor(imageFrame, cv2.COLOR_BGR2HSV)
        # Set range for red color and
        # define mask
        mask = 0
        for i in range(0, len(color_dict_HSV[self.source_color])):
            lower = np.array(color_dict_HSV[self.source_color][i][1], np.uint8)
            upper = np.array(color_dict_HSV[self.source_color][i][0], np.uint8)
            temp_mask = cv2.inRange(hsvFrame, lower, upper)
            if i:
                mask = mask | temp_mask
            else:
                mask = temp_mask

        target_color = tuple(
            int(self.target_color[i:i+2], 16) for i in (0, 2, 4))
        # print(source_color, target_color)
        kernal = np.ones((5, 5), "uint8")

        mask = cv2.dilate(mask, kernal)
        res = cv2.bitwise_and(imageFrame, imageFrame,
                              mask=mask)

        # Creating contour to track red color
        contours, hierarchy = cv2.findContours(mask,
                                               cv2.RETR_TREE,
                                               cv2.CHAIN_APPROX_SIMPLE)

        for pic, contour in enumerate(contours):
            area = cv2.contourArea(contour)
            if (area > 10000):
                x, y, w, h = cv2.boundingRect(contour)
                imageFrame = cv2.rectangle(imageFrame, (x, y),
                                           (x + w, y + h),
                                           (0, 0, 0), 10)
                cv2.fillPoly(imageFrame, pts=[contour], color=(
                    target_color[2], target_color[1], target_color[0]))
                # cv2.putText(imageFrame, self.source_color + '->' + self.target_color, (x, y),
                #         cv2.FONT_HERSHEY_SIMPLEX,
                #         1.0, (0, 0, 0))

        ret, jpeg = cv2.imencode('.jpg', imageFrame)
        return jpeg.tobytes()
