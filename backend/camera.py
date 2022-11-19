import numpy as np
import cv2


class VideoCamera(object):
    target_color = -1
    source_color = -1

    def __init__(self, source, target):
        self.video = cv2.VideoCapture(0)
        self.target_color = target
        self.source_color = source

    def __del__(self):
        self.video.release()

    def get_frame(self):
        ret, frame = self.video.read()
        image = frame
        # hsv = cv2.cvtColor(image, cv2.COLOR_BGR2HSV)
        source_color = tuple(
            int(self.source_color[i:i+2], 16) for i in (0, 2, 4))
        target_color = tuple(
            int(self.target_color[i:i+2], 16) for i in (0, 2, 4))
        # print(source_color, target_color)
        size = 75
        lower_source_bound = np.array(
            [max(source_color[2]-size, 0), max(source_color[1]-size, 0), max(source_color[0]-size, 0)])
        upper_source_bound = np.array([min(source_color[2]+size, 255),
                                       min(source_color[1]+size, 255), min(source_color[0]+size, 255)])
        mask = cv2.inRange(image, lower_source_bound, upper_source_bound)
        detected_output = cv2.bitwise_and(image, image, mask=mask)
        if ret:
            for i in zip(*np.where(detected_output != [0, 0, 0])):
                frame[i[0], i[1], 0] = target_color[2]
                frame[i[0], i[1], 1] = target_color[1]
                frame[i[0], i[1], 2] = target_color[0]
        ret, jpeg = cv2.imencode('.jpg', frame)
        return jpeg.tobytes()
